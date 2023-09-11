import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { formatNumber } from "../../utils/formatNumber";
import { useGetChannelQuery } from "../../services/videos";

const VideoInfo = ({video, formattedData}:any) => {
  const [formatSubs, setFormatSubs] = useState<any>();
  const [thumb, setThumb] = useState({
    up: false,
    down: false,
  });
const{data:channel} = useGetChannelQuery(video?.snippet.channelId)

  useEffect(() => {
    if (channel !== undefined && channel.statistics !== undefined) {
      let subscribers = channel.statistics.subscriberCount;
      let fSubs = formatNumber(Number(subscribers));
      setFormatSubs(fSubs);
    }
  }, [channel]);

  if (video === undefined) return null;

  return (
    <>
      <div className="flex items-center gap-4 max-w-[400px] xs:gap-10 ">
        <Link
          to={`/${channel?.id}`}
          className="flex items-center  gap-4 w-full xs:gap-10"
        >
          <img
            src={`${video.snippet.thumbnails.medium.url}`}
            alt=""
            className="w-10 h-10 object-cover rounded-full"
          />
          <div className="grid">
            <span className="font-semibold">{video.snippet.channelTitle}</span>
            <span>{formatSubs} subscribers</span>
          </div>
        </Link>
        <button className=" cursor-default text-sm p-1 bg-stone-900 text-white rounded-md  dark:bg-white dark:text-stone-900">
          Subscribe
        </button>
      </div>

      <div className="flex gap-10 ">
        <span
          onClick={(prev: any) => setThumb({ ...prev, up: !thumb.up })}
          className="flex gap-2"
        >
          {thumb.up ? (
            <ThumbUpIcon className="cursor-pointer" />
          ) : (
            <ThumbUpOffAltIcon className="cursor-pointer" />
          )}
          {formattedData.formattedLikes} likes
        </span>

        <span onClick={(prev: any) => setThumb({ ...prev, down: !thumb.down })}>
          {thumb.down ? (
            <ThumbDownIcon className="cursor-pointer" />
          ) : (
            <ThumbDownOffAltIcon className="cursor-pointer" />
          )}
        </span>
      </div>
    </>
  );
};

export default VideoInfo;
