import Link from "next/link";
import { MdOutlinePushPin, MdDateRange, MdSchool, MdLink } from "react-icons/md";
import { FaBriefcase } from "react-icons/fa";

const UserInfoCard = ({ userId }: { userId?: string }) => {
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
          <span className="text-xl text-black">Test</span>
          <span className="text-sm">@test</span>
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
          molestiae sapiente placeat
        </p>
        <div className="flex items-center gap-2">
          <MdOutlinePushPin width={16} height={16}/>
          <span>
            Living in <b>Santa Fe</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <MdSchool  width={16} height={16}/>
          <span>
            Went to <b>Sagrado Corazon de Jesus</b>
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaBriefcase width={16} height={16}/>
          <span>
            Wortk at <b>Crombie</b>
          </span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1 items-center">
          <MdLink width={16} height={16}/>
          <Link href={"https://portfoliojosedebuck.vercel.app/"} className="text-blue-500 font-medium">josedebuck</Link>
          </div>
          <div className="flex gap-1 items-center">
            <MdDateRange width={16} height={16}/>
            <span>Joined in 2022</span>
          </div>
        </div>
        <button className="bg-blue-500 text-white text-sm rounded-md p-2">Follow</button>
        <span className="text-red-400 self-end text-xs cursor-pointer">Block User</span>

      </div>
    </div>
  );
};

export default UserInfoCard;
