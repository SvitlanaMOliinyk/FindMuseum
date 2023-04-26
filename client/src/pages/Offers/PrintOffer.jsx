import PropTypes from "prop-types";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function PrintOffer() {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("authUser"));
  const location = useLocation();
  const { expireDate, newPrice, museumId } = location.state.myOffer;

  const handleClick = () => {
    window.print();
    setTimeout(() => {
      navigate(`/myOffers/${userId._id}`);
    }, 5000);
  };

  return (
    <div className="printOffer-item">
      <div className="myOffer-item-name">
        <div className="offers-img-container">
          <h2>{museumId.name}</h2>
          <img src={museumId.image.url} alt={museumId.name} width={200} />
        </div>
        <div className="date-number">
          <h2>Expire Date: {expireDate.toString().slice(0, 10)}</h2>
        </div>
        <div className="offer-price">
          <h4>Price: {newPrice}€</h4>
          <button className="chance-button" onClick={handleClick}>
            Print
          </button>
        </div>
      </div>
    </div>
  );
}
PrintOffer.propTypes = {
  myOffer: PropTypes.object,
};
