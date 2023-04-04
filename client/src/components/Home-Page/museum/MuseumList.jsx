import React, { useEffect } from "react";
import { useMuseums } from "../../../context/museumContext";
import MuseumCard from "../../Museum-Overview/MuseumCard";
import "../../Museum-Overview/museum-card.css";
import Loading from "../../common/loading/Loading";
import Header from "../../Home-Page/museum/Header";

const MuseumList = () => {
  const { isLoading, error, museums } = useMuseums();

  let content = null;

  const result = museums.sort((a, b) => {
    return b.rating - a.rating;
  });

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isLoading]);

  if (isLoading) {
    content = <Loading />;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else {
    content = (
      <>
        <Header />
        <div className="all-museums-card">
          {result &&
            result.slice(0, 6).map((museum) => {
              return <MuseumCard key={museum._id} museum={museum} />;
            })}
        </div>
      </>
    );
  }

  return <div className="return-content">{content}</div>;
};

export default MuseumList;
