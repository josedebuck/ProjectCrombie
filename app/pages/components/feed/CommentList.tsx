"use client";

import { IoIosMore } from "react-icons/io"; // Eliminar IoIosHeart si no se usa
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
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [createdComment, ...prev]);
    } catch (err) {
      // Manejo de errores opcional
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
            action={add}
            className="flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Haz un comentario..."
              className="bg-transparent outline-none flex-1"
              onChange={(e) => setDesc(e.target.value)}
            />
            <div className="w-5 h-5 cursor-pointer self-end">😄</div>
          </form>
        </div>
      )}
      <div className="">
        {/* Comment */}
        {optimisticComments.map((comment) => (
          <div className="flex gap-4 justify-between mt-6" key={comment.id}>
            {/* Avatar */}
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full"
            />
            {/* Descripcion */}
            <div className="flex flex-col gap-2 flex-1">
              <span className="font-medium">
                {comment.user.name && comment.user.surname
                  ? comment.user.name + " " + comment.user.surname
                  : comment.user.username}
              </span>
              <p>
                {comment.desc}
              </p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
                <div className="">Reply</div>
              </div>
            </div>
            {/* Icono */}
            <IoIosMore
              width={16}
              height={16}
              className="cursor-pointer w-4 h-4"
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
