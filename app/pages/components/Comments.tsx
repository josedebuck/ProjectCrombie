import Image from "next/image";
import { IoIosHeart, IoIosMore } from "react-icons/io";

const Comments = () => {
  return (
    <div className="">
      {/* Write */}
      <div className="flex items-center gap-4">
        <Image
          src="https://images.pexels.com/photos/11288126/pexels-photo-11288126.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
          alt=""
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
        <div className="flex items-center justify-between bg-slate-100 rounded-xl text-sm px-6 py-2 w-full">
          <input
            type="text"
            placeholder="Haz un comentario..."
            className="bg-transparent outline-none flex-1"
          />
          <div className="w-5 h-5 cursor-pointer self-end">😄</div>
        </div>
      </div>
      {/* Comments */}
      <div className="">
        {/* Comment */}
        <div className="flex gap-4 justify-between mt-6">
          {/* Avatar */}
          <Image
            src="https://images.pexels.com/photos/11288126/pexels-photo-11288126.jpeg?auto=compress&cs=tinysrgb&w=300&lazy=load"
            alt=""
            width={40}
            height={40}
            className="w-10 h-10 rounded-full"
          />
          {/* Descripcion */}
          <div className="flex flex-col gap-2 flex-1">
            <span className="font-medium">Bernardino Rivadavia</span>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet
              atque a eum quas voluptatum dolores?
            </p>
            <div className="flex items-center gap-8 text-xs text-gray-500 mt-2">
              <div className="">
                <IoIosHeart
                  width={12}
                  height={12}
                  className="cursor-pointer w-4 h-4"
                />
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">123 likes</span>
              </div>
              <div className="">Reply</div>
            </div>
          </div>
          {/* Icono */}
          <IoIosMore
            widths={16}
            height={16}
            className="cursor-pointer w-4 h-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Comments;
