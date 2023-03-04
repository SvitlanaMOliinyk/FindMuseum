import { Link } from "react-router-dom";
import React from "react";
import PropTypes from "prop-types";

const Museum = ({ museum }) => {
  const { name, image, _id, address } = museum;
  Museum.propTypes = {
    museum: PropTypes.object,
  };

  return (
    <>
      {museum && (
        <div className="museum">
          <Link to={`/museum/${_id}`}>
            <img className="museum-image" src={image.url} alt={name} />
            <div className="text-block">
              <h4 className="museum-name">{name}</h4>
              <p className="museum-city">{address.city}</p>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Museum;
