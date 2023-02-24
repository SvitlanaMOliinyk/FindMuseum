import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ViewMuseums from "../../components/Home-Page/museum/ViewMuseums";

const Museums = () => {
  const { key } = useParams();
  const [museums, setMuseums] = useState([]);
  const { isLoading, error, performFetch } = useFetch(
    `/museum/search/${key}`,
    (response) => {
      setMuseums(response.result);
    }
  );

  useEffect(() => {
    performFetch();
  }, []);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : !error && museums.length > 0 ? (
        museums.map((museum) => (
          <ViewMuseums key={museum._id} museum={museum} />
        ))
      ) : !error && !museums.length ? (
        <p>Such museum is not found!</p>
      ) : (
        <p>{error}</p>
      )}
    </>
  );
};

Museums.propTypes = {
  query: PropTypes.string,
  museum: PropTypes.node.isRequired,
};
export default Museums;
