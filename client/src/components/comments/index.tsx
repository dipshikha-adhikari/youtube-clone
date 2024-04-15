import { CommentType, ReplyType } from "../../../types";

import Comment from "./Comment";
import Replay from "../Replay";
import { Dispatch, SetStateAction, useState } from "react";
import { useGetCommentsQuery } from "../../services/videos";
import { useParams } from "react-router-dom";

const Comments = () => {
  const [showReply, setShowReply] = useState(false);
  const [commentId, setCommentId] = useState<string>("");

  const id = useParams().videoId;
  const { data: comments } = useGetCommentsQuery(id);

  if (comments === undefined) return null;

  return (
    <div className="text-stone-900 dark:text-white grid gap-10 py-10 ">
      <div className="flex  gap-10">
        <span className="flex gap-4 font-semibold">
          {" "}
          {comments.length} comments
        </span>
      </div>
      {comments.map((c: CommentType) => {
        return (
          <div key={c.etag} className="my-[-1rem]">
            <Comment
              c={c}
              setShowReply={setShowReply}
              setCommentId={setCommentId}
              showReplay={showReply}
              commentId={commentId}
            />

            {showReply &&
              c.replies !== undefined &&
              c.replies.comments.map((r: ReplyType) => {
                if (commentId === r.snippet.parentId) {
                  return <Replay key={r.id} replay={r} />;
                }
              })}
          </div>
        );
      })}
    </div>
  );
};

export default Comments;
