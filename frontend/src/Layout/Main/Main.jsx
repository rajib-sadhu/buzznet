import { Link, Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import LoadingAnimation from "../../components/LoadingAnimation/LoadingAnimation";
import Footer from "../Footer/Footer";

const Main = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [user]);

  if (loading) {
    return <LoadingAnimation />;
  }

  return (
    <div>
      {!user && (
        <div className="fixed top-0 bottom-0 left-0 right-0 backdrop-blur-md">
          <div className="fixed z-50 inset-0 flex items-center justify-center">
            <div className="absolute z-50 bg-white p-8 rounded-lg shadow-lg m-2">
              <h2 className="text-3xl font-semibold mb-4">Join Now</h2>
              <p className="mb-4">
                Join BuzzNet today to connect with friends, share photos, and
                more!
              </p>
              <p className="mb-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Log in here
                </Link>
                .
              </p>
            </div>
            <button className="bg-blue-500 text-white rounded-full py-3 px-6 text-lg font-semibold shadow-lg hover:bg-blue-600 transition duration-300">
              Join Now
            </button>
          </div>
        </div>
      )}

      <div className="md:pb-24 pb-16">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
