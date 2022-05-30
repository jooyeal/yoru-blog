import { useRouter } from "next/router";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import {
  BsPencilFill,
  BsReply,
  BsReplyFill,
  BsTrashFill,
} from "react-icons/bs";
import { useMutation } from "react-query";
import {
  deleteCommentApi,
  replyCommentApi,
  updateCommentApi,
} from "../../services/commentApi";
import CommentForm from "./CommentForm";
import Reply from "./Reply";

interface Props {
  comment: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Comment: React.FC<Props> = ({ comment, setIsLoading }) => {
  const router = useRouter();
  const [isModify, setIsModify] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [isReply, setIsReply] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const updateMutation = useMutation(
    () => updateCommentApi(comment.id, newComment, password),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.statusCode) {
          data.statusCode === 403 && setError(data.errorMessage);
        } else {
          router.reload();
        }
        setIsLoading(false);
      },
    }
  );

  const deleteMutation = useMutation(
    () => deleteCommentApi(comment.id, password),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data) => {
        if (data.statusCode) {
          data.statusCode === 403 && setError(data.errorMessage);
        } else {
          router.reload();
        }
        setIsLoading(false);
      },
    }
  );

  const excModify = (e: FormEvent) => {
    e.preventDefault();
    if (isModify) {
      updateMutation.mutate();
    } else if (isDelete) {
      deleteMutation.mutate();
    }
  };

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
          <div className="p-2 font-sourcecode">
            <form onSubmit={excModify}>
              <div className="flex justify-between">
                <div className="font-bold text-lg">PASSWORD</div>
                <div className="text-red-500">{error}</div>
              </div>
              <input
                className="border rounded-md mr-2 outline-none p-2 w-full"
                type="password"
                maxLength={20}
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              {isModify && (
                <>
                  <div className="font-bold text-lg">COMMENT</div>
                  <textarea
                    className="border rounded-md outline-none p-2 w-full resize-none"
                    rows={3}
                    required
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                </>
              )}
              <div className="flex justify-end gap-1 mt-1">
                <button type="submit" className="border rounded-md p-2">
                  {isDelete && `DELETE`}
                  {isModify && `MODIFY`}
                </button>
                <button
                  className="border rounded-md p-2"
                  onClick={() => {
                    setIsModify(false);
                    setIsDelete(false);
                  }}
                >
                  CANCEL
                </button>
              </div>
            </form>
          </div>
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
