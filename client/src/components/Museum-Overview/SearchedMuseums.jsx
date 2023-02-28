import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MuseumCard from "./MuseumCard";
import SearchingBar from "../Home-Page/Searching-Bar/SearchingBar";
import "./searched-museums.css";
import { useMuseums } from "../../context/museumContext";
import FilterBar from "./FilterBar";

export default function SearchedMuseums() {
  const { key } = useParams();
  const { museums } = useMuseums();
  const [activeFilterList, setActiveFilterList] = useState([]);
  const filteredMuseum = museums.filter((museum) => {
    if (activeFilterList?.includes(museum.address.city)) {
      return museum;
    } else if (activeFilterList?.includes(museum.category)) {
      return museum;
    }
  });

  const searchedMuseum = museums.filter((museum) => {
    if (!key) {
      return museum;
    } else if (museum.name?.toLowerCase().includes(key.toLowerCase())) {
      return museum;
    } else if (museum.address.city?.toLowerCase().includes(key.toLowerCase())) {
      return museum;
    } else if (museum.category?.toLowerCase().includes(key.toLowerCase())) {
      return museum;
    }
  });
  return (
    <>
      <FilterBar
        activeFilterList={activeFilterList}
        setActiveFilterList={setActiveFilterList}
      />
      <div className="searched-museums">
        <div className="search-bar">
          <SearchingBar />
        </div>
        <div className="selected-filter-counter"></div>
        {activeFilterList.length > 0 ? (
          <div className="all-museums-card">
            {filteredMuseum &&
              filteredMuseum.map((museum) => {
                return <MuseumCard key={museum._id} museum={museum} />;
              })}
          </div>
        ) : (
          <div className="searched-museums-cards">
            {searchedMuseum &&
              searchedMuseum.map((museum) => {
                return <MuseumCard key={museum._id} museum={museum} />;
              })}
          </div>
        )}
      </div>
    </>
  );
}
