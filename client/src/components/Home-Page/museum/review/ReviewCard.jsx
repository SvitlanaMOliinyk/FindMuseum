import React from "react";
import styled from "styled-components";
import ReviewCardRate from "./ReviewCardRate.jsx";
import PropTypes from "prop-types";

const ReviewCard = ({ comments, museumName }) => {
  ReviewCard.propTypes = {
    comments: PropTypes.array,
    museumName: PropTypes.string,
  };
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <>
      <Container>
        <Head>
          <h1>{`Reviews of ${museumName}`} </h1>
          <h3>{`There are ${
            comments && comments.length
          } reviews of ${museumName} `}</h3>
        </Head>

        {comments &&
          comments.map((comment) => {
            let date = "";
            let day = "";
            let month = "";
            if (comment) {
              date = new Date(comment.createdAt);
              day = date.getDate();
              month = monthNames[date.getMonth()];
            }

            return (
              <Row key={comment._id}>
                <Col>
                  <CommentContainer>
                    <AvatarCont>
                      <Avatar>
                        <span>{comment.userId.firstName.charAt(0)}</span>
                      </Avatar>
                      <DateRate>
                        <div className="name-date">
                          <h4>{`${
                            comment.userId.firstName
                          } ${comment.userId.lastName.charAt(0)}`}</h4>
                          <span className="dot"></span>
                          <span>{`${month} ${day}`}</span>
                        </div>
                        <div>
                          <ReviewCardRate rate={comment && comment.rate} />
                        </div>
                      </DateRate>
                    </AvatarCont>
                    <Review>
                      <p>{comment && comment.review}</p>
                    </Review>
                  </CommentContainer>
                </Col>
              </Row>
            );
          })}
      </Container>
    </>
  );
};

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
  @media (max-width: 700px) {
    text-align: center;
  }
`;

const Container = styled.div`
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
  height: 50%;

  margin-bottom: 3rem;
  width: 35%;
  @media (max-width: 700px) {
    width: 80%;
  }
  @media (min-width: 701px) and (max-width: 820px) {
    width: 60%;
  }
  background-color: #ffffff;
  border-radius: 1rem;
`;

const Col = styled.div`
  height: 40%;
  @media (max-width: 700px) {
    height: 20%;
  }
`;

const CommentContainer = styled.div`
  height: 30%;
`;
const AvatarCont = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 5rem;
`;

const Avatar = styled.div`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #5585e0;
  text-align: center;
  position: relative;
  span {
    font-size: 2.5rem;
    position: absolute;
    top: 0.2rem;
    right: 0.7rem;
    font-weight: bold;
  }
`;

const DateRate = styled.div`
  width: max-content;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  .name-date {
    display: flex;
    flex-direction: row;
  }
  .dot {
    border-radius: 50%;
    height: 5px;
    width: 5px;
    background: black;
    margin: 0px 0.3rem;
    margin-top: 10px;
  }
`;

const Review = styled.div`
  font-size: 1.5rem;
  p {
    padding-left: 1rem;
    padding-right: 1rem;
    height: 100%;
    overflow-y: scroll;
  }
`;

export default ReviewCard;
