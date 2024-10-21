import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { useState } from "react";
import LogoutConfirmation from "./LogoutConfirmation";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  let [confirmLogout, setConfirmLogout] = useState(false);
  const handleClick = () => {
    setConfirmLogout(true);
  };
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img
            src={process.env.PUBLIC_URL + "/MyThymeLogo2.webp"}
            alt="MyThyme Logo"
          />
        </Link>
        {user && <span>{user.userName}</span>}
        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="nav-item">
              About
            </Link>
          </li>
          <li>
            <Link to="/blog" className="nav-item">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/recipe" className="nav-item">
              Recipe
            </Link>
          </li>
          {user ? (
            <li>
              <div className="logout">
                <button
                  className="logout-button"
                  onClick={handleClick}
                  disabled={confirmLogout}
                >
                  Log Out
                </button>
                {confirmLogout && (
                  <LogoutConfirmation
                    logout={logout}
                    setConfirmLogout={setConfirmLogout}
                  ></LogoutConfirmation>
                )}
              </div>
            </li>
          ) : (
            <li>
              <Link to="/login" className="nav-item">
                Login/Signup
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
