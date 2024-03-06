import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://buzznet-server.vercel.app/api/v1",
});

const useAxiosSecure = () => {
  const { userLogOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axiosSecure.interceptors.request.use((config) => {
      const token = localStorage.getItem("access-token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    axiosSecure.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log("axios error", error);
        if (
          error.response &&
          (error.response.status === 401 || error.response.status === 403)
        ) {
          await userLogOut();
          //   localStorage.removeItem('access-token')
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [userLogOut, navigate]);

  return [axiosSecure];
};

export default useAxiosSecure;
