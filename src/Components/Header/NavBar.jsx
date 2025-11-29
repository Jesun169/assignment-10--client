import { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout().then(() => {
      navigate("/"); 
    });
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <Link to="/"><li><a>Home</a></li></Link>
            <li>
              <a>Services</a>
              <ul className="p-2">
                <Link to="/myservices"><li><a>MY SERVICES</a></li></Link>
                <Link to="/addservices"><li><a>ADD SERVICES</a></li></Link>
              </ul>
            </li>
            <Link to="/mybookings"><li><a>MY BOOKINGS</a></li></Link>
          </ul>
        </div>

        <Link to="/">
        <a className="text-2xl font-bold">
          SERVICE<span className="text-3xl text-blue-500">X</span>
        </a></Link>
      </div>

      <div className="navbar-center hidden lg:flex font-bold">
        <ul className="menu menu-horizontal px-1 z-50">
          <Link to="/"><li><a>HOME</a></li></Link>
          <li>
            <details>
              <summary>SERVICES</summary>
              <ul className="p-2">
                <Link to="/myservices"><li><a>MY SERVICES</a></li></Link>
                <Link to="/addservices"><li><a>ADD SERVICES</a></li></Link>
              </ul>
            </details>
          </li>
          <Link to="/mybookings"><li><a>MY BOOKINGS</a></li></Link>
        </ul>
      </div>

      <div className="navbar-end">
        {user ? (
          <button 
            onClick={handleLogout} 
            className="btn text-2xl text-red-500"
          >
            LOGOUT
          </button>
        ) : (
          <Link to="/login">
            <button className="btn text-2xl text-blue-500">
              LOGIN
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
