import { Link } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";

function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const handleClick = () => {
    logout();
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
              <span>{user.userName}</span>
              <button onClick={handleClick}>Log Out</button>
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
