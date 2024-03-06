import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserPosts = (email) => {
  const { user, loading } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: userPosts = [], isLoading: userPostsLoading } = useQuery({
    queryKey: ["userPosts"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `/posts/user-posts?email=${email || user?.email}`
      );
      if (res.data.success) {
        return res.data.data;
      }
    },
  });

  return [userPosts, userPostsLoading];
};

export default useUserPosts;
