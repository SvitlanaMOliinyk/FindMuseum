import React from "react";
import "../../Museum-Overview/museum-card.css";
const Header = () => {
  return (
    <div className="headerContainer">
      <div className="headerGoal">
        <span className="headerMessage">
          Explore the top rated Amsterdam museums{" "}
          {/* <span className="reviewers">according to reviewers rating</span> */}
        </span>
      </div>
    </div>
  );
};
export default Header;
