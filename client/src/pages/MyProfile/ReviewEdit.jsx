import React from "react";
import styled from "styled-components";
import ReviewForm from "../../components/Home-Page/museum/review/ReviewForm";

const ReviewEdit = ({ trigger, comment, setTrigger, refresh, setRefresh }) => {
  return trigger ? (
    <Div>
      <ReviewForm
        type="Edit"
        comment={comment}
        setTrigger={setTrigger}
        refresh={refresh}
        setRefresh={setRefresh}
      />
    </Div>
  ) : (
    ""
  );
};

export default ReviewEdit;

const Div = styled.div`
  position: fixed;
  top: 3rem;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.2);
`;
