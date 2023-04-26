import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import Loading from "../../components/common/loading/Loading";
import { scrollToUp } from "../../hooks/scrollToUp";
import MyOffer from "./MyOffer";
import "./myOffers.css";

export default function MyOffers() {
  const [myOffers, setMyOffers] = useState([]);
  const { id } = useParams();
  const { isLoading, error, performFetch } = useFetch(
    `/offer/myOffers/${id}`,
    (response) => {
      setMyOffers(response.result);
    }
  );

  useEffect(() => {
    performFetch();
  }, [id]);

  useEffect(() => {
    scrollToUp();
  });

  let content = null;
  if (isLoading) {
    content = <Loading />;
  } else if (error != null) {
    content = <div>Error: {error.toString()}</div>;
  } else if (myOffers.length < 1) {
    content = (
      <main className="my-offers-container">
        <h1 className="no-offers">You have no offer yet!</h1>
      </main>
    );
  } else {
    content = (
      <main className="my-offers-container">
        {myOffers.map((myOffer) => (
          <MyOffer key={myOffer._id} myOffer={myOffer} />
        ))}
      </main>
    );
  }
  return content;
}
