import { useRouter } from "next/router";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { BsPencil, BsPencilFill, BsTrash, BsTrashFill } from "react-icons/bs";
import { useMutation } from "react-query";
import { deleteCommentApi, updateCommentApi } from "../../services/commentApi";

interface Props {
  comment: any;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Comment: React.FC<Props> = ({ comment, setIsLoading }) => {
  const router = useRouter();
  const [isModify, setIsModify] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [error, setError] = useState<string>("");
  const mutation = useMutation(
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
      onError: (error) => {
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
      onError: (error) => {
        setIsLoading(false);
      },
    }
  );

  const excModify = (e: FormEvent) => {
    e.preventDefault();
    if (isModify) {
      mutation.mutate();
    } else if (isDelete) {
      deleteMutation.mutate();
    }
  };

  return (
    <div className="flex flex-col p-4 shadow">
      <div className="flex justify-between text-base font-bold font-sourcecode">
        <span>{comment.username}</span>
        <span>
          {new Date(comment.createdAt._seconds * 1000)
            .toISOString()
            .substr(0, 10)}
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
        <div className="p-2 font-sourcecode">{comment.comment}</div>
      )}
      {!isModify && !isDelete && (
        <div className="flex justify-end">
          <div className="flex gap-2 text-lg">
            <BsPencilFill
              className="text-green-600 cursor-pointer"
              onClick={() => {
                setIsModify(true);
                setIsDelete(false);
              }}
            />
            <BsTrashFill
              className="text-red-600 cursor-pointer"
              onClick={() => {
                setIsModify(false);
                setIsDelete(true);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Comment;
