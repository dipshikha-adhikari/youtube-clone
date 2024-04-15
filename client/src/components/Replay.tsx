import React from "react";
import { ReplyType } from "../../types";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import moment from "moment";

interface ReplayProps {
  replay: ReplyType;
}

const Replay: React.FC<ReplayProps> = ({ replay }) => {
  const date = replay.snippet.publishedAt;
  const formattedTime = moment(date).fromNow();

  return (
    <div className="">
      <div
        key={replay.etag}
        className="grid pl-10 gap-2  text-sm h-auto w-full"
      >
        <div className="flex gap-2">
          <img
            src={replay.snippet.authorProfileImageUrl}
            alt="img"
            className="w-10 h-10 rounded-full"
          />
          <div className="grid gap-2 ">
            <div className="grid gap-2">
              <p className="flex gap-4 w-full  ">
                <span className="font-semibold">
                  {replay.snippet.authorDisplayName}
                </span>{" "}
                <span>{formattedTime}</span>
              </p>
              <span className="break-all">{replay.snippet.textDisplay}</span>
            </div>

            <div className="flex gap-10 cursor-pointer">
              <span className={`   flex gap-1`}>
                {<ThumbUpOffAltIcon />}
                {replay.snippet.likeCount}
              </span>
              <span>{<ThumbDownOffAltIcon />}</span>
            </div>

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Replay;
