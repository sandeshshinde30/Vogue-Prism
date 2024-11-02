import React, { useState } from "react";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";

export default function ProductCarousel({ slides }) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  

  return (
    <div className="relative overflow-hidden lg:w-[50%] w-[100%] h-full  flex items-center">
      <div
        className="flex transition-transform ease-out duration-1000"
        style={{
          transform: `translateX(-${current * 100}%)`,
          width: `${slides.length * 100}%`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full flex justify-center items-center flex-shrink-0"
          >
            <img
              src={slide}
              alt={`Slide ${index}`}
              className="w-full object-cover h-full"
            />
          </div>
        ))}
      </div>

      <div className="hidden absolute bottom-4 left-1/2 -translate-x-1/2 md:flex gap-16 text-4xl">
        <button onClick={previousSlide}>
          <FaArrowCircleLeft className="opacity-80 text-darker-green" />
        </button>
        <button onClick={nextSlide}>
          <FaArrowCircleRight className="opacity-80 text-darker-green" />
        </button>
      </div>

      <div className="md:hidden absolute top-0 left-0 w-full h-full flex justify-between items-center px-5 text-dark-green text-4xl">
        <button onClick={previousSlide}>
          <FaArrowCircleLeft className="opacity-80"/>
        </button>
        <button onClick={nextSlide}>
          <FaArrowCircleRight className="opacity-80"/>
        </button>
      </div>
    </div>
  );
}
