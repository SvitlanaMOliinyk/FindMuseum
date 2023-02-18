import React, { useState, useEffect } from "react";
import "./searching-bar.css";

const SearchingBar = () => {
  const [name, setName] = useState("");

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="searching-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the name of the museum"
          id="search-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchingBar;
