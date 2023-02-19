import React, { useEffect, useState } from "react";
import useFetch from "../../../hooks/useFetch";
import ViewMuseums from "./ViewMuseums";
import "./museum.css";

const MuseumList = () => {
  const [museums, setMuseums] = useState(null);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/museum",
    (response) => {
      setMuseums(response.result);
    }
  );

  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, []);

  let content = null;

  if (isLoading) {
    content = <div>loading...</div>;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else {
    content = (
      <>
        <div className="museumsContainer">
          {museums &&
            museums.slice(0, 4).map((museum) => {
              <h1>Hello</h1>;
              return <ViewMuseums key={museum._id} museum={museum} />;
            })}
        </div>
      </>
    );
  }

  return <div>{content}</div>;
};

export default MuseumList;
