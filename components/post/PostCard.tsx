import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  post: any;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="cursor-pointer w-60 border rounded-lg shadow-xl">
        <img
          className="rounded-tr-lg rounded-tl-lg w-full h-40 object-cover"
          src={post.thumbnail}
        />
        <div className="h-10 p-2 overflow-hidden text-ellipsis ellipsis font-sourcecode">
          {post.title}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
