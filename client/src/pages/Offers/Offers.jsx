import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import OfferItem from "./OfferItem";
import Loading from "../../components/common/loading/Loading";
import "./offers.css";
import background from "../../assets/museums/t3.jpeg";

const Offers = () => {
  const [offers, setOffers] = useState([]);
  const { isLoading, error, performFetch } = useFetch("/offer", (response) => {
    setOffers(response.result);
  });

  useEffect(() => {
    performFetch();
  }, []);

  return (
    <main className="offers">
      <div
        className="head-part"
        style={{
          backgroundColor: "grey",
          backgroundBlendMode: "multiply",
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "white",
        }}
      >
        <p>
          <span style={{ fontSize: "1.8rem" }}>
            More discoveries, more visit, more benefits...
          </span>
          <br></br>Browse our current offers below or log into your account to
          see all the offers available for your tier. We add new offers all the
          time, so remember to check back for the latest deals. When you get the
          chance you will receive a promotion code for your ticket.
        </p>
      </div>
      {isLoading ? (
        <Loading />
      ) : !error && offers?.length > 0 ? (
        <div className="offers-part">
          {offers.map((offer) => (
            <OfferItem key={offer._id} offer={offer} />
          ))}
        </div>
      ) : (
        <p>{error}</p>
      )}
    </main>
  );
};

export default Offers;
