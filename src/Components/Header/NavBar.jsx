import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { FaCircleUser } from "react-icons/fa6";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout().then(() => navigate("/"));
  };

  const isActive = (path) =>
    location.pathname === path ? "text-blue-500 font-bold" : "";

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
              fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            <li><Link className={isActive("/")} to="/">Home</Link></li>
            <li><Link to="/services">SERVICES</Link></li>

            {user && (
              <>
                <li><Link className={isActive("/myservices")} to="/myservices">MY SERVICES</Link></li>
                <li><Link className={isActive("/addservices")} to="/addservices">ADD SERVICES</Link></li>
                <li><Link className={isActive("/mybookings")} to="/mybookings">MY BOOKINGS</Link></li>
                <li><Link className={isActive("/profile")} to="/profile">PROFILE</Link></li>
              </>
            )}
          </ul>
        </div>

        <Link to="/">
          <span className="text-2xl font-bold">
            SERVICE<span className="text-3xl text-blue-500">X</span>
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex font-bold">
        <ul className="menu menu-horizontal px-1 z-50">
          <li><Link className={isActive("/")} to="/">HOME</Link></li>
          <li><Link to="/services">SERVICES</Link></li>

          {user && (
            <>
              <li><Link className={isActive("/myservices")} to="/myservices">MY SERVICES</Link></li>
              <li><Link className={isActive("/addservices")} to="/addservices">ADD SERVICES</Link></li>
              <li><Link className={isActive("/mybookings")} to="/mybookings">MY BOOKINGS</Link></li>
              <li>
                <Link className={isActive("/profile")} to="/profile">
                  <FaCircleUser /> PROFILE
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <button onClick={handleLogout} className="btn text-2xl text-red-500">
            LOGOUT
          </button>
        ) : (
          <Link to="/login">
            <button className="btn text-2xl text-blue-500">LOGIN</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
