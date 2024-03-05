import { CiMenuKebab } from "react-icons/ci";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { FaCommentDots, FaShare } from "react-icons/fa6";
import LazyLoad from "react-lazy-load";

const PostCard = ({ value }) => {
  const { _id, userDetails, content, image, createdAt } = value;

  const date = new Date(createdAt);
  const time = date.toLocaleTimeString().split(":");

  return (
    <div className=" p-2 rounded-xl shadow-xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={
              "https://static.vecteezy.com/system/resources/thumbnails/001/840/612/small/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg"
            }
            alt="profile image"
            className="w-10 h-10 rounded-full object-contain"
          />
          <h2 className="font-medium">{userDetails[0]?.fullName}</h2>
        </div>
        <button>
          <CiMenuKebab />
        </button>
      </div>
      <div className="py-2">
        <p className="text-xs font-medium bg-slate-200 border rounded-full inline-block py-1 px-2 mb-1">
          {time[0]}:{time[1]}
          {time[2].slice(3, 5).toLowerCase()} - {date.toLocaleDateString()}
        </p>
        <p>{content}</p>
        <LazyLoad className="min-h-28 w-full" threshold={0.95}>
          <img
            src={
              image ||
              "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg"
            }
            loading="lazy"
            alt="post image"
            className="my-2 rounded-xl max-h-60 w-full object-cover"
          />
        </LazyLoad>
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
