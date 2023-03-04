import React from "react";
import { useMuseums } from "../../context/museumContext";
import { useAuth } from "../../context/authContext";
import MuseumCard from "../../components/Museum-Overview/MuseumCard";
import "../../components/Museum-Overview/museum-card.css";
import "../../components/Museum-Overview/all-museums.css";

const Favorites = () => {
  const { favorites } = useAuth();

  const { museums } = useMuseums();

  const favMuseums = museums.filter((museum) => {
    if (favorites.includes(museum._id)) {
      return museum;
    }
  });

  return (
    <div className="favorites_page">
      {favorites.length === 0 && (
        <>
          <h1>You have Not Chosen any Favorites yet! </h1>
          <img
            src="https://res.cloudinary.com/diyopzdxb/image/upload/v1677845113/cars-images/favorite_t3zede.png"
            alt="not yet"
            className="notYet_img"
          />
        </>
      )}

      {favMuseums.length > 0 && (
        <div className="all-museums-card">
          {favMuseums &&
            favMuseums.map((museum) => {
              return <MuseumCard key={museum._id} museum={museum} />;
            })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
