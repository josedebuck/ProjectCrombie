"use client";

import { deletePost } from "@/lib/actions";
import Image from "next/image";
import { useState } from "react";

const PostInfo = ({ postId }: { postId: number }) => {
  const [open, setOpen] = useState(false);

  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <div className="relative">
      <Image
        src="/more.png"
        width={16}
        height={16}
        alt=""
        onClick={() => setOpen((prev) => !prev)}
        className="cursor-pointer"
      />
      {open && (
        <div className="absolute top-4 right-0 bg-white dark:bg-gray-800 p-4 w-32 rounded-lg flex flex-col gap-2 text-xs shadow-lg z-30">
          <span className="cursor-pointer text-gray-500 dark:text-gray-300">View</span>
          <form action={deletePostWithId}>
            <button className="text-red-500 dark:text-red-400">Delete</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostInfo;
