import React from "react";
import { useMuseums } from "../../../context/museumContext";
import ViewMuseums from "./ViewMuseums";
import "./museum.css";
import Loading from "../../common/loading/Loading";

const MuseumList = () => {
  const { isLoading, error, museums } = useMuseums();
  let content = null;

  if (isLoading) {
    content = <Loading />;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else {
    content = (
      <>
        <div className="museumsContainer">
          {museums &&
            museums.slice(0, 4).map((museum) => {
              return <ViewMuseums key={museum._id} museum={museum} />;
            })}
        </div>
      </>
    );
  }

  return <div>{content}</div>;
};

export default MuseumList;
