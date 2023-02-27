import React, { useState, useEffect } from "react";
import "./all-museums.css";
import SearchingBar from "../Home-Page/Searching-Bar/SearchingBar";
import useFetch from "../../hooks/useFetch";
import MuseumCard from "./MuseumCard";

export default function AllMuseums() {
  const [museums, setMuseums] = useState(null);

  const { performFetch, cancelFetch } = useFetch("/museum", (response) => {
    setMuseums(response.result);
  });

  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, []);

  return (
    <div className="all-museums">
      <div className="search-bar">
        <SearchingBar />
      </div>
      <div className="selected-filter-counter"></div>
      <div className="all-museums-card">
        {museums &&
          museums.map((museum) => {
            <h1>Hello</h1>;

            return <MuseumCard key={museum._id} museum={museum} />;
          })}
      </div>
    </div>
  );
}
