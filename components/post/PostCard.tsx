import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Props {
  post: any;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Link href={`/posts/${post.id}`}>
      <div className="cursor-pointer w-60 border rounded-lg">
        <img
          className="rounded-tr-lg rounded-tl-lg h-40"
          src="/blog_banner.jpeg"
        />
        <div className="h-10 p-2 overflow-hidden text-ellipsis ellipsis">
          {post.title}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;