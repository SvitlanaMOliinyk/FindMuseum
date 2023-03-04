import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";
import "./museum-card.css";
import { MdLocationOn } from "react-icons/md";
import { GiGreekTemple } from "react-icons/gi";

const MuseumCard = ({ museum }) => {
  const { name, image, _id, address, category } = museum;
  MuseumCard.propTypes = {
    museum: PropTypes.object.isRequired,
  };

  return (
    <>
      {museum && (
        <div
          className="museum-card"
          style={{
            background: ` url(${image.url}) no-repeat`,
            backgroundSize: "cover",
          }}
        >
          <div className="museum-card-content">
            <h2 className="museum-name-card">{name}</h2>
            <div className="museum-card-body">
              <div className="museum-card-body-content-category">
                <GiGreekTemple />
                {category}
              </div>
              <br />
              <div className="museum-card-body-content-address">
                <MdLocationOn />
                {address.city}
              </div>
            </div>
            <Link to={`/museum/${_id}`}>
              <button className="museum-card-button">Learn More</button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default MuseumCard;
