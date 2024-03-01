import { Link } from "react-router-dom";
import Social from "../Shared/Social";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-3/4 min-h-96 bg-slate-100 rounded-lg shadow-xl grid grid-cols-2 overflow-hidden">
        <div className="bg-black text-white flex items-center flex-col justify-center">
          <div className="space-y-3">
            <h1 className="text-5xl font-semibold">Register</h1>
            <h2 className="text-2xl text-slate-400">Welcome to Buzznet!</h2>
            <p>
              Please fill out the form below to create your account and start
              exploring.
            </p>
          </div>
        </div>
        <div>
          <form className="p-10 space-y-2">
            <input type="text" placeholder="Name" className="w-full p-2" />
            <input type="email" placeholder="Email" className="w-full p-2" />
            <div>
              <label className="block text-sm text-slate-600">Gender:</label>
              <div className="flex items-center gap-2">
                Male
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  placeholder="Name"
                />
                Female
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  placeholder="Name"
                />
                Others
                <input
                  type="radio"
                  name="gender"
                  value="others"
                  placeholder="Name"
                />
              </div>
            </div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2"
            />
            <button className="w-full bg-slate-500 py-2 text-white rounded-md">
              Register
            </button>
            <div>
              <p>
                Already have an account?{" "}
                <Link to="/login" className="underline text-blue-700">
                  Log in Here
                </Link>
              </p>
            </div>
          </form>
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Register;
