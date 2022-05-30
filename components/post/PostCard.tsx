import Link from "next/link";
import React from "react";

interface Props {
  post: any;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="flex cursor-pointer w-96 border h-40 rounded-lg shadow-xl">
        <div className="basis-1/2">
          <img
            className="rounded-tl-lg rounded-bl-lg w-full h-full object-cover"
            src={post.thumbnail}
          />
        </div>
        <div className="flex items-center basis-1/2 p-2 font-sourcecode font-bold">
          {post.title}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
