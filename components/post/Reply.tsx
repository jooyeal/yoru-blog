import { useRouter } from "next/router";
import React, {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { BsArrowReturnRight, BsPencilFill, BsTrashFill } from "react-icons/bs";
import { useMutation } from "react-query";
import {
  deleteReplyApi,
  getReplyApi,
  updateReplyApi,
} from "../../services/commentApi";

interface Props {
  commentId: string;
  replyId: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Reply: React.FC<Props> = ({ commentId, replyId, setIsLoading }) => {
  const router = useRouter();
  const [content, setContent] = useState<{
    username: string;
    comment: string;
  }>({ username: "", comment: "" });
  const [password, setPassword] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");
  const [isModify, setIsModify] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const getReply = async () => {
      const response = await getReplyApi(replyId);
      setContent(response);
    };
    getReply();
  }, []);

  const updateMutation = useMutation(
    () => updateReplyApi(replyId, password, newComment),
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
    () => deleteReplyApi(commentId, replyId, password),
    {
      onMutate: () => setIsLoading(true),
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
    <div className="border p-2 mt-1 rounded-md font-sourcecode">
      <div className="flex justify-between items-center text-sm">
        <div className="flex items-center">
          <BsArrowReturnRight />
          <div className="font-bold ml-1">{content.username}</div>
        </div>
        {!isModify && !isDelete && (
          <div className="flex gap-2 text-xs">
            <div
              className="rounded-full p-2 border cursor-pointer"
              onClick={() => setIsModify(true)}
            >
              <BsPencilFill className="text-green-600" />
            </div>
            <div
              className="rounded-full p-2 border cursor-pointer"
              onClick={() => setIsDelete(true)}
            >
              <BsTrashFill className="text-red-600" />
            </div>
          </div>
        )}
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
                type="button"
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
        <div className="text-sm">{content.comment}</div>
      )}
    </div>
  );
};

export default Reply;
