import Image from "next/image";
import { IoIosMore, IoIosHeart } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa";


const Post = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Usuario */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="https://images.pexels.com/photos/29832930/pexels-photo-29832930.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
            alt=""
            width={48}
            height={48}
            className="w-10 h-10 rounded-full"
          />
          <span className="font-medium">Veronica Aguirre</span>
        </div>
        <IoIosMore width={16} height={16} className="" />
      </div>
      {/* Descripcion */}
      <div className="flex flex-col gap-4">
        <div className="w-full min-h-10 relative">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            dolorum corporis omnis possimus. Ipsum, nemo.
          </p>
        </div>
      </div>
      {/* Interaccion */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex gap-4">
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <IoIosHeart 
                width={16} 
                height={16} 
                className="cursor-pointer"
            />
            <span className="text-gray-300 ">|</span>
            <span className="text-gray-500">123 <span className="hidden md:inline">Likes</span></span>
          </div>
          <div className="flex items-center gap-4 bg-slate-100 p-2 rounded-xl">
            <FaCommentDots 
                width={16} 
                height={16} 
                className="cursor-pointer"
            />
            <span className="text-gray-300 ">|</span>
            <span className="text-gray-500">123 <span className="hidden md:inline">Comments</span></span>
          </div>
        </div>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Post;
