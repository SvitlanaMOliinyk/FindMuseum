import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import ViewMuseums from "../../components/Home-Page/museum/ViewMuseums";

const Museums = () => {
  const location = useLocation();
  const [museums, setMuseums] = useState([]);
  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/museum/museumName/${location.state.query}`,
    (response) => {
      cancelFetch();
      setMuseums(response.result);
    }
  );

  useEffect(() => {
    performFetch();

    if (museums.length > 0) {
      cancelFetch();
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : !error ? (
        museums.map((museum) => (
          <ViewMuseums key={museum._id} museum={museum} />
        ))
      ) : (
        error
      )}
    </>
  );
};

Museums.propTypes = {
  query: PropTypes.string,
  museum: PropTypes.node.isRequired,
};
export default Museums;
