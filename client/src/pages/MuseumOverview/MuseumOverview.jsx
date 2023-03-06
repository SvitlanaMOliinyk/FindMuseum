import React, { useEffect } from "react";
import AllMuseums from "../../components/Museum-Overview/AllMuseums";
import "./museum-overview.css";

export default function MuseumOverview() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  });
  return (
    <div className="museum-overview">
      <AllMuseums />
    </div>
  );
}
