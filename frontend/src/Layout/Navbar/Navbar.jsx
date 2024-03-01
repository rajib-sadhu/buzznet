import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
const Navbar = () => {
  const { user } = useAuth();

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div className="px-40 py-10">
      <nav className="flex items-center justify-between">
        <Link to="/">
          <img
            src="https://uxwing.com/wp-content/themes/uxwing/download/web-app-development/demo-icon.png"
            alt="logo"
            className="h-12"
          />
        </Link>
        <div>
          <ul>
            {user ? (
              <li className="rounded-full bg-black text-white relative pe-4 rounded-br-none">
                <div
                  className="flex items-center gap-2 cursor-pointer "
                  onClick={() => setOpenMenu(!openMenu)}
                >
                  <img
                    src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg"
                    alt="profile image"
                    className="w-14 rounded-full border object-cover"
                  />
                  <span className="text-lg font-semibold">David RS</span>
                </div>
                <div
                  className={`flex flex-col bg-white  text-black absolute w-full overflow-hidden duration-150 ${
                    openMenu ? "p-2 max-h-80 border" : "max-h-0"
                  }`}
                >
                  <Link
                    to={`/`}
                    className="hover:bg-black hover:text-white px-2 py-1"
                  >
                    Profile
                  </Link>
                  <Link
                    to={`/`}
                    className="hover:bg-black hover:text-white px-2 py-1"
                  >
                    Settings
                  </Link>
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
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
