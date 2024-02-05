import { ArrowBackOutlined, KeyboardVoice } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useDebouncedSearch } from "../../utils/debounce";
import { useDispatch, useSelector } from "react-redux";
import { closeSearchBar } from "../../redux/slices/componentsSlice";
import { InitialState } from "../../../types";
import { useGetSearchResultsQuery } from "../../services/videos";
import { CloseIcon } from "../../assets/icons";
import SuggestionBox from "./SuggestionBox";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const components = useSelector((state: InitialState) => state.components);
  const dispatch = useDispatch();
  const debouncedSearch = useDebouncedSearch(searchTerm, 500);
  const [showSuggestionBox, setShowSuggestionBox] = useState(false);
  const { data } = useGetSearchResultsQuery({
    nextPageToken: "", // provide nextPageToken if needed
    keyword: debouncedSearch,
  });

  useEffect(() => {
    if (debouncedSearch.length !== 0) {
      setShowSuggestionBox(true);
    } else {
      setShowSuggestionBox(false);
    }
  }, [debouncedSearch]);

  const handleSearchbox = () => {
    if(debouncedSearch !== ''){
      setShowSuggestionBox(true)
    }
  }

  return (
    <div
  
      className={`${
        components.isSearchBarOpen
          ? "flex left-0 z-50 fixed top-0 py-1   w-full flex-1 "
          : "hidden  sm:grid  gap-4 flex-1"
      } sm:relative z-50 search grid py-2 px-4 sm:px-10 dark:bg-stone-950 bg-white  mx-auto search_results `}
    >
      <div className=" flex gap-1  w-full justify-center items-center  ">
        {components.isSearchBarOpen && (
          <span
            className="sm:hidden dark:text-white cursor-pointer "
            onClick={() => {
              // setSearchTerm("");
              dispatch(closeSearchBar());
              setShowSuggestionBox(false)
            }}
          >
            {" "}
            <ArrowBackOutlined />
          </span>
        )}
        <span className="flex flex-1 border-gray-300 dark:border-stone-500 items-center border-[1.4px] px-4  rounded-md">
          <input
            type="text"
            className=" w-full search outline-none bg-transparent px-4 text-xl py-1 "
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onClick={handleSearchbox}
          />
          <span
            onClick={() => {
              setSearchTerm("");
              dispatch(closeSearchBar());
            }}
            className="cursor-pointer  z-20"
          >
            {debouncedSearch !== "" && <CloseIcon />}
          </span>
        </span>

        <span className="">
          <KeyboardVoice />
        </span>
      </div>

      {/* search results box  */}
      <SuggestionBox
        setShowSuggestionBox={setShowSuggestionBox}
        showSuggestionBox={showSuggestionBox}
        data={data}
      />
    </div>
  );
};

export default Search;