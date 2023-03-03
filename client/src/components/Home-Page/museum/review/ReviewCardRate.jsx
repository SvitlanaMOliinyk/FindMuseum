import React from "react";
import { FaStar } from "react-icons/fa";
import styled from "styled-components";

const StarRating = ({ rate }) => {
  const colors = {
    orange: "var(--star-filled)",
    gray: "var(--star-empty)",
  };
  return (
    <>
      <Stars className="stars-review">
        {Array(5)
          .fill(0)
          .map((_, index) => {
            return (
              <FaStar
                size={24}
                key={index}
                style={{
                  marginRight: "1px",
                  stroke: "orange",
                }}
                color={rate > index ? colors.orange : colors.gray}
              />
            );
          })}
      </Stars>
    </>
  );
};

const Stars = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;

  svg {
    width: 1rem;
    stroke: orange;
    stroke-width: 1;
    stroke-linecap: round;
    stroke-linejoin: round;
    margin-right: 5px;
  }
`;
export default StarRating;
