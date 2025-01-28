import { User } from "@prisma/client";
import { Suspense } from "react";
import UserInfoCard from "./UserInfoCard";

const MenuRight = ({ user }: { user?: User }) => {
  return (
    <div className="flex flex-col gap-6">
      {user ? (
        <>
        <Suspense fallback="Loading...">
          <UserInfoCard user={user} />
        </Suspense>
        </>
      ) : null}
    </div>
  );
};

export default MenuRight;
