import { useState } from "react";
import Post from "./Post/Post";
import UserPosts from "./UserPosts/UserPosts";

import { MdKeyboardArrowDown } from "react-icons/md";

const Home = () => {
  const [openPost, setOpenPost] = useState(false);
  return (
    <div className="md:px-40 px-4 ">
      <div
        onClick={() => setOpenPost(!openPost)}
        className="md:w-1/2 mx-auto md:p-4 p-2 flex items-center justify-between cursor-pointer bg-sky-300 rounded-xl text-sky-800 font-semibold"
      >
        <p>Do you want to write your post?</p>
        <MdKeyboardArrowDown className={`${openPost?'rotate-180':''} duration-200 text-2xl`} />
      </div>

      <div className={`${openPost ? "max-h-screen" : "max-h-0"} duration-300 overflow-hidden`}>
        <Post />
      </div>
      <UserPosts />
    </div>
  );
};

export default Home;
