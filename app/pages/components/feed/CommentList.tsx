"use client";

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
  const [commentState, setCommentState] = useState(
    [...comments].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
  );
  const [desc, setDesc] = useState("");

  const add = async () => {
    if (!user || !desc) return;

    const newComment: CommentWithUser = {
      id: Math.random(),
      desc,
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
      postId: postId,
      user: {
        id: user.id,
        username: "Enviando...",
        avatar: user.imageUrl || "/noAvatar.png",
        cover: "",
        description: "",
        name: "",
        surname: "",
        work: "",
        createdAt: new Date(),
      },
    };

    addOptimisticComment(newComment);

    try {
      const createdComment = await addComment(postId, desc);
      setCommentState((prev) => [...prev, createdComment]);
    } catch (err) {
      console.error("Error al agregar el comentario", err);
    }
  };

  const [optimisticComments, addOptimisticComment] = useOptimistic(
    commentState,
    (state, value: CommentWithUser) => [...state, value] 
  );

  return (
    <>
      {user && (
        <div className="flex items-center gap-4">
          <Image
            src={user.imageUrl || "/noAvatar.png"}
            alt="Avatar del usuario"
            width={32}
            height={32}
            className="w-10 h-10 rounded-full border border-gray-400 dark:border-gray-600"
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              add();
            }}
            className="flex items-center justify-between bg-gray-100 dark:bg-gray-800 border border-gray-400 dark:border-gray-600 rounded-xl text-sm px-6 py-2 w-full"
          >
            <input
              type="text"
              placeholder="Haz un comentario..."
              className="bg-transparent outline-none flex-1 dark:text-white"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
            />
            <div className="w-5 h-5 cursor-pointer self-end">😄</div>
          </form>
        </div>
      )}
      <div className="mt-6">
        {optimisticComments.map((comment) => (
          <div key={comment.id} className="flex gap-4 justify-between mt-6 border-t border-gray-300 dark:border-gray-600 pt-4">
            <Image
              src={comment.user.avatar || "/noAvatar.png"}
              alt="Avatar del usuario"
              width={40}
              height={40}
              className="w-12 h-12 rounded-full border border-gray-300 dark:border-gray-500"
            />
            <div className="flex flex-col gap-2 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-500 hover:underline">
                  {comment.user.username}
                </span>
                <span className="text-gray-500 text-xs">
                  {new Date(comment.createdAt).toLocaleString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <p className="text-black dark:text-white">{comment.desc}</p>
              <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CommentList;
