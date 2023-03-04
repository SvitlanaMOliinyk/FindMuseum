import React, { useState } from "react";
import "./all-museums.css";
import SearchingBar from "../Home-Page/Searching-Bar/SearchingBar";
import MuseumCard from "./MuseumCard";
import { useMuseums } from "../../context/museumContext";
import FilterBar from "./FilterBar";

export default function AllMuseums() {
  const { museums } = useMuseums([]);
  const [activeFilterList, setActiveFilterList] = useState([]);
  const filteredMuseum = museums.filter((museum) => {
    if (activeFilterList?.includes(museum.address.city)) {
      return museum;
    } else if (activeFilterList?.includes(museum.category)) {
      return museum;
    }
  });
  return (
    <>
      <FilterBar
        activeFilterList={activeFilterList}
        setActiveFilterList={setActiveFilterList}
      />
      <div className="all-museums">
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
          <div className="all-museums-card">
            {museums &&
              museums.map((museum) => {
                return <MuseumCard key={museum._id} museum={museum} />;
              })}
          </div>
        )}
      </div>
    </>
  );
}
