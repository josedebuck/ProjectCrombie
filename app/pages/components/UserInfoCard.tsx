import Link from "next/link";
import { MdOutlinePushPin, MdDateRange, MdSchool, MdLink } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import {  } from "react-icons/bs";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";

const UserInfoCard = ({ user }: { user?: User }) => {
  if (!user) {
    return <div>No user data available</div>; 
  }
  const createdAtDate = new Date(user.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500">
          See all
        </Link>
      </div>
      <div className="flex flex-col gap-4 text-gray-500">
        <div className="flex items-center gap-2">
          <span className="text-xl text-black">{" "} {user.name && user.surname ? user.name + " " + user.surname : user.username}</span>
          <span className="text-sm">@{user.username}</span>
        </div>
        {user.description && <p>{user.description}</p>}
       {user.work && <div className="flex items-center gap-2">
          <FaBriefcase width={16} height={16}/>
          <span>
            Wortk at <b>{user.work}</b>
          </span>
        </div>}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <MdDateRange width={16} height={16}/>
            <span>{formattedDate}</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2">Follow</button>
      </div>
    </div>
  );
};

export default UserInfoCard;
