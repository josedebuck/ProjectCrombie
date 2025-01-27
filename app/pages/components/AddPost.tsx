import Image from "next/image";

const AddPost = () => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* Icono Foto de Avatar */}
      <Image
        src="https://images.pexels.com/photos/29832930/pexels-photo-29832930.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
        alt=""
        width={48}
        height={48}
        className="w-12 h-12 object-cover rounded-full"
      />
      {/* Post */}
      <div className="flex-1">
        {/* Text Input */}
        <form className="flex gap-4">
          <textarea placeholder="¿Qué estas pensando?" className="flex-1 bg-slate-100 rounded-lg p-2"></textarea>
          <div className="w-5 h-5 cursor-pointer self-end">😄</div>

        </form>
        {/* Opciones de Post */}
        <div className="flex items-center gap-4 mt-4 text-gray-400">
          <div className="flex items'center gap-2 cursor-pointer">
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
