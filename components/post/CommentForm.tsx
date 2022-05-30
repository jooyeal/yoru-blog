import React, { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { MutationFunction, useMutation } from "react-query";

interface Props {
  id: string;
  fetch: any;
  setCancel: Dispatch<SetStateAction<boolean>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
}

const CommentForm: React.FC<Props> = ({
  id,
  fetch,
  setCancel,
  setIsLoading,
}) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const mutation = useMutation(() => fetch(id, username, password, comment), {
    onMutate: () => setIsLoading(true),
    onSuccess: () => setIsLoading(false),
  });
  const onSubmit = (e: FormEvent) => {
    mutation.mutate();
  };

  return (
    <div className="border-2 flex items-center p-2 rounded-md">
      <form className="flex flex-col w-full" onSubmit={onSubmit}>
        <div>
          <div className="font-bold text-lg">NAME</div>
          <input
            className="border rounded-md mr-2 outline-none p-2 w-full"
            type="text"
            maxLength={20}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="font-bold text-lg">PASSWORD</div>
          <input
            className="border rounded-md mr-2 outline-none p-2 w-full"
            type="password"
            maxLength={20}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <div className="font-bold text-lg">COMMENT</div>
          <textarea
            className="border rounded-md outline-none p-2 w-full resize-none"
            rows={3}
            required
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <div className="flex gap-1">
          <button type="submit" className="p-2 basis-1/2 border rounded-md">
            ADD
          </button>
          <button
            type="button"
            className="p-2 basis-1/2 border rounded-md"
            onClick={() => setCancel(false)}
          >
            CANCEL
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentForm;
