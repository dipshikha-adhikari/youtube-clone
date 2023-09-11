import { useDispatch, useSelector } from "react-redux";
import {
  Menu,
  SearchIcon,
  LoginIcon,
  LogoutIcon,
  LightModeIcon,
  DarkModeIcon,
} from "../../assets/icons";
import YoutubeIcon from "../../assets/images/youtube.png";
import {
  handleMenubar,
  openSearchBar,
} from "../../redux/slices/componentsSlice";
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";
import { login, logout } from "../../redux/actions/auth";
import { changeTheme } from "../../redux/slices/themeSlice";
import { InitialState } from "../../../types";
import Sidebar from "../Sidebar";

const Navbar:React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: InitialState) => state.auth.user);
  let theme = useSelector((s: InitialState) => s.theme);
let sidebarOpen = useSelector((s:InitialState) => s.components.isMenubarOpen)

  return (
    <>
      <div
        className={`top-0  p-4 sm:px-8  fixed dark:bg-stone-950 bg-white flex  text-stone-900 justify-between   h-[8vh] xs:h-[10vh] mx-auto  w-full     dark:text-white z-50 
`}
      >
        <div className=" max-w-[1500px] flex justify-between items-center w-full mx-auto">
          {/* left */}
          <div
            className={`     flex items-center gap-4  

          `}
          >
            <span
              onClick={() => {
                dispatch(handleMenubar())
                console.log('f')
              }}
              className="cursor-pointer grid  "
            >
              <Menu />
            </span>
            <Link
              to="/"
              className="flex text-sm xs:text-lg items-center gap-1  "
            >
              <img src={YoutubeIcon} alt="" className="w-5 xs:w-7" />
              BTube
            </Link>
          </div>

          {/* mid */}
          <Search />

          {/* right  */}
          <div
            className={` flex  justify-end gap-4 sm:gap-10  items-center 
           `}
          >
            <span
              className=" cursor-pointer sm:hidden"
              onClick={() => dispatch(openSearchBar())}
            >
              <SearchIcon />
            </span>
            {user ? (
              <span onClick={() => logout(dispatch)} className="cursor-pointer">
                <LogoutIcon /> Sign out
              </span>
            ) : (
              <span onClick={() => login(dispatch)} className="cursor-pointer">
                <LoginIcon /> Sign in
              </span>
            )}

            {theme.darkTheme ? (
              <span
                onClick={() => dispatch(changeTheme())}
                className="cursor-pointer"
              >
                <LightModeIcon />
              </span>
            ) : (
              <span
                onClick={() => dispatch(changeTheme())}
                className="cursor-pointer"
              >
                <DarkModeIcon />
              </span>
            )}
          </div>
        </div>
      </div>
{sidebarOpen && <Sidebar/>}
    </>
  );
};

export default Navbar
