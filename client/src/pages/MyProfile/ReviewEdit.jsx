import React from "react";
import styled from "styled-components";
import ReviewForm from "../../components/Home-Page/museum/review/ReviewForm";
import PropTypes from "prop-types";

const ReviewEdit = ({ trigger, comment, setTrigger, refresh, setRefresh }) => {
  ReviewEdit.propTypes = {
    trigger: PropTypes.bool,
    comment: PropTypes.object,
    setTrigger: PropTypes.func,
    refresh: PropTypes.bool,
    setRefresh: PropTypes.func,
  };
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
  padding-top: 1rem;
  position: fixed;
  top: 3rem;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: rgba(0, 0, 0, 0.2);
`;
