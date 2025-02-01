"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState(""); // Descripción del post

  if (!isLoaded) return "Loading..."; // Espera mientras se carga la información del usuario

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Si la descripción no está vacía, se envía el post
    if (desc.trim() !== "") {
      addPost(new FormData(e.target as HTMLFormElement));
      setDesc(""); // Limpia el campo de descripción
    }
  };

  return (
  <div className="p-4 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800  shadow-md rounded-lg flex gap-4 justify-between text-sm">
  {/* Icono Foto de Avatar */}
  <Image
    src={user?.imageUrl || "/noAvatar.png"}
    alt=""
    width={48}
    height={48}
    className="w-12 h-12 object-cover rounded-full"
  />
  {/* Post */}
  <div className="flex-1">
    {/* Text Input */}
    <form onSubmit={handleSubmit} className="flex gap-4">
      <textarea
        placeholder="¿Qué estas pensando?"
        className="flex-1 bg-slate-100 dark:bg-slate-700 rounded-lg p-2 text-black dark:text-white"
        name="desc"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>
      <div>
        <div className="w-5 h-5 cursor-pointer self-end">😄</div>
        <AddPostButton />
      </div>
    </form>
    {/* Opciones de Post */}
    <div className="flex items-center gap-4 mt-4 text-gray-400 dark:text-gray-500">
      <div className="flex items'center gap-2 cursor-pointer">Post</div>
    </div>
  </div>
</div>

  );
};

export default AddPost;
