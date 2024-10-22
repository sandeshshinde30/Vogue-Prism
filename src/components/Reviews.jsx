import React from "react";
import { HiMiniUserCircle, HiStar } from "react-icons/hi2";

export default function Reviews() {

  const reviews = [
    {
      id: 1,
      user: "User 1",
      rating: 5,
      text: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, magnam similique? Debitis tenetur numquam laborum!, Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, magnam similique? Debitis tenetur numquam laborum!",
      img: "boy.png", 
    },
    {
      id: 2,
      user: "User 2",
      rating: 4,
      text: "Debitis iste, mollitia illum impedit, ad error quisquam ex iure saepe consequuntur libero, nulla delectus? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, magnam similique? Debitis tenetur numquam ahkjhdakjd jadkjdksajsd laborum!",
      img: "boy.png", 
    },
    {
      id: 3,
      user: "User 3",
      rating: 5,
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam similique? Debitis tenetur numquam laborum!Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, magnam similique? Debitis tenetur numquam laborum!",
      img: "boy.png", 
    },
  ];


  return (
    <>
      <div id="rew" className="mt-20 mb-20">
        <div className="text-center">
          <h1 className="lg:text-4xl text-2xl font-bold text-dark-green tracking-[.25em]">
            REVIEWS
          </h1>
        </div>


        <div className="flex lg:flex-row flex-col justify-center items-center lg:gap-10 gap-20 mt-24 lg:mx-20 mx-16">
          {reviews.map((review,index) => (
            <div
              key={review.id}
              className={`relative flex flex-col lg:w-2/6  h-86 rounded-xl items-center ${
                index === 1 ? "bg-darker-green" : "bg-gray-300"
              }`}
            >
              <div className="absolute -top-16">
                <img src={review.img} alt="" className="h-32" />
              </div>
              <div className={`flex  pt-20
              ${
                index === 1 ? "text-white" : "text-darker-green"
              }
              `}>

                {Array.from({ length: review.rating }).map((_, index) => (
                  <HiStar key={index} size={32} />
                ))}
              </div>
              <p className={`px-10 py-6 text-justify
              ${
                index === 1 ? "text-white" : "text-darker-green"
              }`}>{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
