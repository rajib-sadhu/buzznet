import { CiMenuKebab } from "react-icons/ci";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaCommentDots, FaShare } from "react-icons/fa6";

const PostCard = () => {
  return (
    <div className=" p-2 rounded-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            alt="profile image"
            className="w-10 h-10 rounded-full object-contain"
          />
          <h2 className="font-medium">Rajib Sadhu</h2>
        </div>
        <button>
          <CiMenuKebab />
        </button>
      </div>
      <div className="py-2">
        <p className="text-xs font-medium bg-slate-200 border rounded-full inline-block py-1 px-2 mb-1">
          10:34pm - 05/03/2024
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit vero
          quod excepturi odio accusantium ad et quibusdam voluptatum sunt
          distinctio amet facilis, temporibus fugit inventore voluptatem
          accusamus deleniti illo. Sapiente!
        </p>
        <img
          src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
          alt="post image"
          className="my-2 rounded-xl"
        />
        <div className=" bg-slate-200 md:p-4 p-2 rounded-xl flex justify-between">
          <button className="flex items-center gap-1">
            {/* <FcLike /> */}
            <FcLikePlaceholder className="text-2xl" />
            Like
          </button>
          <button className="flex items-center gap-1">
            <FaCommentDots className="mt-1 text-xl" />
            Comments
          </button>
          <button className="flex items-center gap-1">
            <FaShare className="mt-1 text-lg" />
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
