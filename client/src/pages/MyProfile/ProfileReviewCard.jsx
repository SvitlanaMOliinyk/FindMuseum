import React, { useState } from "react";
import styled from "styled-components";
import ReviewCardRate from "../../components/Home-Page/museum/review/ReviewCardRate";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import ReviewEdit from "./ReviewEdit";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { logError } from "../../../../server/src/util/logging";

const ProfileReviewCard = ({ comments, refresh, setRefresh }) => {
  ProfileReviewCard.propTypes = {
    comments: PropTypes.array,
    refresh: PropTypes.bool,
    setRefresh: PropTypes.func,
  };
  const user = JSON.parse(localStorage.getItem("authUser"));
  const [comment, setComment] = useState({});
  const [trigger, setTrigger] = useState(false);
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

  const handleEdit = (comment) => {
    setComment(comment);
    setTrigger(true);
  };

  const { performFetch } = useFetch("/comment/delete", () => {
    toast.success("Review Deleted Successfully", {
      position: "top-center",
      autoClose: 3000,
    });
  });

  const handleDelete = (comment) => {
    setComment(comment);
    try {
      performFetch({
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          comment: { commentId: comment._id },
        }),
      });
      setRefresh(!refresh);
    } catch (error) {
      logError(error);
    }
  };

  return (
    <>
      <Container>
        <ReviewEdit
          trigger={trigger}
          setTrigger={setTrigger}
          comment={comment}
          refresh={refresh}
          setRefresh={setRefresh}
        />
        <Head>
          <h1>
            {`Reviews of ${user && user.firstName} ${user && user.lastName}`}{" "}
          </h1>
          <h3>{`There are ${comments && comments.length} reviews of ${
            user && user.firstName
          } ${user && user.lastName} `}</h3>
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
                    <EditDelete>
                      <CommentMuseum>
                        {comment && comment.museumId.name}
                      </CommentMuseum>
                      <FiEdit onClick={() => handleEdit(comment)} />
                      <RiDeleteBinLine onClick={() => handleDelete(comment)} />
                    </EditDelete>
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

const CommentMuseum = styled.div`
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  color: blue;
  font-size: 1.5rem;
`;

const EditDelete = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  svg {
    padding-top: 0.5rem;
    padding-right: 0.5rem;
    font-size: 1.5rem;
    color: gray;
    &:hover {
      color: black;
    }
  }
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 2rem;
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

export default ProfileReviewCard;
