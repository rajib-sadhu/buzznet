
import PostCard from "./PostCard";
const UserPosts = () => {
  return (
    <div className="md:w-1/2 mx-auto py-10 space-y-3">
      {[...Array(5)].map((_, i) => {
        return <PostCard key={i} />;
      })}
    </div>
  );
};

export default UserPosts;
