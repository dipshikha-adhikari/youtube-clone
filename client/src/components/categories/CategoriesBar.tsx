import { CategoryType, InitialState } from "../../../types";
import { useSelector } from "react-redux";
import { useGetVideoCategoriesQuery } from "../../services/videos";
import Box from "./Box";

const CategoriesBar = () => {
  const array = new Array(15).fill(0);
  const { data: categories } = useGetVideoCategoriesQuery("");
  const category = useSelector((s: InitialState) => s.videos.selectedCategory);

  if (categories === undefined)
    return (
      <div className="flex gap-2 ">
        {" "}
        {array.map((a, i: any) => {
          return (
            <span
              key={i * 2}
              className="cat_loading  relative h-[4vh] bg-slate-300 text-stone-900 dark:bg-shadow-dark  min-w-[70px]  dark:text-white px-2 rounded-sm"
            ></span>
          );
        })}
      </div>
    );

  return (
    <div className="flex gap-2">
      {category === "" ? (
        <Box category={null} key="all" status="active" title="All" />
      ) : (
        <Box category={null} key="all" status="" title="All" />
      )}
      {categories.map((c: CategoryType) => {
        if (c.id === category) {
          return (
            <Box
              category={c}
              key={c.id}
              status="active"
              title={c.snippet.title}
            />
          );
        } else {
          return (
            <Box category={c} key={c.id} status="" title={c.snippet.title} />
          );
        }
      })}
    </div>
  );
};

export default CategoriesBar;
