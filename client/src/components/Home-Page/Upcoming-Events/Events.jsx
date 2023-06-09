import React from "react";
import { Link } from "react-router-dom";
import "./events.css";
import sunflowers from "../../../assets/img/van-gogh-museum.jpeg";
import auto from "../../../assets/img/louwman-museum.jpeg";
import escher from "../../../assets/img/kunstmuseum.jpeg";
import gift from "../../../assets/img/gift.svg";

const Events = () => {
  return (
    <section className="upcoming-events">
      <div className="home-offers-section">
        <div className="home-offers-container">
          <img src={gift} className="home-offers-img" />
        </div>

        <div className="offers-section">
          <p className="offers-text">
            Still looking for something interesting? <br /> You can learn more
            about special museums offers!
          </p>

          <Link to="/offers">
            <button className="home-offers-button">Check it out</button>
          </Link>
        </div>
      </div>

      <div className="van-gogh-section">
        <img className="sunflowers" src={sunflowers} alt="sunflowers" />

        <div className="event-sections-text">
          <div className="section-para">
            <h3> The Van Gogh Museum celebrates 50 years</h3>
            <h4>
              <i>12 May 2023 - 3 September 2023</i>:
            </h4>
            <p>
              see the masterpieces that Vincent painted in the final months of
              his life in Van Gogh in Auvers.
            </p>
            <h4>
              <i>13 October 2023 - 14 January 2024</i>:
            </h4>
            <p>
              gaze across the water in the paintings that Van Gogh, Seurat,
              Signac, Bernard and Angrand made on banks of the Seine in Van Gogh
              along the Seine.
            </p>
            <h4>
              <i>Birthday party 2 June 2023</i>:
            </h4>
            <p>
              it will be exactly 50 years since the museum opened its doors to
              the public. We are celebrating 50 years of inspiration on
              Museumplein with a packed programme of activities. Paint like
              Vincent in the open air, listen to a musical performance or marvel
              at street theatre.
            </p>
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.vangoghmuseum.nl/en/visit/whats-on/50-years-of-inspiration"
          >
            <button className="section-button">Check it out</button>
          </a>
        </div>
      </div>

      <div className="louwman-section">
        <div className="event-sections-text">
          <div className="section-para" style={{ textAlign: "center" }}>
            <h4>Collection of automobiles </h4>
            <h3>in LOUWMAN MUSEUM</h3>
            <p>
              <i>1 January 2023 - 31 December 2023</i>
            </p>
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.louwmanmuseum.nl/en/exposition/always-on-display-masterpieces-of-mobility/"
          >
            <button className="section-button">Check it out</button>
          </a>
        </div>

        <img className="auto" src={auto} alt="auto" />
      </div>

      <div className="kunstmuseum-section">
        <img className="escher" src={escher} alt="escher" width={150} />

        <div className="event-sections-text">
          <div className="section-para">
            <h3>Escher - Other World</h3>
            <h4>
              <i>18 February 2023 - 10 September 2023</i>
            </h4>
            <p>
              Birds that become fish, water that flows uphill, two hands drawing
              each other: with consummate skill, M.C. Escher would transform a
              blank sheet of paper into his own infinite worlds where he would
              play with his viewers perception. His masterful metamorphoses and
              tessellations continue to amaze and inspire people all over the
              world.
            </p>
          </div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.kunstmuseum.nl/en/exhibitions/escher-other-world"
          >
            <button className="section-button">Check it out</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Events;
