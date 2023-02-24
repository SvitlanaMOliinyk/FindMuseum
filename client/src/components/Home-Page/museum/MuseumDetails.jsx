import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { AiFillBank, AiFillPhone } from "react-icons/ai";
import styled from "styled-components";
import { MdLocationPin } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import ReviewForm from "./review/ReviewForm";

const MuseumDetails = () => {
  const { museumId } = useParams();
  // I will get the info below to set userId to the comments
  // const {_id } = JSON.parse(localStorage.getItem("authUser"));
  const [museum, setMuseum] = useState({});
  const { performFetch, cancelFetch } = useFetch(
    `/museum/${museumId}`,
    (response) => {
      setMuseum(response.result[0]);
    }
  );

  useEffect(() => {
    performFetch();

    return cancelFetch;
  }, [museumId]);

  const {
    image,
    name,
    address,
    location,
    phone,
    website,
    description,
    openingHours,
    price,
    category,
  } = museum;

  return (
    <>
      <Container>
        <Row>
          <ColMuseum>
            <img src={image && image.url} alt={name} />
            <Category>
              <AiFillBank className="icon" />
              <h2>{category}</h2>
            </Category>

            <Info>
              <div className="address">
                <p>{address && address.city}</p>
                <p>{address && address.street}</p>
                <p>{address && address.postcode}</p>
                <p>The Nederlands</p>
              </div>

              <div className="contact">
                <div className="contact-item">
                  <MdLocationPin />
                  <a href={location && location.map}>View on map</a>
                </div>
                <div className="contact-item">
                  <AiFillPhone />
                  <a href={`tel:+${phone}`}>+{phone}</a>
                </div>
                <div className="contact-item">
                  <FaLink />
                  <a href={website}>Visit Website</a>
                </div>
              </div>
            </Info>
          </ColMuseum>

          <ColDescription>
            <h3>{name}</h3>
            <p>{description}</p>
          </ColDescription>
        </Row>
        <Row>
          <ColHourPrice>
            <h1>Opening Hours</h1>
            <table>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Hour</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{openingHours && openingHours[0].day}</td>
                  <td>{openingHours && openingHours[0].hours}</td>
                </tr>
                <tr>
                  <td>{openingHours && openingHours[1].day}</td>
                  <td>{openingHours && openingHours[1].hours}</td>
                </tr>
                <tr>
                  <td>{openingHours && openingHours[2].day}</td>
                  <td>{openingHours && openingHours[2].hours}</td>
                </tr>
                <tr>
                  <td>{openingHours && openingHours[3].day}</td>
                  <td>{openingHours && openingHours[3].hours}</td>
                </tr>
                <tr>
                  <td>{openingHours && openingHours[4].day}</td>
                  <td>{openingHours && openingHours[4].hours}</td>
                </tr>
                <tr>
                  <td>{openingHours && openingHours[5].day}</td>
                  <td>{openingHours && openingHours[5].hours}</td>
                </tr>
                <tr>
                  <td>{openingHours && openingHours[6].day}</td>
                  <td>{openingHours && openingHours[6].hours}</td>
                </tr>
              </tbody>
            </table>
          </ColHourPrice>
          <ColHourPrice>
            <h1>Entrance Fees</h1>
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Adults</td>
                  <td>
                    {price && price.adults != null ? "€" + price.adults : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Students</td>
                  <td>
                    {price && price.students != null
                      ? "€" + price.students
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Children</td>
                  <td>
                    {price && price.children != null
                      ? "€" + price.children
                      : "-"}
                  </td>
                </tr>
                <tr>
                  <td>Toddlers</td>
                  <td>
                    {price && price.toddlers != null
                      ? "€" + price.toddlers
                      : "-"}
                  </td>
                </tr>
              </tbody>
            </table>
          </ColHourPrice>
        </Row>
        <Row>
          <ColIframe>
            <h1>Location & Map</h1>
            <iframe
              src={location && location.iframe}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </ColIframe>
        </Row>

        <ReviewForm museumId={museumId} />
      </Container>
    </>
  );
};

export default MuseumDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 15vh 15vh 0 15vh;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ColMuseum = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 700px) {
    width: 90%;
  }
  margin: 0 2rem;
  img {
    width: 100%;
    height: 350px;
  }
`;

const Category = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--background-color);
  color: white;
  width: 100%;
  height: 3rem;
  .icon {
    margin-right: 0.3rem;
    width: 1.5rem;
    height: 1.5rem;
    color: white;
  }
`;

const ColDescription = styled.div`
  width: 50%;
  @media (max-width: 700px) {
    width: 90%;
    text-align: center;
    margin-top: 5rem;
  }
  margin: 0 2rem;
  font-size: 1.5rem;
  h3 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
`;

const Info = styled.div`
  width: 100%;
  background-color: var(--border-color);
  display: flex;
  justify-content: space-evenly;
  font-size: 1.3rem;
  padding: 1rem 0;
  svg {
    margin-right: 0.5rem;
    width: 1.5rem;
    height: 1.3rem;
    color: white;
  }
  .contact {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    color: blue;
  }
  .contact-item {
    display: flex;
    align-items: center;
  }
`;

const ColHourPrice = styled.div`
  width: 50%;
  @media (max-width: 700px) {
    width: 90%;
    margin-top: 5rem;
  }
  height: 50vh;
  padding: 0 3rem;
  margin-top: 0;

  h1 {
    text-align: center;
    color: white;
    padding-top: 1.3rem;
    background-color: var(--background-color);
    height: 10vh;
  }

  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    background-color: var(--background-color);
    color: white;
  }

  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }

  tr:nth-child(even) {
    background-color: #dddddd;
    color: black;
  }
`;

const ColIframe = styled.div`
  @media (max-width: 700px) {
    width: 100%;
  }
  iframe {
    width: 75vh;
    height: 56vh;
    border: 0;
    @media (max-width: 700px) {
      width: 100%;
      padding: 0 3rem;
    }
  }
  h1 {
    text-align: center;
    color: white;
    padding-top: 1rem;
    background-color: var(--background-color);
    height: 10vh;
    @media (max-width: 700px) {
      margin-right: 3rem;
      margin-left: 3rem;
    }
  }
`;
