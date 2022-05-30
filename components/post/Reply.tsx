import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsArrowReturnRight, BsPencilFill, BsTrashFill } from "react-icons/bs";
import {
  deleteReplyApi,
  getReplyApi,
  updateReplyApi,
} from "../../services/commentApi";
import CommentModifyForm from "./CommentModifyForm";

interface Props {
  commentId: string;
  replyId: string;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const Reply: React.FC<Props> = ({ commentId, replyId, setIsLoading }) => {
  const [content, setContent] = useState<{
    username: string;
    comment: string;
  }>({ username: "", comment: "" });
  const [isModify, setIsModify] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);

  useEffect(() => {
    const getReply = async () => {
      const response = await getReplyApi(replyId);
      setContent(response);
    };
    getReply();
  }, []);

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
        <CommentModifyForm
          commentId={commentId}
          id={replyId}
          updateFetch={updateReplyApi}
          deleteFetch={deleteReplyApi}
          isModify={isModify}
          isDelete={isDelete}
          setCancel={() => {
            setIsModify(false);
            setIsDelete(false);
          }}
          setIsLoading={setIsLoading}
        />
      ) : (
        <div className="text-sm">{content.comment}</div>
      )}
    </div>
  );
};

export default Reply;
