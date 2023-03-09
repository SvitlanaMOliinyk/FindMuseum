import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileReviewCard from "./ProfileReviewCard";
import useFetch from "../../hooks/useFetch";
import Pagination from "../../components/common/pagination/Pagination";

const UserComments = () => {
  const [userComments, setUserComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { userId } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(5);
  const [currentButton, setCurrentButton] = useState(1);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const totalPagesNum = Math.ceil(userComments?.length / commentsPerPage);

  const { performFetch } = useFetch(`/user/comments/${userId}`, (response) => {
    setUserComments(response.result.comments);
  });

  useEffect(() => {
    performFetch();
  }, [userId, refresh]);

  const currentComments = userComments?.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  return (
    <>
      <Container>
        <ProfileReviewCard
          comments={currentComments}
          refresh={refresh}
          setRefresh={setRefresh}
          commentLength={userComments?.length}
        />

        <Pagination
          pages={totalPagesNum}
          setCurrentPage={setCurrentPage}
          currentButton={currentButton}
          setCurrentButton={setCurrentButton}
        />
      </Container>
    </>
  );
};

export default UserComments;

const Container = styled.div`
  text-align: center;
  margin-top: 15vh;
  min-height: 45.5vh;
  height: 100%;
  color: black;
`;
