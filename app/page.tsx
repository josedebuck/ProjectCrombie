import AddPost from "./pages/components/AddPost";
import Feed from "./pages/components/Feed";
import MenuLeft from "./pages/components/MenuLeft"; 
import MenuRight from "./pages/components/MenuRight";

const Homepage = () => {
  return (
    <div className="flex gap-6">
      <div className="hidden xl:block wl-[20%]"><MenuLeft/></div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <AddPost />
          <Feed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]"><MenuRight/></div>
    </div>
  );
};

export default Homepage;