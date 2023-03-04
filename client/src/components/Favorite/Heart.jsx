import React from "react";
import heart from "../../assets/heart/heart-regular.svg";
import heartSolid from "../../assets/heart/heart-solid.svg";
import PropTypes from "prop-types";
import "./Heart.css";
import { useAuth } from "../../context/authContext";

const Heart = ({ id }) => {
  const { isLoggedIn, handleFavorite, isFavorite } = useAuth();

  Heart.propTypes = {
    id: PropTypes.string.isRequired,
  };

  const inFav = isFavorite(id);

  return (
    <>
      <img
        src={inFav ? heartSolid : heart}
        alt={inFav ? "heartSolid" : "heart"}
        className="fav_icon"
        onClick={() => handleFavorite(id, isLoggedIn)}
      />
    </>
  );
};

export default Heart;
