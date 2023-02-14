import React from "react";
import { AiOutlineAim } from "react-icons/ai";

import { MdFeaturedPlayList } from "react-icons/md";
MdFeaturedPlayList;

const Goal = () => {
  return (
    <main>
      <img
        src="https://res.cloudinary.com/diyopzdxb/image/upload/v1676304771/cars-images/68592_fullimage_frans_hals_rendezvous_1360x430_0_m6jwb4.jpg"
        alt="contact with us"
      ></img>
      <div className="goalContainer">
        <div className="purpose">
          <h3>
            The Purpose of{" "}
            <span className="museumName">Find Museum Website</span>
          </h3>
          <p>And its Features</p>
        </div>

        <div className="message">
          <div className="icon objective">
            {" "}
            <AiOutlineAim size={70} />
          </div>
          <ul>
            <li>
              {" "}
              The website aims to provide information about the Museums and
              their collections in Netherlands.
            </li>
            <li>
              It aims also to promote and market Museums to the potential
              visitors.
            </li>
          </ul>
        </div>

        <div className="appFeatures">
          <div className="icon features">
            {" "}
            <MdFeaturedPlayList size={70} />
          </div>
          <ul>
            <li>
              The website enables visitors to{" "}
              <a href="#" className="focus">
                search for Museums{" "}
              </a>
              with different options including name, city, price, ...
            </li>
            <li>
              The website provides visitors with{" "}
              <a href="#" className="focus">
                upcoming events
              </a>{" "}
              in all Museums.
            </li>
            <li>
              The website provides visitors with{" "}
              <a href="#" className="focus">
                special offers
              </a>{" "}
              Museums.
            </li>
            <li>
              The website saves{" "}
              <a href="#" className="focus">
                favorite Museums
              </a>{" "}
              of visitors.
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
};
export default Goal;
