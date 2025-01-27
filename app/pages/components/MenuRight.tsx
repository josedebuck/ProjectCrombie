import { User } from "@prisma/client";
import UserInfoCard from "./UserInfoCard";



const MenuRight = ({user}: {user?: User}) => {
    return (
        <div className="flex flex-col gap-6">
            {user ? (<>
            <UserInfoCard user={user}/>
            </>) : null }
        </div>
    );
};

export default MenuRight