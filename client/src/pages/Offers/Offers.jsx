import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import OfferItem from "./OfferItem";
import Loading from "../../components/common/loading/Loading";
import "./offers.css";

import Pagination from "../../components/common/pagination/Pagination";
import background from "../../assets/museums/t11.jpeg";

const Offers = () => {
  const [offers, setOffers] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [offersPerPage] = useState(4);
  const [currentButton, setCurrentButton] = useState(1);

  const indexOfLastOffer = currentPage * offersPerPage;
  const indexOfFirstOffer = indexOfLastOffer - offersPerPage;
  const totalPagesNum = Math.ceil(offers?.length / offersPerPage);

  const { isLoading, error, performFetch } = useFetch("/offer", (response) => {
    setOffers(response.result);
  });

  useEffect(() => {
    performFetch();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const currentOffers = offers?.slice(indexOfFirstOffer, indexOfLastOffer);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "visible";
    }
  }, [isLoading]);

  return (
    <main className="offers">
      <div
        className="head-part"
        style={{
          backgroundColor: "grey",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          color: "antiquewhite",
          backgroundPosition: "50%",
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
          {currentOffers.map((offer) => (
            <OfferItem key={offer._id} offer={offer} />
          ))}
        </div>
      ) : (
        <p>{error}</p>
      )}
      <Pagination
        pages={totalPagesNum}
        setCurrentPage={setCurrentPage}
        currentButton={currentButton}
        setCurrentButton={setCurrentButton}
      />
    </main>
  );
};

export default Offers;
