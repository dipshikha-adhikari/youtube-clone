import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatNumber } from "../utils/formatNumber";
import { useGetChannelQuery } from "../services/videos";
import ErrorPage from "./ErrorPage";

const Channel = () => {
  const id = useParams().id;
  const { data: channel } = useGetChannelQuery(id);
  const [formattedSubscribers, setFormattedSubscribers] = useState();

  useEffect(() => {
    if (channel !== undefined) {
      let fSubs: any = formatNumber(Number(channel.statistics.subscriberCount));
      setFormattedSubscribers(fSubs);
    }
  }, [channel]);

  if (channel === undefined || channel === null) return <ErrorPage />;

  return (
    <>
      <div className="grid gap-4 text-stone-900 dark:text-white p-1 sm:px-10 ">
        <img
          src={channel?.brandingSettings?.image?.bannerExternalUrl}
          alt="image"
          className=" object-cover h-[100px] w-full"
        />

        <div className=" grid py-2 place-items-center sm:flex sm:items-start gap-4 ">
          <img
            src={channel.snippet.thumbnails.medium.url}
            alt=""
            className="w-20  h-20 object-cover rounded-full"
          />
          <div className="grid  place-items-center  sm:place-items-start py-2 gap-2">
            <h2 className="text-xl  font-semibold">{channel.snippet.title}</h2>
            <div className="flex text-sm xs:text-lg  gap-4">
              <span className="font-semibold">{channel.snippet.customUrl}</span>
              <span>{formattedSubscribers} subscribers</span>
              <span>{channel?.statistics?.videoCount} videos</span>
            </div>
            <p className="word-break w-full">{channel?.snippet?.description}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Channel;
