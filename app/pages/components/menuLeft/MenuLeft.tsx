import Link from "next/link";
import ProfileCard from "./ProfileCard";
import { BsPostcardHeartFill } from "react-icons/bs";

const MenuLeft = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
      <div className="p-4 bg-white rounded-lg shadow-md text-sm text-gray-500 flex flex-col gap-2">
        <div
          className="flex items-center gap-4 p-2 rounded-lg hover:bg-slate-100"
        >
          <BsPostcardHeartFill width={20} height={20} />
          <span>My Posts</span>
        </div>
      </div>
    </div>
  );
};

export default MenuLeft;