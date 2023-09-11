import { useEffect, useRef } from "react";
import { useVideo } from "../../hooks/useVideo";
import WatchSkeleton from "../../components/skeleton/WatchSkeleton";
import CategoriesBar from "../../components/categories/CategoriesBar";
import Videos from "./Videos";
import Comments from "../../components/comments";
import Description from "./Description";
import VideoInfo from "./VideoInfo";

const Watch = () => {
  const { video, formattedData } = useVideo();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView();
    }
  }, [video]);

  if (video === undefined) return <WatchSkeleton />;

  return (
    <div ref={ref} className="md:flex gap-4 py-4 ">
      <div className=" flex-1 grid h-fit gap-4 xs:gap-8  dark:bg-stone-950 bg-white  text-gray-dark dark:text-white">
        <div className="w-full grid place-items-center  mx-auto  rounded-md ">
          <iframe
            src={`https://www.youtube.com/embed/${video.id}`}
            title="YouTube video player"
            className=" object-cover w-full sm:h-[400px] h-[350px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          ></iframe>
        </div>
        <h2 className="text-stone-700 break-all dark:text-white text-xl font-bold">
          {video.snippet.title}
        </h2>
        <VideoInfo video={video} formattedData={formattedData} />

        <Description video={video} formattedData={formattedData} />
          <Comments />
      </div>
      <div className="grid gap-2 h-fit  flex-[.5]">
        <div className="  py-2 top-0 category  w-full overflow-x-scroll mx-auto bg-white dark:bg-gray-dark z-50  ">
          <CategoriesBar />
        </div>
        <Videos />
      </div>
    </div>
  );
};

export default Watch;
