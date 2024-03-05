import LoadingAnimation from "../../../components/LoadingAnimation/LoadingAnimation";
import useAuth from "../../../hooks/useAuth";
import useGetAllPosts from "../../../hooks/useGetAllPosts";
import PostCard from "./PostCard";
const UserPosts = () => {
  const { user } = useAuth();

  const [allPosts, postsLoading, postsFetch] = useGetAllPosts();

  if (postsLoading) {
    return <LoadingAnimation />;
  }

  return (
    <div className="md:w-1/2 mx-auto py-10 space-y-3 min-h-screen">
      {!user
        ? [...Array(1)].map((_, i) => {
            return <PostCard key={i} />;
          })
        : allPosts?.data.map((value) => (
            <PostCard key={value?._id} value={value} />
          ))}
    </div>
  );
};

export default UserPosts;
