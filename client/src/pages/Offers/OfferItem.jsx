import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import PropTypes from "prop-types";
import { useAuth } from "../../context/authContext";
import { toast } from "react-toastify";

const OfferItem = ({ offer }) => {
  const { _id, expireDate, numberOfTickets, newPrice, museumId } = offer;
  const { authUser } = useAuth();
  const [offerId, setOfferId] = useState("");
  const navigate = useNavigate();
  const buyer = authUser?._id;

  const onSuccess = (jsonResult) => {
    if (jsonResult.result.includes("C")) {
      toast.success("Congratulations! Your offer is in your email-box now.", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error("You have already got the offer!", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  const { performFetch } = useFetch(`/offer/${offerId}`, onSuccess);

  const handleClick = (event) => {
    event.preventDefault();
    if (authUser) {
      setOfferId(_id);
    } else {
      toast.warn("Please, log in to get your offer!", {
        position: "top-center",
        autoClose: 3000,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  useEffect(() => {
    if (offerId?.length > 0) {
      performFetch({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          numberOfTickets: numberOfTickets - 1,
          buyer: buyer,
        }),
      });
    }
  }, [offerId]);

  return (
    <div className="offer-item">
      <div className="offer-item-name">
        <h2>{museumId.name}</h2>
        <div className="offers-img-container">
          <img src={museumId.image.url} alt={museumId.name} width={200} />
        </div>
      </div>

      <div className="date-number">
        <h1>Until Date: {expireDate.toString().slice(0, 10)}</h1>
        <h2>
          There are just{" "}
          <span style={{ color: "var(--navbar-color)" }}>
            {numberOfTickets}
          </span>{" "}
          more available!..
        </h2>
      </div>
      <div className="offer-price">
        <h3>
          Price:{" "}
          <span style={{ color: "var(--navbar-color)" }}>{newPrice}€</span>
          <span style={{ textDecoration: "line-through" }}>
            {museumId.price.adults}€
          </span>
        </h3>
        <button className="chance-button" onClick={handleClick}>
          Get the chance
        </button>
      </div>
    </div>
  );
};

OfferItem.propTypes = {
  offer: PropTypes.object,
};
export default OfferItem;
