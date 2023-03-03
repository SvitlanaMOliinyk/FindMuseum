import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import ViewMuseums from "../../components/Home-Page/museum/ViewMuseums";
import Loading from "../../components/common/loading/Loading";

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
        // Gokhan added 25 February 10:06
        <Loading />
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

// Gokhan changed museum: PropTypes.node.isRequired as below; 25 February 10:21
Museums.propTypes = {
  query: PropTypes.string,
  museum: PropTypes.object,
};
export default Museums;
