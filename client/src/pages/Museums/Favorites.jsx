import React, { useState } from "react";
import { useMuseums } from "../../context/museumContext";
import { useAuth } from "../../context/authContext";
import ViewMuseums from "../../components/Home-Page/museum/ViewMuseums";
import Pagination from "../../components/common/pagination/Pagination";

const Favorites = () => {
  const { favorites } = useAuth();

  const { museums } = useMuseums();

  const [currentPage, setCurrentPage] = useState(1);
  const [favoritesPerPage] = useState(1);
  const [currentButton, setCurrentButton] = useState(1);

  const indexOfLastFavorite = currentPage * favoritesPerPage;
  const indexOfFirstFavorite = indexOfLastFavorite - favoritesPerPage;

  const favMuseums = museums.filter((museum) => {
    if (favorites.includes(museum._id)) {
      return museum;
    }
  });

  const currentFavorites = favMuseums?.slice(
    indexOfFirstFavorite,
    indexOfLastFavorite
  );
  const totalPagesNum = Math.ceil(favMuseums?.length / favoritesPerPage);

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
          {currentFavorites &&
            currentFavorites.map((museum) => {
              return <ViewMuseums museum={museum} key={museum._id} />;
            })}
        </div>
      )}
      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentButton={currentButton}
        setCurrentButton={setCurrentButton}
      />
    </div>
  );
};

export default Favorites;
