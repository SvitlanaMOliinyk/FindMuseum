import React, { useEffect, useState } from "react";
import "./pagination.css";
import PropTypes from "prop-types";
import { GrPrevious, GrNext } from "react-icons/gr";

export default function Pagination({ pages, setCurrentPage }) {
  const numOfPages = [];

  for (let i = 1; i <= pages; i++) {
    numOfPages.push(i);
  }

  const [currentButton, setCurrentButton] = useState(1);

  useEffect(() => {
    setCurrentPage(currentButton);
  }, [currentButton, setCurrentPage]);

  return (
    <div className="clearfix">
      <ul className="pagination">
        <ul className="pagination">
          <li
            className={`${
              currentButton === 1 ? "page-item disabled" : "page-item"
            }`}
          >
            <a
              href="#!"
              onClick={() =>
                setCurrentButton((prev) => (prev === 1 ? prev : prev - 1))
              }
            >
              <GrPrevious className="pagination-icon" />
            </a>
          </li>

          {numOfPages.map((page, index) => {
            return (
              <li
                key={index}
                className={`${
                  currentButton === page ? "page-item active" : "page-item"
                }`}
              >
                <a
                  href="#!"
                  className="page-link"
                  onClick={() => setCurrentButton(page)}
                >
                  {page}
                </a>
              </li>
            );
          })}

          <li
            className={`${
              currentButton === numOfPages.length
                ? "page-item disabled"
                : "page-item"
            }`}
          >
            <a
              href="#!"
              onClick={() =>
                setCurrentButton((next) =>
                  next === numOfPages.length ? next : next + 1
                )
              }
            >
              <GrNext />
            </a>
          </li>
        </ul>
      </ul>
    </div>
  );
}
Pagination.propTypes = {
  pages: PropTypes.number,
  setCurrentPage: PropTypes.func,
};
