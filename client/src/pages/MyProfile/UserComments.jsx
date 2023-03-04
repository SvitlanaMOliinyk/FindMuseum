import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ProfileReviewCard from "./ProfileReviewCard";
import useFetch from "../../hooks/useFetch";

const UserComments = () => {
  const [userComments, setUserComments] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { userId } = useParams();

  const { performFetch } = useFetch(`/user/comments/${userId}`, (response) => {
    setUserComments(response.result.comments);
  });

  useEffect(() => {
    performFetch();
  }, [userId, refresh]);

  return (
    <>
      <Container>
        <ProfileReviewCard
          comments={userComments}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      </Container>
    </>
  );
};

export default UserComments;

const Container = styled.div`
  text-align: center;
  margin-top: 15vh;
  height: 100%;
  color: black;
`;
