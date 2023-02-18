import React from "react";
import "./background.css";
import { useState, useRef, useEffect } from "react";

import t1 from "../../assets/museums/t1.jpeg";
import t2 from "../../assets/museums/t2.jpeg";
import t5 from "../../assets/museums/t5.jpeg";
import t4 from "../../assets/museums/t4.jpeg";

export default function Background() {
  const images = [t1, t2, t5, t4];
  const [currentSlide, setCurrentSlide] = useState(0);
  // useRef does not cause a re-render
  let sliderInterval = useRef();
  let switchImages = () => {
    if (currentSlide < images.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setCurrentSlide(0);
    }
  };
  useEffect(() => {
    sliderInterval = setInterval(() => {
      switchImages();
    }, 5000);
    return () => {
      clearInterval(sliderInterval);
    };
  });

  return (
    <>
      <div className="imgWrapper">
        {images?.map((img, index) => {
          return (
            <img
              key={img}
              alt=""
              src={img}
              className={
                index === currentSlide ? "imageActive homeImage" : "image"
              }
            />
          );
        })}
      </div>
    </>
  );
}
