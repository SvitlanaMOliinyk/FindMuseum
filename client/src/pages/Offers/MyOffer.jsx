import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MyOffer = ({ myOffer }) => {
  const { _id, expireDate, newPrice, numberOfTickets, museumId } = myOffer;
  const userId = JSON.parse(localStorage.getItem("authUser"));
  const [myOfferId, setMyOfferId] = useState("");
  const [isCanceled, setIsCancel] = useState(false);
  const currentDate = new Date().toISOString();
  const buyer = userId._id;
  const navigate = useNavigate();

  const refresh = () => {
    window.location.reload();
  };

  const onSuccess = (jsonResult) => {
    if (typeof jsonResult.result === "string") {
      toast.success("Your offer is canceled", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        refresh();
      }, 2000);
    } else {
      toast.error("Try again later!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        refresh();
      }, 2000);
    }
  };
  const { performFetch } = useFetch(`/offer/cancel/${myOfferId}`, onSuccess);

  const handleClick = (event) => {
    event.preventDefault();
    const buttonName = event.target.name;
    if (buttonName === "cancel") {
      const cancelOffer = event.target.value;
      setMyOfferId(cancelOffer);
      setIsCancel(true);
    } else {
      navigate(`/printOffer/${_id}`, { state: { myOffer: myOffer } });
    }
  };

  useEffect(() => {
    if (isCanceled === true && expireDate > currentDate) {
      performFetch({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify({
          numberOfTickets: numberOfTickets + 1,
          buyer: buyer,
        }),
      });
    }
    if (isCanceled === true && expireDate <= currentDate) {
      toast.error("Time for cancelation is expired!", {
        position: "top-center",
        autoClose: 2000,
      });
      setTimeout(() => {
        refresh();
      }, 2000);
    }
  }, [myOfferId, isCanceled]);

  return (
    <div className="myOffer-items">
      <div className="myOffer-item-name">
        <div className="offers-img-container">
          <h2>{museumId.name}</h2>
          <img src={museumId.image.url} alt={museumId.name} width={200} />
        </div>
        <div className="date-number">
          <h2>Expire Date: {expireDate.toString().slice(0, 10)}</h2>
        </div>
        <div className="offer-price">
          <h4>Price: {newPrice}€</h4>
          <button
            className="chance-button"
            value={_id}
            name="cancel"
            onClick={handleClick}
          >
            Cancel the offer
          </button>
          <button
            className="chance-button"
            value={_id}
            name="print"
            onClick={handleClick}
          >
            Print the offer
          </button>
        </div>
      </div>
    </div>
  );
};
MyOffer.propTypes = {
  myOffer: PropTypes.object,
};
export default MyOffer;
