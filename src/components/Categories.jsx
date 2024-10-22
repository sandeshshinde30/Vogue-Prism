import React from "react";

export default function Categories() {
    let categories = [
        { img: "4568144.webp", title: "Shirt" },
        { img: "4568147.webp", title: "Pants" },
        { img: "4568146.webp", title: "Jacket" },
        { img: "4568144.webp", title: "Shoes" },
        { img: "4568147.webp", title: "Hat" },
        { img: "4568146.webp", title: "Bags" },
        { img: "4568144.webp", title: "Accessories" },
        { img: "4568147.webp", title: "Watch" },
        { img: "4568147.webp", title: "Glasses" }
      ];

  return (
    <>
      <div id="cat" className="md:mt-20 mt-28">
        <div className="text-center">
          <h1 className="lg:text-4xl text-2xl font-bold text-dark-green tracking-[.25em]">
            CATEGORY</h1>
        </div>

        {/* Grid of Circles */}
        <div className="grid grid-cols-3  sm:grid-cols-2 md:grid-cols-5 md:gap-10 gap-2 justify-items-center md:mt-16 mt-10">
          {categories.map((category, index) => (
            <div className="flex flex-col justify-center items-center tracking-[.10em] font-semibold">

            <div
              key={index}
              className="bg-light-green md:w-40 md:h-40 md:m-0 m-4 flex justify-center items-center rounded-full overflow-hidden"
            >
              <img
                src={category.img}
                alt={category.title}
                className="object-cover w-full h-full"
              />
            </div>

            <h3 className="md:mt-5">{category.title}</h3>
            </div>
            
          ))}
        </div>
      </div>
    </>
  );
}
