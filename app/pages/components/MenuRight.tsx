import UserInfoCard from "./UserInfoCard";



const MenuRight = ({userId}: {userId?: string}) => {
    return (
        <div className="flex flex-col gap-6">
            {userId ? (<>
            <UserInfoCard userId={userId}/>
            </>) : null }
        </div>
    );
};

export default MenuRight