import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useGetAllPosts = () => {
  const { loading } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const {
    data: allPosts = [],
    isLoading: postsLoading,
    refetch: postsFetch,
  } = useQuery({
    queryKey: ["allPosts"],
    // enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(`/posts/all-posts`);
      return res.data;
    },
  });

  return [allPosts, postsLoading, postsFetch];
};

export default useGetAllPosts;
