import React from "react";
import { useNavigate } from "react-router-dom";

export default function Categories() {
    const navigate = useNavigate();

    const categories = [
        { img: "/category/Shirt.png", title: "Shirt" },
        { img: "/category/Jeans.png", title: "Jeans" },
        { img: "/category/T-Shirt.png", title: "T-Shirt" },
        { img: "/category/Short.png", title: "Shorts" },
        { img: "/category/Jacket.png", title: "Jackets" },
        { img: "/category/Formal.png", title: "Formals" },
    ];

    const handleCategoryClick = (categoryTitle) => {
      navigate(`/category?category=${categoryTitle}`);
  };

    return (
        <div id="cat" className="md:mt-20 mt-28 lg:mx-32">
            <div className="text-center">
                <h1 className="lg:text-4xl text-2xl font-bold text-dark-green tracking-[.25em]">
                    CATEGORY
                </h1>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-5 md:gap-10 gap-2 justify-items-center md:mt-16 mt-10">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        onClick={() => handleCategoryClick(category.title)}
                        className="flex flex-col justify-center items-center tracking-[.10em] font-semibold cursor-pointer"
                    >
                        <div
                            className="bg-white md:w-40 md:h-40 md:m-0 m-4 flex justify-center items-center rounded-full border-dark-green border-[0px] overflow-hidden"
                        >
                            <img
                                src={category.img}
                                alt={category.title}
                                className="w-full h-full object-contain p-3"
                            />
                        </div>
                        <h3 className="md:mt-5">{category.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
