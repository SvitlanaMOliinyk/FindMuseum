import React, { useEffect } from "react";
import { useMuseums } from "../../../context/museumContext";
import MuseumCard from "../../Museum-Overview/MuseumCard";
import "../../Museum-Overview/museum-card.css";
import Loading from "../../common/loading/Loading";

const MuseumList = () => {
  const { isLoading, error, museums } = useMuseums();
  let content = null;

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isLoading]);

  if (isLoading) {
    content = <Loading isLoading={isLoading} />;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else {
    content = (
      <>
        <div className="all-museums-card">
          {museums &&
            museums.slice(0, 3).map((museum) => {
              return <MuseumCard key={museum._id} museum={museum} />;
            })}
        </div>
      </>
    );
  }

  return <div>{content}</div>;
};

export default MuseumList;
