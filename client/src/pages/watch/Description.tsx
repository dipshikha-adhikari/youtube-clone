import { useState } from "react";

const Description = ({ video, formattedData }: any) => {
  const [showMore, setShowMore] = useState<boolean>(false);

  function handleDescription() {
    setShowMore((prev: any) => !prev);
  }

  if (video === undefined) return null;

  return (
    <div className="dark:bg-stone-900 bg-zinc-200 p-4 rounded-md">
      <div className="flex gap-2 font-bold">
        <span>
          {formattedData.formattedViews !== undefined &&
            formattedData.formattedViews}{" "}
          Views
        </span>
        <span>{formattedData.formattedTime}</span>
      </div>
      <p className="break-all ">
        {showMore
          ? video.snippet.description
          : video.snippet.description.slice(0, 250)}
        ...
      </p>
      <span
        className="font-bold text-xl cursor-pointer"
        onClick={handleDescription}
      >
        {showMore ? "Show less" : "Show more"}
      </span>
    </div>
  );
};

export default Description;
