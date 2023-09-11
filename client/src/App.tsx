import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { InitialState } from "../types";

import Navbar from "./components/navbar";
import Watch from "./pages/watch";
import { Channel, ErrorPage, Homepage, Subscriptions } from "./pages";
import SearchResults from "./pages/search_results";
import Sidebar from "./components/Sidebar";
import SubSidebar from "./components/SubSidebar";

const App = () => {
  const location = useLocation();
  let extracted = location.pathname.split("/")[1];
  const components = useSelector((s: InitialState) => s.components);
  let theme = useSelector((s: InitialState) => s.theme);

  useEffect(() => {
    if (theme.darkTheme === false) {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    }
  }, [theme.darkTheme]);


  
  return (
    <>
    <Navbar />

{/* these two sidebar are only for homepage  */}

<div
  className={` text-stone-900   dark:text-white flex max-w-[1500px] mx-auto w-full`}
>

  {/*left section */}
<div className= {`
    ${extracted === "watch" && "hidden"}
 ` } >
    <Sidebar />
  <div

    className={`${
      components.isMenubarOpen ? "lg:block" : "lg:hidden"
    } pt-[20vh] md:block hidden `}
  >
    <SubSidebar />
 </div>
</div>

{/* right section  */}
  <div className=" mt-[8vh] app xs:mt-[10vh] h-[90vh] z-40 w-full overflow-y-scroll  px-4 sm:px-8 ">
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/subscriptions" element={<Subscriptions />} />
      <Route path="/watch/:videoId" element={<Watch />} />
      <Route path="/results" element={<SearchResults/>} />
      <Route path="/:id" element={<Channel/>} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  </div>
</div>
    </>
  );
};

export default App;
