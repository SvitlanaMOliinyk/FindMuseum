import React, { useState } from "react";
import "./all-museums.css";
import SearchingBar from "../Home-Page/Searching-Bar/SearchingBar";
import MuseumCard from "./MuseumCard";
import { useMuseums } from "../../context/museumContext";
import FilterBar from "./FilterBar";
import NotFound from "./NotFound";
import Pagination from "../common/pagination/Pagination";

export default function AllMuseums() {
  const { museums } = useMuseums([]);
  const [activeFilterList, setActiveFilterList] = useState([]);
  const [activePriceList, setActivePriceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [museumsPerPage] = useState(4);

  const indexOfLastMuseum = currentPage * museumsPerPage;
  const indexOfFirstMuseum = indexOfLastMuseum - museumsPerPage;

  const currentMuseums = museums?.slice(indexOfFirstMuseum, indexOfLastMuseum);
  const totalPagesNum = Math.ceil(museums?.length / museumsPerPage);

  const filteredMuseum = museums.filter((museum) => {
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
        museumData={museums}
        setActivePriceList={setActivePriceList}
      />
      <div className="all-museums">
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
              <b>{museums.length} museums</b> &nbsp;found
            </div>
            <div className="all-museums-card">
              <>
                {museums.length > 0 ? (
                  <>
                    {currentMuseums &&
                      currentMuseums.map((museum) => {
                        return <MuseumCard key={museum._id} museum={museum} />;
                      })}
                  </>
                ) : (
                  <NotFound />
                )}
              </>
            </div>
            <Pagination pages={totalPagesNum} setCurrentPage={setCurrentPage} />
          </>
        )}
      </div>
    </>
  );
}
