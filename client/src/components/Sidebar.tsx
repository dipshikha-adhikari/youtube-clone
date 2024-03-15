import { Menu } from "@mui/icons-material";
import YoutubeIcon from "../assets/images/youtube.png";
import { links } from "../assets/data";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar, handleMenubar } from "../redux/slices/componentsSlice";
import { useDebounce } from "../utils/debounce";
import { InitialState } from "../../types";

type Link = {
  title: string;
  link: string;
  icon: string;
};

const Sidebar = () => {
  const components = useSelector((s: InitialState) => s.components);
  const dispatch = useDispatch();
  const debounce = useDebounce(handleResize, 500);

  function handleResize() {
    if (window.innerWidth > 1280) {
      dispatch(closeSidebar());
    }
    if (window.innerWidth < 1280 && components.isMenubarOpen) {
      dispatch(closeSidebar());
    }
  }

  function handleClick(e: MouseEvent) {
    if (window.innerWidth < 1280 && components.isMenubarOpen) {
      const target = e.target as HTMLElement;
      console.log(target.className);
      if (target instanceof HTMLElement && !target.className.includes("menu")) {
        dispatch(closeSidebar());
      }
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [components.isMenubarOpen]);

  useEffect(() => {
    window.addEventListener("resize", debounce);
    return () => window.removeEventListener("resize", debounce);
  }, [components.isMenubarOpen]);

  return (
    <div
      className={`${
        components.isMenubarOpen
          ? "fixed sidebar   top-0 left-0 lg:hidden  "
          : "left-[-100%] hidden lg:block"
      } top-0  p-4 sm:pl-8 transition-all menu   text-stone-900 dark:text-white duration-200 dark:bg-stone-950 bg-white min-h-screen  z-[100]  `}
    >
      <div className={`flex items-center gap-4 pb-6 menu  `}>
        <Menu
          onClick={() => {
            dispatch(handleMenubar());
          }}
          className="cursor-pointer"
        />
        <Link to="/" className="flex text-sm xs:text-lg items-center gap-1  ">
          <img src={YoutubeIcon} alt="" className="w-5 xs:w-7" />
          BTube
        </Link>
      </div>

      {/* bottom */}
      <div
        className={` h-[84vh] menu  overflow-y-scroll pb-10   relative  flex flex-col gap-10  sidebar pr-4  w-full`}
      >
        <div className="grid menu gap-4">
          {links.map((link: any) =>
            link.mainLinks.map((l: Link) => {
              return (
                <li
                  onClick={() => dispatch(closeSidebar())}
                  key={l.title}
                  className="flex gap-6 cursor-pointer text-dark "
                >
                  {<l.icon />} {l.title}
                </li>
              );
            })
          )}
        </div>
        <div className="grid menu gap-4">
          {links.map((link: any) =>
            link.subLinks.map((l: any) => {
              return (
                <Link
                  to="/"
                  onClick={() => dispatch(closeSidebar())}
                  key={l.title}
                  className="flex gap-6 cursor-pointer"
                >
                  {<l.icon />} {l.title}
                </Link>
              );
            })
          )}
        </div>
        <div className="grid menu gap-4">
          <h2 className="font-semibold menu text-xl ">Subscriptions</h2>
          {links.map((link: any) =>
            link.subscriptions.map((l: any) => {
              return (
                <Link
                  to="/"
                  onClick={() => dispatch(closeSidebar())}
                  key={l.title}
                  className="flex gap-6  cursor-pointer"
                >
                  {<l.icon />} {l.title}
                </Link>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
