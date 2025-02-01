import Link from "next/link";
import ProfileCard from "./ProfileCard";
import { BsPostcardHeartFill } from "react-icons/bs";

const MenuLeft = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
    </div>
  );
};

export default MenuLeft;