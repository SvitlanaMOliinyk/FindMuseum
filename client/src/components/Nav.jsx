import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import logo from "../assets/logo.png";
import "./nav.css";

import TEST_ID from "./Nav.testid";

const Nav = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => setToggle(!toggle);
  const shutMenu = () => setToggle(false);

  return (
    <header className="logoAndNavbar">
      <nav className="nav">
        <div className="logo-navbar-container">
          <Link to="/" onClick={shutMenu}>
            <img className="logo" src={logo} alt="Logo" width={100} />
          </Link>
          <div className="burger-menu-icon" onClick={handleClick}>
            {toggle ? <FaTimes /> : <FaBars />}
          </div>
          <ul className={toggle ? "navbar active" : "navbar"}>
            <li className="navbar-item">
              <NavLink
                to="/"
                data-testid={TEST_ID.linkToHome}
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "var(--active-navlink-color)" : "",
                    borderRadius: isActive ? "4px" : ""
                  };
                }}
                onClick={shutMenu}
              >
                Home
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink
                to="museums"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "var(--active-navlink-color)" : "",
                    borderRadius: isActive ? "4px" : ""
                  };
                }}
                onClick={shutMenu}
              >
                Museums
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink
                to="favorites"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "var(--active-navlink-color)" : "",
                    borderRadius: isActive ? "4px" : ""
                  };
                }}
                onClick={shutMenu}
              >
                Favorites
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink
                to="offers"
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "var(--active-navlink-color)" : "",
                    borderRadius: isActive ? "4px" : ""
                  };
                }}
                onClick={shutMenu}
              >
                Offers
              </NavLink>
            </li>
            <li className="navbar-item">
              <NavLink
                to="/user"
                data-testid={TEST_ID.linkToUsers}
                style={({ isActive }) => {
                  return {
                    backgroundColor: isActive ? "var(--active-navlink-color)" : "",
                    borderRadius: isActive ? "4px" : ""
                  };
                }}
                onClick={shutMenu}
              >
                Log in
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Nav;
