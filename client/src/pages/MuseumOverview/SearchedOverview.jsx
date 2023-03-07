import React, { useEffect } from "react";
import SearchedMuseums from "../../components/Museum-Overview/SearchedMuseums";
import { scrollToUp } from "../../hooks/scrollToTop";
import "./searched-overview.css";

export default function SearchedOverview() {
  useEffect(() => {
    scrollToUp();
  });

  return (
    <div className="searched-overview">
      <SearchedMuseums />
    </div>
  );
}
