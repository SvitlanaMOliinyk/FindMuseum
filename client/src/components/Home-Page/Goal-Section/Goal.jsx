import React from "react";
import { Link } from "react-router-dom";
import "./goal.css";

const Goal = () => {
  return (
    <div className="container">
      <div className="goal">
        <span className="question">
          Do you want to learn more about all the museums and their collections
          in the Netherlands?
        </span>
        <br />
        <span className="answer">
          You are in the right place for that! You can also follow upcoming
          events, read reviews about museums, and can share experiences.
        </span>

        <span className="answer">
          {" "}
          Don’t forget to get{" "}
          <a href="#" className="focus">
            the special offers
          </a>
          , just for you!
        </span>
        <Link to="/museums">
          <button className="button-about">All Museums</button>
        </Link>
      </div>
    </div>
  );
};
export default Goal;
