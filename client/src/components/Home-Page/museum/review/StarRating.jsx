import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StarRating = ({ formData, setFormData }) => {
  const colors = {
    orange: "var(--star-filled)",
    gray: "var(--star-empty)",
  };
  return (
    <>
      <Rating className="icon">
        <h2>Rate Museum</h2>
      </Rating>
      <Stars className="stars">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <FaStar
                size={24}
                key={index}
                style={{
                  cursor: "pointer",
                  marginRight: "10px",
                  stroke: "orange",
                }}
                color={formData.rate > index ? colors.orange : colors.gray}
                onClick={() => {
                  setFormData({ ...formData, rate: index + 1 });
                }}
              />
            );
          })}
      </Stars>
    </>
  );
};

const Rating = styled.div`
  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 1rem;
    text-align: center;
    padding: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
`;

const Stars = styled.div`
  display: flex;
  justify-content: center;
  svg {
    stroke: orange;
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
  }
`;
export default StarRating;
