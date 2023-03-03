import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import ViewMuseums from "../../components/Home-Page/museum/ViewMuseums";
import { museumContext } from "../../context/museumContext";
import { useAuth } from "../../context/authContext";
import { useEffect } from "react";
const Museums = () => {
  const { key } = useParams();

  const { museums, isLoading, error } = useContext(museumContext);
  const { favorites } = useAuth();
  const searchedMuseum = museums.filter((museum) => {
    if (!key) {
      return museum;
    } else if (museum.name.toLowerCase().includes(key.toLowerCase())) {
      return museum;
    }
  });

  useEffect(() => {}, [favorites]);
  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : !error && searchedMuseum.length > 0 ? (
        <div className="museumsContainer">
          {searchedMuseum &&
            searchedMuseum.map((museum) => (
              <ViewMuseums key={museum._id} museum={museum} />
            ))}
        </div>
      ) : !error && !searchedMuseum.length ? (
        <p>Such museum is not found!</p>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
};

Museums.propTypes = {
  query: PropTypes.string,
  museum: PropTypes.object,
};
export default Museums;
