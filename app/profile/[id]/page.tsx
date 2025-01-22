import Feed from "@/app/pages/components/Feed";
import MenuLeft from "@/app/pages/components/MenuLeft";
import MenuRight from "@/app/pages/components/MenuRight";
import Image from "next/image";

const ProfilePage = () => {
  return (
    <div className="flex gap-6">
      <div className="hidden xl:block wl-[20%]">
        <MenuLeft type="profile"/>
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image src="" alt="" fill className="object-cover" />
              <Image src="" alt="" width={128} height={128} className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover" />
            </div>
          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <MenuRight userId="test" />
      </div>
    </div>
  );
};

export default ProfilePage;
