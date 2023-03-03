import React, { useEffect, useState } from "react";
import "./all-museums.css";
import SearchingBar from "../Home-Page/Searching-Bar/SearchingBar";
import MuseumCard from "./MuseumCard";
import { useMuseums } from "../../context/museumContext";
import FilterBar from "./FilterBar";
import NotFound from "./NotFound";
import Pagination from "../common/pagination/Pagination";

export default function AllMuseums() {
  const { museums } = useMuseums([]);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [museumsPerPage] = useState(4);

  const indexOfLastMuseum = currentPage * museumsPerPage;
  const indexOfFirstMuseum = indexOfLastMuseum - museumsPerPage;
  const currentMuseums = museums?.slice(indexOfFirstMuseum, indexOfLastMuseum);
  const totalPagesNum = Math.ceil(museums?.length / museumsPerPage);

  //Filter lists by city, category, rating and price
  const [activeCityFilterList, setActiveCityFilterList] = useState([]);
  const [activeCategoryFilterList, setActiveCategoryFilterList] = useState([]);
  const [activeRatingFilterList, setActiveRatingFilterList] = useState([]);
  const [activePriceList, setActivePriceList] = useState([]);

  //Museum lists by city, category and rating
  const [cityFilteredMuseum, setCityFilteredMuseum] = useState([]);
  const [categoryFilteredMuseum, setCategoryFilteredMuseum] = useState([]);
  const [ratingFilteredMuseum, setRatingFilteredMuseum] = useState([]);
  const [priceFilteredMuseum, setPriceFilteredMuseum] = useState([]);

  //price index value
  const [activePriceIndex, setActivePriceIndex] = useState(null);
  //Last result of filtering
  // const [filteredMuseum, setFilteredMuseum] = useState([]);

  useEffect(() => {
    // city filtering
    if (activeCityFilterList.length > 0) {
      let cityMuseums = museums.filter((museum) => {
        if (activeCityFilterList?.includes(museum.address.city)) {
          return museum;
        }
      });
      setCityFilteredMuseum(cityMuseums);
    } else {
      setCityFilteredMuseum(museums);
    }

    // category filtering
    if (activeCategoryFilterList.length > 0) {
      let categoryMuseums = museums.filter((museum) => {
        if (activeCategoryFilterList?.includes(museum.category)) {
          return museum;
        }
      });
      setCategoryFilteredMuseum(categoryMuseums);
    } else {
      setCategoryFilteredMuseum(museums);
    }

    // rating filtering
    if (activeRatingFilterList.length > 0) {
      let ratingMuseums = museums.filter((museum) => {
        if (activeRatingFilterList?.includes(museum.rating.toString())) {
          return museum;
        }
      });
      setRatingFilteredMuseum(ratingMuseums);
    } else {
      setRatingFilteredMuseum(museums);
    }

    // price filtering
    if (activePriceList.length > 0) {
      let priceMuseums = museums.filter((museum) => {
        if (
          activePriceList?.some(
            (item) =>
              museum.price.adults >= item.minPrice &&
              museum.price.adults < item.maxPrice
          )
        ) {
          return museum;
        }
      });
      setPriceFilteredMuseum(priceMuseums);
    } else {
      setPriceFilteredMuseum(museums);
    }
  }, [
    activeCityFilterList,
    activeCategoryFilterList,
    activeRatingFilterList,
    activePriceList,
  ]);

  //set filteredMuseum from result list
  const filteredMuseum = cityFilteredMuseum.filter((museum) => {
    if (
      categoryFilteredMuseum.includes(museum) &&
      ratingFilteredMuseum.includes(museum) &&
      priceFilteredMuseum.includes(museum)
    ) {
      return museum;
    }
  });

  const filteredCurrentMuseums = filteredMuseum?.slice(
    indexOfFirstMuseum,
    indexOfLastMuseum
  );
  const filteredTotalPages = Math.ceil(filteredMuseum?.length / museumsPerPage);

  // setFilteredMuseum(resultMuseumList);

  return (
    <>
      <FilterBar
        activeCityFilterList={activeCityFilterList}
        setActiveCityFilterList={setActiveCityFilterList}
        activeCategoryFilterList={activeCategoryFilterList}
        setActiveCategoryFilterList={setActiveCategoryFilterList}
        activeRatingFilterList={activeRatingFilterList}
        setActiveRatingFilterList={setActiveRatingFilterList}
        museumData={museums}
        setActivePriceList={setActivePriceList}
        activePriceIndex={activePriceIndex}
        setActivePriceIndex={setActivePriceIndex}
      />
      <div className="all-museums">
        <div className="search-bar">
          <SearchingBar />
        </div>

        {activeCityFilterList.length > 0 ||
        activeCategoryFilterList.length > 0 ||
        activeRatingFilterList.length > 0 ||
        activePriceList.length > 0 ? (
          <>
            <div className="selected-filter-counter">
              <b>{filteredMuseum?.length} museums</b> &nbsp;found
            </div>
            <div className="all-museums-card">
              <>
                {filteredMuseum?.length > 0 ? (
                  <>
                    {filteredCurrentMuseums &&
                      filteredCurrentMuseums.map((museum) => {
                        return <MuseumCard key={museum._id} museum={museum} />;
                      })}
                  </>
                ) : (
                  <NotFound
                    setActiveCityFilterList={setActiveCityFilterList}
                    setActiveCategoryFilterList={setActiveCategoryFilterList}
                    setActiveRatingFilterList={setActiveRatingFilterList}
                    setActivePriceList={setActivePriceList}
                    setActivePriceIndex={setActivePriceIndex}
                  />
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
                  <NotFound
                    setActiveCityFilterList={setActiveCityFilterList}
                    setActiveCategoryFilterList={setActiveCategoryFilterList}
                    setActiveRatingFilterList={setActiveRatingFilterList}
                    setActivePriceList={setActivePriceList}
                    setActivePriceIndex={setActivePriceIndex}
                  />
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
