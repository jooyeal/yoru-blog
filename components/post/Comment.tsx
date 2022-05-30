import React, { Dispatch, SetStateAction, useState } from "react";
import { BsPencilFill, BsReplyFill, BsTrashFill } from "react-icons/bs";
import {
  deleteCommentApi,
  replyCommentApi,
  updateCommentApi,
} from "../../services/commentApi";
import CommentForm from "./CommentForm";
import CommentModifyForm from "./CommentModifyForm";
import Reply from "./Reply";

interface Props {
  comment: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Comment: React.FC<Props> = ({ comment, setIsLoading }) => {
  const [isModify, setIsModify] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isReply, setIsReply] = useState<boolean>(false);

  return (
    <>
      <div className="flex flex-col p-4 shadow border-t-2">
        <div className="flex justify-between text-base font-bold font-sourcecode">
          <span>{comment.username}</span>
          <span>
            {new Date(comment.createdAt._seconds * 1000)
              .toISOString()
              .substr(0, 10)}
            {!isModify && !isDelete && (
              <div className="flex justify-end">
                <div className="flex gap-2 text-lg">
                  <div
                    className="rounded-full border p-2 cursor-pointer"
                    onClick={() => setIsReply(true)}
                  >
                    <BsReplyFill />
                  </div>
                  <div
                    className="rounded-full p-2 border cursor-pointer"
                    onClick={() => {
                      setIsModify(true);
                      setIsDelete(false);
                    }}
                  >
                    <BsPencilFill className="text-green-600" />
                  </div>
                  <div
                    className="rounded-full p-2 border cursor-pointer"
                    onClick={() => {
                      setIsModify(false);
                      setIsDelete(true);
                    }}
                  >
                    <BsTrashFill className="text-red-600" />
                  </div>
                </div>
              </div>
            )}
          </span>
        </div>
        {isModify || isDelete ? (
          <CommentModifyForm
            id={comment.id}
            updateFetch={updateCommentApi}
            deleteFetch={deleteCommentApi}
            isModify={isModify}
            isDelete={isDelete}
            setCancel={() => {
              setIsModify(false);
              setIsDelete(false);
            }}
            setIsLoading={setIsLoading}
          />
        ) : (
          <>
            <div className="p-2 font-sourcecode border-2 mt-1 rounded-md">
              {comment.comment}
            </div>
            <div>
              {comment.replies?.map((replyId: string, index: number) => (
                <Reply
                  key={index}
                  commentId={comment.id}
                  replyId={replyId}
                  setIsLoading={setIsLoading}
                />
              ))}
            </div>
          </>
        )}
      </div>
      {isReply && (
        <CommentForm
          id={comment.id}
          fetch={replyCommentApi}
          setCancel={setIsReply}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
};

export default Comment;
