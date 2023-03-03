import React, { useState } from "react";
import { useParams } from "react-router-dom";
import MuseumCard from "./MuseumCard";
import SearchingBar from "../Home-Page/Searching-Bar/SearchingBar";
import "./searched-museums.css";
import { useMuseums } from "../../context/museumContext";
import FilterBar from "./FilterBar";
import NotFound from "./NotFound";
import Pagination from "../common/pagination/Pagination";

export default function SearchedMuseums() {
  const { key } = useParams();
  const { museums } = useMuseums();
  const [activeFilterList, setActiveFilterList] = useState([]);
  const [activePriceList, setActivePriceList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [museumsPerPage] = useState(4);

  const indexOfLastMuseum = currentPage * museumsPerPage;
  const indexOfFirstMuseum = indexOfLastMuseum - museumsPerPage;

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

  const searchedCurrentMuseums = searchedMuseum?.slice(
    indexOfFirstMuseum,
    indexOfLastMuseum
  );
  const searchedTotalPages = Math.ceil(searchedMuseum?.length / museumsPerPage);

  const filteredMuseum = searchedMuseum.filter((museum) => {
    if (activeFilterList?.includes(museum.address.city)) {
      return museum;
    } else if (activeFilterList?.includes(museum.category)) {
      return museum;
    } else if (activeFilterList?.includes(museum.rating.toString())) {
      return museum;
    } else if (
      activePriceList?.some(
        (item) =>
          museum.price.adults >= item.minPrice &&
          museum.price.adults < item.maxPrice
      )
    ) {
      return museum;
    }
  });

  const filteredCurrentMuseums = filteredMuseum?.slice(
    indexOfFirstMuseum,
    indexOfLastMuseum
  );
  const filteredTotalPages = Math.ceil(filteredMuseum?.length / museumsPerPage);

  return (
    <>
      <FilterBar
        activeFilterList={activeFilterList}
        setActiveFilterList={setActiveFilterList}
        museumData={searchedMuseum}
        setActivePriceList={setActivePriceList}
      />
      <div className="searched-museums">
        <div className="search-bar">
          <SearchingBar />
        </div>
        {activeFilterList.length > 0 || activePriceList.length > 0 ? (
          <>
            <div className="selected-filter-counter">
              <b>{filteredMuseum.length} museums</b> &nbsp;found
            </div>
            <div className="all-museums-card">
              <>
                {filteredMuseum.length > 0 ? (
                  <>
                    {filteredCurrentMuseums &&
                      filteredCurrentMuseums.map((museum) => {
                        return <MuseumCard key={museum._id} museum={museum} />;
                      })}
                  </>
                ) : (
                  <NotFound />
                )}
              </>
            </div>
            <Pagination
              pages={filteredTotalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        ) : (
          <>
            <div className="selected-filter-counter">
              <b>{searchedMuseum.length} museums</b> &nbsp;found
            </div>
            <div className="searched-museums-cards">
              <>
                {searchedMuseum.length > 0 ? (
                  <>
                    {searchedCurrentMuseums &&
                      searchedCurrentMuseums.map((museum) => {
                        return <MuseumCard key={museum._id} museum={museum} />;
                      })}
                  </>
                ) : (
                  <NotFound />
                )}
              </>
            </div>
            <Pagination
              pages={searchedTotalPages}
              setCurrentPage={setCurrentPage}
            />
          </>
        )}
      </div>
    </>
  );
}
