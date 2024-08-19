import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  // const [user, setUser] = useState([]);
  const location = useLocation();
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // const isDeveloper = user.role === "Developer";

  return (
    <div className="navbar bg-base-100 ">
      <div className="flex-1">
        <Link to="/homepage">
          <a className="btn btn-ghost text-xl">GameRise</a>
        </Link>
      </div>
      {location.pathname === "/devpage" && (
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link to="/addgames">
              <a className="btn btn-outline btn-default text-l">Add Games</a>
            </Link>
          </div>
        </div>
      )}
      {location.pathname === "/" && (
        <div className="navbar bg-base-100 ml-7">
          <div className="flex-1">
            <Link to="/register">
              <a className="btn btn-outline btn-default text-l">Get Started</a>
            </Link>
          </div>
        </div>
      )}

      <div className="flex-none gap-2">
        <div className="navbar bg-base-100 ml-7"></div>

        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://i.pinimg.com/564x/9e/83/75/9e837528f01cf3f42119c5aeeed1b336.jpg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            {/* {user.role === "Developer" && ( */}
            <li>
              {/* {isDeveloper && ( */}
              <Link to="/devpage">
                <a>Developer Site</a>
              </Link>
              {/* )} */}
            </li>
            {/* )} */}
            <li>
              <Link
                to="/login"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
