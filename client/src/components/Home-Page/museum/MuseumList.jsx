import React, { useEffect, useState } from "react";
import "./museum.css";
import useFetch from "../../../hooks/useFetch";
import TEST_ID from "./MuseumList.testid";
import ViewMuseums from "./ViewMuseums";

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
    content = <div data-testid={TEST_ID.loadingContainer}>loading...</div>;
  } else if (error != null) {
    content = (
      <div data-testid={TEST_ID.errorContainer}>Error: {error.toString()}</div>
    );
  } else {
    content = (
      <>
        <div
          className="museumsContainer"
          data-testid={TEST_ID.museumList}
          data-loaded={museums != null}
        >
          {museums &&
            museums.slice(0, 4).map((museum) => {
              return <ViewMuseums key={museum._id} museum={museum} />;
            })}
        </div>
      </>
    );
  }

  return <div data-testid={TEST_ID.container}>{content}</div>;
};

export default MuseumList;
