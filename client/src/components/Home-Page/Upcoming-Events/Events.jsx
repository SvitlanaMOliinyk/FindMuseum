import React from "react";
import { Link } from "react-router-dom";
import "./events.css";
import sunflowers from "../../../assets/img/van-gogh-museum.jpeg";
import auto from "../../../assets/img/louwman-museum.jpeg";
import escher from "../../../assets/img/kunstmuseum.jpeg";

const Events = () => {
  return (
    <section className="upcoming-events">
      <div className="offers-section">
        <div className="offers-text">
          <p>Still looking for something interesting?</p>
          <p>You can learn more about special museums offers</p>
        </div>
        <Link to="offers" className="offers-link">
          <button className="offers-button">Check it out</button>
        </Link>
      </div>

      <div className="van-gogh-section">
        <div className="image-section-container">
          <img
            className="sunflowers"
            src={sunflowers}
            alt="sunflowers"
            width={150}
          />
        </div>
        <div className="event-sections-text">
          <div className="section-para">
            <p>
              The Van Gogh Museum celebrates 50 years of inspiration. Read on
              for the complete anniversary programme.
            </p>

            <p>
              During this special year, we will be pulling out all the stops
              with exhibitions that bring you closer to Van Gogh as an artist
              and a person.
            </p>
            <p>
              <i>10 February 2023 - 10 April 2023</i>:
            </p>
            <p>
              get to know the family behind Vincent van Gogh in the exhibition
              Choosing Vincent.
            </p>
          </div>
          <a href="https://www.vangoghmuseum.nl/en/visit/whats-on/50-years-of-inspiration">
            <button className="section-button">Check it out</button>
          </a>
        </div>
      </div>

      <div className="louwman-section">
        <div className="event-sections-text">
          <div className="section-para">
            <h3>Collection of automobiles </h3>
            <h1>in LOUWMAN MUSEUM</h1>
            <h3>
              <i>1 January 2023 - 31 December 2023</i>
            </h3>
          </div>
          <a href="https://www.louwmanmuseum.nl/en/exposition/always-on-display-masterpieces-of-mobility/">
            <button className="section-button">Check it out</button>
          </a>
        </div>
        <div className="image-section-container">
          <img className="auto" src={auto} alt="auto" width={150} />
        </div>
      </div>

      <div className="kunstmuseum-section">
        <div className="image-section-container">
          <img className="escher" src={escher} alt="escher" width={150} />
        </div>
        <div className="event-sections-text">
          <div className="section-para">
            <h3>
              <i>18 February 2023 - 10 September 2023</i>
            </h3>
            <h1>Escher - Other World</h1>
            <p>
              Birds that become fish, water that flows uphill, two hands drawing
              each other: with consummate skill, M.C. Escher would transform a
              blank sheet of paper into his own infinite worlds where he would
              play with his viewers perception. His masterful metamorphoses and
              tessellations continue to amaze and inspire people all over the
              world.
            </p>
          </div>
          <a href="https://www.kunstmuseum.nl/en/exhibitions/escher-other-world">
            <button className="section-button">Check it out</button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Events;
