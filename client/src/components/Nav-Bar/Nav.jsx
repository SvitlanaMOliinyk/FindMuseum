import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/logo-transparent.png";
import "./nav.css";

const Nav = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleClick = () => setMenuIsOpen(!menuIsOpen);
  const onClose = () => setMenuIsOpen(false);

  return (
    <header className="logoAndNavbar">
      <nav className="nav">
        <div className="logo-navbar-container container">
          <Link to="/" onClick={onClose}>
            <img className="logo" src={logo} alt="Logo" width={100} />
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
                to="favorites"
                className={({ isActive }) => (isActive ? "activeBar" : "")}
                onClick={onClose}
              >
                Favorites
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
            <li className="navbar-item">
              <NavLink
                to="/user"
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
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
