import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink, useNavigate } from "react-router-dom";

function Header({isAuthenticated}) {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  const logout = (navigate) => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="flex flex-row items-center justify-between sm:justify-around p-2 border-b-2 bg-gray-100">
      <NavLink
        href="/"
        className="flex items-center h-10 px-10 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-500 rounded-tl-full rounded-br-full font-bold uppercase italic text-white hover:opacity-90"
      >
        Flatmate
      </NavLink>
      <nav className="hidden sm:flex justify-between items-center gap-4 font-semibold">
        <NavLink to="/login" className="hover:text-gray-500">
          Sign In
        </NavLink>
        <NavLink to="/register" className="hover:text-gray-500">
          Sign up
        </NavLink>
        <NavLink to="/dashboard" className="hover:text-gray-500">
          DashBoard
        </NavLink>
      </nav>
      <nav className="sm:hidden flex flex-col items-end gap-1 font-semibold">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="sm:hidden font-bold text-xl hover:text-gray-500"
        >
          {showMenu ? <GrClose /> : <GiHamburgerMenu />}
        </button>
        {showMenu && (
          <>
            <NavLink to="/" className="hover:text-gray-500">
              Home
            </NavLink>
            <NavLink to="/login" className="hover:text-gray-500">
              Sign In
            </NavLink>
            <NavLink to="/register" className="hover:text-gray-500">
              Sign up
            </NavLink>
            <NavLink to="/dashboard" className="hover:text-gray-500">
              DashBoard
            </NavLink>
            {isAuthenticated && <button onClick={() => logout(navigate)}>Logout</button>}
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;