import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserInfo = (email) => {
  const { user, loading } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: userInfo = [], isLoading: userLoading } = useQuery({
    queryKey: ["userInfo"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure(
        `/users/user-details?email=${email || user?.email}`
      );
      if (res.data.success) {
        return res.data.data;
      }
    },
  });

  return [userInfo, userLoading];
};

export default useUserInfo;
