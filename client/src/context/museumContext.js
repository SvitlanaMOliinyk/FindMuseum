import PropTypes from "prop-types";
import React, { createContext, useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";

export const museumContext = createContext();

export const MuseumContext = ({ children }) => {
  MuseumContext.propTypes = {
    children: PropTypes.node.isRequired,
  };

  //  museums
  const [museums, setMuseums] = useState([]);
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

  const value = {
    isLoading,
    error,
    museums,
  };

  return (
    <museumContext.Provider value={value}>{children}</museumContext.Provider>
  );
};
