import React, { useState, useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { AiFillBank, AiFillPhone } from "react-icons/ai";
import styled from "styled-components";
import { MdLocationPin } from "react-icons/md";
import { FaLink } from "react-icons/fa";
import ReviewForm from "./review/ReviewForm";
import ReviewCard from "./review/ReviewCard";
import Heart from "../../../components/Favorite/Heart";

const MuseumDetails = () => {
  const { museumId } = useParams();
  const [museum, setMuseum] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { performFetch, cancelFetch } = useFetch(
    `/museum/${museumId}`,
    (response) => {
      setMuseum(response.result);
    }
  );

  useEffect(() => {
    performFetch();
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    return cancelFetch;
  }, [museumId, refresh]);

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
    comments,
  } = museum;

  return (
    <>
      <Container>
        <Row>
          <ColMuseum>
            <img src={image && image.url} alt={name} className="image-museum" />
            <Heart id={museumId} />
            <Category>
              <AiFillBank className="icon" />
              <h2>{category && category}</h2>
            </Category>

            <Info>
              <div className="address">
                <p>{address?.city}</p>
                <p>{address?.street}</p>
                <p>{address?.postcode}</p>
                <p>The Nederlands</p>
              </div>

              <div className="contact">
                <div className="contact-item">
                  <MdLocationPin />
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={location?.map}
                  >
                    View on map
                  </a>
                </div>
                <div className="contact-item">
                  <AiFillPhone />
                  <a href={`tel:+${phone}`}>+{phone}</a>
                </div>
                <div className="contact-item">
                  <FaLink />
                  <a target="_blank" rel="noopener noreferrer" href={website}>
                    Visit Website
                  </a>
                </div>
              </div>
            </Info>
          </ColMuseum>

          <ColDescription>
            <h2>{name}</h2>
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
                {openingHours?.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item && item.day}</td>
                      <td>{item && item.hours}</td>
                    </tr>
                  );
                })}
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
                {price &&
                  Object.keys(price).map((item, index) => (
                    <tr key={index}>
                      <td>{item}</td>
                      <td>{"€" + price[item]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </ColHourPrice>
        </Row>
        <Row>
          <ColIframe>
            <h1>Location & Map</h1>
            <iframe
              src={location?.iframe}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </ColIframe>
        </Row>
        <Row>
          <ReviewCard comments={comments} museumName={name} />
        </Row>
        <Row>
          <ReviewForm
            type="Write"
            museumId={museumId}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        </Row>
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
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 700px) {
    width: 90%;
  }
  .heart .fav_icon svg {
    position: absolute;
    right: 0.5rem;
    left: auto;
    width: 5rem;
    height: 5rem;
  }
  margin: 0 2rem;
  .image-museum {
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
  height: 542px;
  @media (max-width: 700px) {
    width: 90%;
    text-align: center;
    margin-top: 5rem;
  }
  margin: 0 2rem;
  font-size: 1.5rem;
  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }
  p {
    @media (max-width: 700px) {
      line-height: 1.4em;
    }
    @media (min-width: 1125) {
      line-height: 1em;
    }
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
    width: 90%;
  }
  iframe {
    width: 75vh;
    height: 56vh;
    border: 0;
    @media (max-width: 700px) {
      width: 100%;
    }
  }
  h1 {
    text-align: center;
    color: white;
    padding-top: 1rem;
    background-color: var(--background-color);
    height: 10vh;
  }
`;
