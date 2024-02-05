import VideosSkeleton from "../../components/skeleton/VideosSkeleton";
import { useSearch } from "../../hooks/useSearch";
import Video from "../../components/Video";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { formatNumber } from "../../utils/formatNumber";
import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { VideoType } from "../../../types";
import { useDispatch } from "react-redux";
import { setPageNumber } from "../../redux/slices/videosSlice";

const SearchResults = () => {
  const { videos, channel, channelId } = useSearch();
  const targetRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
let pageNum = 0

useEffect(() => {
window.scrollTo(0,0)
},[])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          pageNum++
          dispatch(setPageNumber(pageNum));
        }
      },
      { threshold: 0 }
    );
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }
    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [targetRef.current]);

  let subscribers = formatNumber(
    parseInt(channel?.statistics?.subscriberCount!)
  );

  if (videos.length === 0)
    return (
      <div className="py-4">
        <VideosSkeleton />
      </div>
    );

  return (
    <>
      <div className="py-4">
        {channel !== null && channel !== undefined && channelId !== "" && (
          <Link
            to={`/${channel.id}`}
            className="grid z-40 w-fit mx-auto border-gray-300 rounded-sm dark:border-stone-800 p-4 border-[.5px] gap-4 sm:flex justify-center py-10"
          >
            <img
              src={channel.snippet.thumbnails.medium.url}
              alt="img"
              className="h-20 w-f20 rounded-full sm:w-40 sm:h-40  object-cover"
            />
            <div className="grid gap-2">
              <h2 className="flex gap-1 text-xl items-center">
                {channel.snippet.title} <CheckCircleOutlineIcon />
              </h2>
              <div className="flex gap-4">
                <span className="font-semibold">
                  {channel.snippet.customUrl}
                </span>
                {subscribers} subscribers
              </div>
              <p>{channel.snippet.description.slice(0, 50)}...</p>
            </div>
          </Link>
        )}
        <div className=" grid gap-4  sm:grid-cols-2 md:grid-cols-3 w-full  py-10  ">
          {videos.map((video: VideoType) => {
            return <Video key={video.id} {...video} />;
          })}{" "}
        </div>
      </div>
      <div ref={targetRef} className="text-center ">
        {videos.length >= 9 && <span>Fetching more...</span>}
      </div>
    </>
  );
};

export default SearchResults;
