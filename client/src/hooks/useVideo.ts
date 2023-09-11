import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber";
import moment from "moment";
import { useGetVideoByIdQuery } from "../services/videos";

export const useVideo = () => {
  const [formattedData, setFormattedData] = useState<any>({
    formattedViews: "",
    formattedLikes: "",
    formattedTime: "",
  });
  const videoId = useParams().videoId;
  const { data: video } = useGetVideoByIdQuery(videoId)


  useEffect(() => {
    if (video !== undefined) {
      let views = video.statistics.viewCount;
      let fViews: any = formatNumber(Number(views));
      let likes = video.statistics.likeCount;
      let fLikes: any = formatNumber(Number(likes));
      let time = video.snippet.publishedAt;
      let fTime = moment(time).fromNow();
      setFormattedData({
        formattedLikes: fLikes,
        formattedViews: fViews,
        formattedTime: fTime,
      });

    }
  }, [video]);

  return {
    video,
    formattedData,
  };
};
