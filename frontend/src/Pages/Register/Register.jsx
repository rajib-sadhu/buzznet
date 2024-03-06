import { Link, useNavigate } from "react-router-dom";
import Social from "../Shared/Social";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import { ImSpinner8 } from "react-icons/im";

import { toast } from "react-hot-toast";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { userRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const fullName = form.name.value;
    const email = form.email.value;
    const gender = form.gender.value;
    const password = form.password.value;

    if (
      [fullName, email, gender, password].some((field) => field?.trim() === "")
    ) {
      return setError("Please fill all the fields.");
    }
    if (password.length < 6 && password.length < 20) {
      return setError("Please enter the password between 6 to 20 characters.");
    }

    setError("");

    try {
      setIsLoading(true);
      const res = await userRegister(email, password);

      if (res) {
        try {
          const res = await axios.post("https://buzznet-server.vercel.app/api/v1/users/register", {
            fullName,
            email,
            gender,
          });

          if (res.data.success) {
            toast.success("User register successfully");
            setError("");
            setIsLoading(false);
            navigate("/");
          }
        } catch (error) {
          console.error("BACKEND ERROR: ", error);
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("FIREBASE ERROR: ", error.message);
      toast.error("Please check the email and password.");
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen md:flex items-center justify-center">
      <div className="md:w-3/4 md:h-96 h-screen bg-slate-200 md:rounded-lg shadow-xl grid md:grid-cols-2 grid-cols-1 overflow-hidden">
        <div className="bg-black text-white flex items-center flex-col justify-center">
          <div className="space-y-3 p-5">
            <h1 className="text-5xl font-semibold">Register</h1>
            <h2 className="text-2xl text-slate-400">Welcome to Buzznet!</h2>
            <p>
              Please fill out the form below to create your account and start
              exploring.
            </p>
          </div>
        </div>
        <div>
          <form onSubmit={handleSubmit} className="md:p-10 md:pb-2 p-5 space-y-2">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2"
            />
            <div>
              <label className="block text-sm text-slate-600">Gender:</label>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  placeholder="Name"
                />
                Male
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  placeholder="Name"
                />
                Female
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  placeholder="Name"
                />
                Others
              </div>
            </div>
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
              Register
            </button>
            {error && (
              <p className="text-red-600 font-medium bg-red-100 p-2">{error}</p>
            )}
          </form>
          <div className="md:px-10 px-5">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="underline text-blue-700">
                Log in Here
              </Link>
            </p>
          </div>
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Register;
