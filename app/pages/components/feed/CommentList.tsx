"use client"

import { IoIosMore } from "react-icons/io"; 
import Image from "next/image";
import { Comment, User } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import { useOptimistic, useState } from "react";
import { addComment } from "@/lib/actions";
type CommentWithUser = Comment & { user: User };

const CommentList = ({
  comments,
  postId,
}: {
  comments: CommentWithUser[];
  postId: number;
}) => {
  const { user } = useUser();
  const [commentState, setCommentState] = useState(comments);
  const [desc, setDesc] = useState("");

  const add = async () => {
    if (!user || !desc) return;

    addOptimisticComment({
      id: Math.random(),
      desc,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Sending Please Wait...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        work: "",
        createdAt: new Date(Date.now()),
      },
    });

    try {

      const formData = new FormData();
      formData.append("desc", desc);
      formData.append("postId", String(postId)); 

      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (err) {
      // Manejo de errores
      console.error("Error al agregar el comentario", err);
    }
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [value, ...state]
  );

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            alt=""
            width={32}
            height={32}
            className="w-8 h-8 rounded-full"
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              add();
            }}
            className="flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Haz un comentario..."
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
              value={desc} // Asegura que el valor sea el estado
            />
            <div className="w-5 h-5 cursor-pointer self-end">😄</div>
          </form>
        </div>
      )}
      <div className="mt-6">
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="">Reply</div>
              </div>
            </div>
            <IoIosMore width={16} height={16} className="cursor-pointer w-4 h-4" />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
