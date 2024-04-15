// import { Comment } from '../../types'
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import moment from "moment";
import { CommentType } from "../../../types";
import { useEffect } from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
interface CommentProps {
  c: CommentType;
  setShowReply: any;
  setCommentId: (props: string) => void;
  commentId: string;
  showReplay: boolean;
}

const Comment: React.FC<CommentProps> = ({
  c,
  setShowReply,
  setCommentId,
  showReplay,
  commentId,
}) => {
  const date = c.snippet.topLevelComment.snippet.publishedAt;
  const formattedTime = moment(date).fromNow();

  return (
    <div>
      <div key={c.etag} className="grid gap-2 break-all  h-auto ">
        <div className="flex gap-4">
          <img
            src={c.snippet.topLevelComment.snippet.authorProfileImageUrl}
            alt="img"
            className="w-8 h-8 rounded-full"
          />
          <div className="grid gap-2  ">
            <div className="grid gap-2">
              <p className="grid ">
                <span className="font-semibold">
                  {c.snippet.topLevelComment.snippet.authorDisplayName}
                </span>{" "}
                <span className="dark:text-gray-400 text-gray-500 text-sm dar">
                  {formattedTime}
                </span>
              </p>
              <span className="break-all">
                {c.snippet.topLevelComment.snippet.textDisplay}
              </span>
            </div>

            <div className="flex gap-4 cursor-pointer">
              <span className={`   flex `}>
                {<ThumbUpOffAltIcon />}
                {c.snippet.topLevelComment.snippet.likeCount}
              </span>
              <span>{<ThumbDownOffAltIcon />}</span>
            </div>
            {showReplay && c.id === commentId ? (
              <span
                className="text-sky-600 cursor-pointer"
                onClick={() => {
                  setShowReply(false);
                }}
              >
                <span>
                  {" "}
                  <KeyboardArrowUpIcon />
                </span>
                {c.snippet.totalReplyCount} replies
              </span>
            ) : (
              <span
                className="text-sky-600 cursor-pointer"
                onClick={() => {
                  setShowReply(true);
                  setCommentId(c.id);
                  console.log(c.id, commentId);
                }}
              >
                <span>
                  {" "}
                  <ExpandMoreIcon />
                </span>
                {c.snippet.totalReplyCount} replies
              </span>
            )}

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
