import React from "react";
// import { AiOutlineAim } from "react-icons/ai";
import "./goal.css";

// import { MdFeaturedPlayList } from "react-icons/md";

const Goal = () => {
  return (
    <div className="container">
      <div className="goal">
        <span className="question">
          Do you want to learn more about the all museums and their collections
          in Netherlands?
        </span>
        <br />
        <span className="answer">
          FIND MUSEUM is the right application for that, where you can also
          follow upcoming events, read reviews, and share your experiences.
        </span>

        <span className="answer">
          {" "}
          Don’t forget to get{" "}
          <a href="#" className="focus">
            the special offers
          </a>
          , just for you!
        </span>
        <button className="button about" type="button">
          About Us
        </button>
      </div>
    </div>
  );
};
export default Goal;
