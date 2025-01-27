import Feed from "@/app/pages/components/Feed";
import MenuLeft from "@/app/pages/components/MenuLeft";
import MenuRight from "@/app/pages/components/MenuRight";
import prisma from "@/lib/client";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound } from "next/navigation";

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = await params;

  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },
  });

  if (!user) return notFound();

  const { userId: currentUserId } = await auth();
  return (
    <div className="flex gap-6">
      <div className="hidden xl:block wl-[20%]">
        <MenuLeft type="profile" />
      </div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full h-64 relative">
              <Image src={user.cover || "/noCover.png"} alt="" fill className="object-cover" />
              <Image
                src={user.avatar || "/noAvatar.png"}  
                alt=""
                width={128}
                height={128}
                className="w-32 h-32 rounded-full absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white object-cover"
              />
            </div>
            <h1 className="mt-20 mb-4 text-2xl font-medium">{user.name && user.surname ? user.name + " " + user.surname : user.username}</h1>
            <div className="flex items-center justify-center">
              <div className="flex flex-col items-center">
              <span className="font-medium">{user._count.posts}</span>
              <span className="text-sm">Posts</span>
              </div>
            </div>

          </div>
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]">
        <MenuRight user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
