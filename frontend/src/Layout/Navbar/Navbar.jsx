import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useUserInfo from "../../hooks/useUserInfo";

import { ImSpinner8 } from "react-icons/im";

const Navbar = () => {
  const { user, userLogOut, loading } = useAuth();
  const [openMenu, setOpenMenu] = useState(false);

  const navigate = useNavigate();

  if (!user) {
    return <></>;
  }

  const [userInfo, userLoading] = useUserInfo();

  const handleLogOut = () => {
    userLogOut().then(() => {
      toast.success("User logout successfully.");
      localStorage.removeItem("access-token");
      navigate("/login");
    });
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const menuElement = document.getElementById("menu");
      if (menuElement && !menuElement.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);

    return () => {
      window.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="md:px-40 md:py-5 p-2 z-50 fixed top-0 w-full bg-white" id="menu">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/demo-icon.png"
            alt="logo"
            className="md:h-12 h-8 object-contain"
          />
        </Link>
        <div>
          <ul>
            {loading || userLoading ? (
              <li className="px-5 py-2 bg-slate-300 rounded-md text-sm font-semibold">
                <ImSpinner8 className="animate-spin" />
              </li>
            ) : (
              <>
                {user ? (
                  <li className="rounded-full bg-black text-white relative pe-4 rounded-br-none">
                    <div
                      className="flex items-center gap-2 cursor-pointer "
                      onClick={() => setOpenMenu(!openMenu)}
                    >
                      <img
                        src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
                        alt="profile image"
                        className="md:w-14 w-8 rounded-full border object-cover"
                      />
                      <span className="md:text-lg font-semibold">
                        {userInfo?.fullName}
                      </span>
                    </div>
                    <div
                      className={`flex flex-col bg-white  text-black absolute w-full overflow-hidden duration-150 ${
                        openMenu ? "p-2 max-h-80 border" : "max-h-0"
                      }`}
                    >
                      <Link
                        to={`/profile/${user?.email}`}
                        className="hover:bg-black hover:text-white px-2 py-1"
                      >
                        Profile
                      </Link>
                      {/* <Link
                        to={`/`}
                        className="hover:bg-black hover:text-white px-2 py-1"
                      >
                        Settings
                      </Link> */}
                      <button
                        onClick={handleLogOut}
                        className="hover:bg-black hover:text-white px-2 py-1 text-left"
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                ) : (
                  <li>
                    <Link
                      to="/login"
                      className="px-5 py-2 bg-slate-300 rounded-md text-sm font-semibold"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
