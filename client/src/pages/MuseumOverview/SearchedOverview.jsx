import React, { useEffect } from "react";
import SearchedMuseums from "../../components/Museum-Overview/SearchedMuseums";
import "./searched-overview.css";

export default function SearchedOverview() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  return (
    <div className="searched-overview">
      <SearchedMuseums />
    </div>
  );
}
