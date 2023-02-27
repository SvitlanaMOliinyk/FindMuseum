import React from "react";
import AllMuseums from "../../components/Museum-Overview/AllMuseums";
import Filter from "../../components/Museum-Overview/Filter";
import "./museum-overview.css";

export default function MuseumOverview() {
  return (
    <div className="museum-overview">
      <Filter />
      <AllMuseums />
    </div>
  );
}
