import { Link, useNavigate } from "react-router-dom";
import Social from "../Shared/Social";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { userLogin } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    if ([email, password].some((field) => field?.trim() === "")) {
      return setError("Please fill all the fields.");
    }
    if (password.length < 6 && password.length < 20) {
      return setError("Please enter the password between 6 to 20 characters.");
    }

    setError("");

    try {
      const res = await userLogin(email, password);
      if (res) {
        toast.success("User login successfully");
        setError("");
        setIsLoading(false);
        navigate("/");
      }
    } catch (error) {
      console.error("FIREBASE ERROR: ", error.message);
      toast.error("Please check the email and password.");
      setError("Please check the email and password, and try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:flex items-center justify-center">
      <div className="md:w-3/4 md:h-96 h-screen bg-slate-200 md:rounded-lg shadow-xl grid md:grid-cols-2 grid-cols-1 overflow-hidden">
        <div className="bg-black text-white flex items-center flex-col justify-center">
          <div className="space-y-3 md:p-0 p-5">
            <h1 className="text-5xl font-semibold">Login</h1>
            <h2 className="text-2xl text-slate-400">Welcome back!</h2>
            <p>Please log in to your account to continue.</p>
          </div>
        </div>
        <div>
          <form
            onSubmit={handleLogin}
            className="md:p-10 p-5 space-y-2 md:flex flex-col justify-center h-full"
          >
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-2"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-500 py-2 text-white rounded-md flex items-center justify-center"
            >
              {isLoading && <ImSpinner8 className="me-2 mt-1 animate-spin" />}
              Login
            </button>
            <div className="">
              {error && (
                <p className="text-red-600 font-medium bg-red-100 p-2">
                  {error}
                </p>
              )}
              <div className="md:px-0 px-2 space-y-5 pt-2">
                <p>
                  Forgot your password?{" "}
                  <Link
                    to="/forgot-password"
                    className="underline text-blue-700"
                  >
                    Reset Password
                  </Link>
                </p>
                <p>
                  Don't have an account yet?{" "}
                  <Link to="/register" className="underline text-blue-700">
                    Sign Up Here
                  </Link>
                </p>
              </div>
            </div>
          </form>
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Login;
