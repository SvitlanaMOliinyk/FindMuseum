import React, { useState } from "react";
import "./searching-bar.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

const SearchingBar = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length > 0) {
      navigate("/museums", { state: { query: name } });
    }
  };

  return (
    <div className="searching-bar">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="search-icon">
          <FaSearch />
        </div>
        <input
          type="text"
          className="form-control"
          placeholder="Enter the city or the name of the museum"
          id="search-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </form>
    </div>
  );
};

export default SearchingBar;
