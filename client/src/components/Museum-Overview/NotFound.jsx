import React from "react";
import noData from "../../assets/img/no_data.svg";
import { useNavigate } from "react-router-dom";
import "./not-found.css";

const NotFound = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate("/museums");
  };

  return (
    <div className="container--not-found">
      <h1>Museum not found!</h1>
      <img src={noData} alt="Not Found Data" />
      <button onClick={goBack}>Go Back</button>
    </div>
  );
};

export default NotFound;
