import React from "react";
import PropTypes from "prop-types";
import { useMuseums } from "../../context/museumContext";
import "./filter-bar.css";

const FilterBar = ({ activeFilterList, setActiveFilterList }) => {
  const { museums } = useMuseums();

  let categoryList = [];
  let cityList = [];

  museums.map((museum) => {
    if (!categoryList?.includes(museum.category)) {
      categoryList.push(museum.category);
    } else return;
  });

  museums.map((museum) => {
    if (!cityList?.includes(museum.address.city)) {
      cityList.push(museum.address.city);
    } else return;
  });

  const handleFilterClick = (e) => {
    // e.preventDefault();

    if (activeFilterList.length > 0) {
      if (activeFilterList?.includes(e.target.value)) {
        setActiveFilterList(
          activeFilterList.filter((filter) => filter !== e.target.value)
        );
      } else {
        setActiveFilterList([...activeFilterList, e.target.value]);
      }
    } else {
      setActiveFilterList([e.target.value]);
    }
  };

  const handleResetClick = () => {
    setActiveFilterList([]);
  };

  return (
    <section className="container--filter-bar">
      <div className="header--filter-bar">
        <h1>Filters</h1>
        <button onClick={handleResetClick}>Reset filters</button>
      </div>
      <hr className="filter-divider"></hr>
      <div className="container--filter-list">
        <fieldset className="container--fieldset">
          {cityList ? (
            <>
              <legend className="title--filter">CITY</legend>
              <ul>
                {cityList.map((city) => {
                  return (
                    <li key={city}>
                      <input
                        type="button"
                        onClick={handleFilterClick}
                        value={city}
                        className={
                          activeFilterList?.includes(city)
                            ? "filter-buttons active-filter"
                            : "filter-buttons"
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </fieldset>
        <hr className="filter-divider"></hr>
        <fieldset className="container--fieldset">
          {categoryList ? (
            <>
              <legend className="title--filter">CATEGORY</legend>
              <ul>
                {categoryList.map((category) => {
                  return (
                    <li key={category}>
                      <input
                        type="button"
                        onClick={handleFilterClick}
                        value={category}
                        className={
                          activeFilterList?.includes(category)
                            ? "filter-buttons active-filter"
                            : "filter-buttons"
                        }
                      />
                    </li>
                  );
                })}
              </ul>
            </>
          ) : null}
        </fieldset>
      </div>
    </section>
  );
};

FilterBar.propTypes = {
  activeFilterList: PropTypes.array,
  setActiveFilterList: PropTypes.node,
};

export default FilterBar;
