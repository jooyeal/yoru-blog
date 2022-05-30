import { useRouter } from "next/router";
import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { useMutation } from "react-query";

interface Props {
  commentId?: string;
  id: string;
  updateFetch: any;
  deleteFetch: any;
  isModify: boolean;
  isDelete: boolean;
  setCancel: () => void;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const CommentModifyForm: React.FC<Props> = ({
  commentId,
  id,
  updateFetch,
  deleteFetch,
  isModify,
  isDelete,
  setCancel,
  setIsLoading,
}) => {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newComment, setNewComment] = useState<string>("");

  const updateMutation = useMutation(
    () => updateFetch(id, newComment, password),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data: any) => {
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
    commentId
      ? () => deleteFetch(commentId, id, password)
      : () => deleteFetch(id, password),
    {
      onMutate: () => {
        setIsLoading(true);
      },
      onSuccess: (data: any) => {
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
              setCancel();
            }}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentModifyForm;
