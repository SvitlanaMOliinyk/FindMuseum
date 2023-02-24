import React, { useEffect, useState } from "react";
import StarRating from "./StarRating";
import styled from "styled-components";
import * as Yup from "yup";
// import { useFormik } from "formik";
import useFetch from "../../../../hooks/useFetch";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loading-icons";

const ReviewForm = ({ museumId }) => {
  // const [refresh, setRefresh] = useState("");
  const [formData, setFormData] = useState({
    museumId: "",
    rate: 0,
    review: "",
  });

  const onSuccess = (response) => {
    console.log("onSuccess :", response);

    toast.success("Thanks for your review", {
      position: "top-center",
      autoClose: 3000,
    });
    setFormData({ ...formData, museumId: "", rate: 0, review: "" });
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/comment/create",
    onSuccess
  );

  useEffect(() => {
    if (error == "BAD REQUEST: review is a required field") {
      toast.warn("Review is required field", {
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
    console.log(formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { rate, review } = formData;
    try {
      performFetch({
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ comment: { museumId, rate, review } }),
      });
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1>Write Your Review</h1>
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
              {/* <ToastContainer position="top-center" /> */}
            </Form>
          </Col>
        </Row>
        <Row>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
};

export default ReviewForm;

const Container = styled.div`
  margin-top: 5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    margin-top: 1rem;
    text-align: center;
  }
`;

const Row = styled.div`
  width: 40%;
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
    margin: 0.5rem 0;
  }
  textarea {
    resize: none;
  }
`;
