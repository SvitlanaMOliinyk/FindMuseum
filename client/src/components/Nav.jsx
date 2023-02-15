import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <ul>
      <Link to={"/register"}>
        <li>Register</li>
      </Link>
    </ul>
  );
};

export default Nav;
