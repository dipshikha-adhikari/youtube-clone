// import { Comment } from '../../types'
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import moment from "moment";
import { CommentType } from "../../../types";

interface CommentProps {
  c: CommentType;
  setShowReply: any;
}

const Comment: React.FC<CommentProps> = ({ c, setShowReply }) => {
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
                <span className="dark:text-gray-400 text-gray-500 text-sm dar">{formattedTime}</span>
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
            <span
              className="text-sky-600 cursor-pointer"
              onClick={() => setShowReply((prev: any) => !prev)}
            >
              {c.snippet.totalReplyCount} replies
            </span>

            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
