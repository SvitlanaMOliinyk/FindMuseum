import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import styled from "styled-components";
import PropTypes from "prop-types";
import useFetch from "../../../../hooks/useFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loading-icons";
import { IoMdCloseCircleOutline } from "react-icons/io";

const ReviewForm = ({
  type,
  museumId,
  comment,
  setTrigger,
  refresh,
  setRefresh,
}) => {
  ReviewForm.propTypes = {
    type: PropTypes.string,
    museumId: PropTypes.number,
    comment: PropTypes.object,
    setTrigger: PropTypes.bool,
    refresh: PropTypes.bool,
    setRefresh: PropTypes.func,
  };
  const authUser = JSON.parse(localStorage.getItem("authUser"));
  const isLoggedIn = JSON.parse(localStorage.getItem("isLoggedIn"));
  const [formData, setFormData] = useState({
    museumId: `${comment ? comment.museumId._id : museumId}`,
    rate: `${comment ? comment.rate : 0}`,
    review: `${comment ? comment.review : ""}`,
  });

  ReviewForm.propTypes = {
    museumId: PropTypes.string,
  };

  const onSuccess = (response) => {
    setRefresh(!refresh);
    if (response.type == "update") {
      toast.success("Review Edited Successfully", {
        position: "top-center",
        autoClose: 3000,
      });
    } else {
      toast.success("Thanks for your review", {
        position: "top-center",
        autoClose: 3000,
      });
    }
    setFormData({ ...formData, museumId: "", rate: 0, review: "" });
  };

  const { isLoading, error, setError, performFetch, cancelFetch } = useFetch(
    // if type of review "write" we will send /comment/create url with POST method below in performFetch"
    // els type of review "Edit" we will send /comment/edit url with PUT method below in performFetch
    `/comment/${type == "Write" ? "create" : "edit"}`,
    onSuccess
  );

  useEffect(() => {
    if (error == "BAD REQUEST: review is a required field") {
      toast.warn("Review is required field", {
        position: "top-center",
        autoClose: 3000,
      });
    } else if (error == "UnAuthorized") {
      toast.warn("You Have to logged In", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [error]);

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClose = () => {
    setTrigger(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoggedIn == false) {
      setError("UnAuthorized");
      return;
    }
    const { _id } = authUser;
    let commentId = "";
    if (comment) {
      commentId = comment._id;
    }
    const { rate, review, museumId } = formData;
    try {
      performFetch({
        method: `${type == "Write" ? "POST" : "PUT"}`,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          comment: { userId: _id, commentId, museumId, rate, review },
        }),
      });
      setTrigger(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          {type == "Edit" && (
            <div className="close">
              <IoMdCloseCircleOutline onClick={handleClose} />
            </div>
          )}
          <Col>
            <h1>{`${type} Your Review`}</h1>
            <StarRating formData={formData} setFormData={setFormData} />
          </Col>
          <Col>
            <Form noValidate onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="hidden"
                  name="rate"
                  onChange={handleFormData}
                  value={formData.rate}
                />
              </div>

              <div className="input-group">
                <textarea
                  cols="50"
                  rows="15"
                  name="review"
                  value={formData.review}
                  onChange={handleFormData}
                ></textarea>
              </div>

              <button
                className="submit-button"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Oval className="spinner" stroke="white" />
                ) : (
                  "Send"
                )}
              </button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ReviewForm;

const Container = styled.div`
  margin-top: 5rem;
  margin-bottom: 3rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    margin-top: 1rem;
    text-align: center;
  }
  .close {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    font-size: 2rem;
    padding-right: 1rem;
    padding-top: 1rem;
    color: gray;
    &:hover {
      color: black;
    }
  }
`;

const Row = styled.div`
  width: 40%;
  @media (max-width: 700px) {
    width: 80%;
  }
  background-color: white;
  border-radius: 0.5rem;
`;

const Col = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  .input-group {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    margin: 0.5rem 1rem;
  }
  textarea {
    resize: none;
    width: 90%;
  }
`;
