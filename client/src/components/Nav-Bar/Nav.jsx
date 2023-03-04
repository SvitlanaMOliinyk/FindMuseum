import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import logo from "../../assets/img/findh.png";
import "./nav.css";
import Profile from "./Profile/Profile";
import { useAuth } from "../../context/authContext";

const Nav = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  // get user from context
  const { isLoggedIn } = useAuth();

  const handleClick = () => setMenuIsOpen(!menuIsOpen);
  const onClose = () => setMenuIsOpen(false);

  return (
    <header className="logoAndNavbar">
      <ToastContainer />
      <nav className="nav">
        <div className="logo-navbar-container container-nav">
          <Link to="/" onClick={onClose}>
            <img className="logo" src={logo} alt="Logo" />
          </Link>
          <div className="burger-menu-icon" onClick={handleClick}>
            {menuIsOpen ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={menuIsOpen ? "navbar active" : "navbar"}>
            <li className="navbar-item">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "activeBar" : "")}
                onClick={onClose}
              >
                Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink
                to="museums"
                className={({ isActive }) => (isActive ? "activeBar" : "")}
                onClick={onClose}
              >
                Museums
              </NavLink>
            </li>

            <li className="navbar-item">
              <NavLink
                to="offers"
                className={({ isActive }) => (isActive ? "activeBar" : "")}
                onClick={onClose}
              >
                Offers
              </NavLink>
            </li>

            {isLoggedIn ? (
              <Profile onClose={onClose} />
            ) : (
              <>
                <li className="navbar-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => (isActive ? "activeBar" : "")}
                    onClick={onClose}
                  >
                    Log in
                  </NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink
                    to="/register"
                    className={({ isActive }) => (isActive ? "activeBar" : "")}
                    onClick={onClose}
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
