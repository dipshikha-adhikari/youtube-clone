import { Link } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import moment from "moment";
import { formatNumber } from "../utils/formatNumber";
import { useEffect, useState } from "react";
import { VideoType } from "../../types";
import { useGetChannelQuery } from "../services/videos";

const Video = (video: VideoType) => {
  const date = video.snippet.publishedAt;
  const publishedTime = moment(date).fromNow();
  let views = video.statistics.viewCount;
  const formattedViews = formatNumber(Number(views));
  const [duration, setDuration] = useState<any>();

  const { data: channel } = useGetChannelQuery(video.snippet.channelId);

  if (video === undefined) return null;

  useEffect(() => {
    const seconds = moment
      .duration(video?.contentDetails?.duration)
      .asSeconds();
    const time = moment.utc(seconds * 1000).format("mm:ss");
    setDuration(time);
  }, [video]);


  return (
    <div className="max-w-[420px] w-full  overflow-hidden h-fit text-stone-900 dark:text-white mx-auto ">
      <Link to={`/watch/${video.id}`} className="">
        <div className="relative h-[200px]">
          <img
            src={video.snippet.thumbnails.medium.url}
            alt=""
            className="w-full h-full object-cover rounded-md"
          />
          <span className="absolute bg-[rgba(0,0,0,0.5)] p-1 text-white bottom-0 right-0 ">
            {duration !== undefined && duration}
          </span>
        </div>
        <div className="flex gap-2 items-center py-2">
          <img
            src={channel?.snippet?.thumbnails?.medium.url}
            alt="img"
            className="max-w-[50px] rounded-full"
          />
          <div className="">
       <h2 className="break-all">{video.snippet.title.slice(0,100)}</h2>
            <span className="flex gap-2">
              {video.snippet.channelTitle} <CheckCircleIcon />
            </span>
            <span className="flex gap-2">
              {formattedViews} Views <span>{publishedTime} </span>
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Video;
