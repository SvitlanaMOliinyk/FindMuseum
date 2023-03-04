import React, { useEffect, useState } from "react";
import { useMuseums } from "../../context/museumContext";
import { useAuth } from "../../context/authContext";
import ViewMuseums from "../../components/Home-Page/museum/ViewMuseums";

const Favorites = () => {
  const { favorites } = useAuth();

  const { museums } = useMuseums();

  const [favMuseums, setFavMuseums] = useState([]);

  useEffect(() => {
    let arrayFav = [];
    museums.map((museum) => {
      if (favorites.includes(museum._id)) arrayFav.push(museum);
    });
    setFavMuseums(arrayFav);
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
        <div className="fav_container">
          {favMuseums &&
            favMuseums.map((museum) => {
              return <ViewMuseums museum={museum} key={museum._id} />;
            })}
        </div>
      )}
    </div>
  );
};

export default Favorites;
