import CategoriesBar from "../../components/categories/CategoriesBar";
import Videos from "./Videos";
import { useLocation } from "react-router-dom";

const Homepage = () => {
  const location = useLocation();

  return (
    <>
      <div className="z-40 home grid gap-2  relative dark:bg-stone-950 dark:text-white bg-white   ">
        <div className=" sticky z-20 py-2 top-0 category  left-0 w-full overflow-x-scroll mx-auto bg-white dark:bg-gray-dark  ">
          <CategoriesBar />
        </div>
        <div className="w-full  pb-2   relative   ">
          {location.pathname === "/" && <Videos />}
        </div>
      </div>
    </>
  );
};

export default Homepage;
