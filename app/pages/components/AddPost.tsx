"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { useState } from "react";
import AddPostButton from "./AddPostButton";
import { addPost } from "@/lib/actions";

const AddPost = () => {
  const { user, isLoaded } = useUser();
  const [desc, setDesc] = useState("");

  if (!isLoaded) {
    return "Loading...";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (desc.trim() !== "") { // Solo enviar el formulario si desc tiene texto
      addPost(new FormData(e.target as HTMLFormElement));
      setDesc(""); // Limpiar textarea después de enviar
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
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
            className="flex-1 bg-slate-100 rounded-lg p-2"
            name="desc"
            value={desc} // Mantener `desc` como el valor del textarea
            onChange={(e) => setDesc(e.target.value)} // Actualizar el estado con el valor del input
          ></textarea>
          <div>
            <div className="w-5 h-5 cursor-pointer self-end">😄</div>
            <AddPostButton />
          </div>
        </form>
        {/* Opciones de Post */}
        <div className="flex items-center gap-4 mt-4 text-gray-400">
          <div className="flex items'center gap-2 cursor-pointer">Post</div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
