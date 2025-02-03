import ProfileCard from "./ProfileCard";

const MenuLeft = ({ type }: { type: "home" | "profile" }) => {
  return (
    <div className="flex flex-col gap-6">
      {type === "home" && <ProfileCard />}
    </div>
  );
};

export default MenuLeft;