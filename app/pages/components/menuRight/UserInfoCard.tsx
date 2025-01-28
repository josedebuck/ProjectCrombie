import Link from "next/link";
import { MdDateRange } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";
import { User } from "@prisma/client";
import { auth } from "@clerk/nextjs/server";
import UpdateUser from "./updateUser";

const UserInfoCard = async ({ user }: { user?: User }) => {
  if (!user) {
    return <div>No user data available</div>; 
  }
  const createdAtDate = new Date(user.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const { userId: currentUserId } = await auth();

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-4">
      <div className="flex justify-between items-center font-medium">
        <span className="text-gray-500">User Information</span>
        {currentUserId === user.id ? (
          <UpdateUser user={user}/>
          ) : (
          <Link href="/" className="text-blue-500">
          See all
        </Link>)}
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
            Work at <b>{user.work}</b>
          </span>
        </div>}
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
            <MdDateRange width={16} height={16}/>
            <span>Joined {formattedDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoCard;