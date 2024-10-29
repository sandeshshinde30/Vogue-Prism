import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Ensure this import
import config from '../config';

const Trending = () => {
    const [trendingProducts, setTrendingProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); // Use inside the component

    useEffect(() => {
        const fetchTrendingProducts = async () => {
            try {
                const response = await fetch(`${config.BASE_URL}/api/getTrendingProducts`);
                if (!response.ok) {
                    throw new Error("Failed to fetch trending products.");
                }
                const data = await response.json();
                setTrendingProducts(data);
            } catch (error) {
                console.error("Error fetching trending products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrendingProducts();
    }, []);

    if (loading) return <p className="text-center mt-20">Loading...</p>;

    const handleProductClick = (id) => {
        navigate(`/product/${id}`); 
    };


    return (
        <div className="mt-20 mb-20 flex flex-col">
            <div className="text-center">
                <h1 className="lg:text-4xl text-2xl font-bold text-dark-green tracking-[.25em]">
                    TRENDING
                </h1>
            </div>
            <div className="flex overflow-x-auto gap-5 lg:mx-10 mx-3 pb-5">
                {trendingProducts.map((trend, index) => (
                    <div onClick={() => handleProductClick(trend._id)} key={index} className="mt-10 cursor-pointer flex-shrink-0 lg:flex-shrink lg:w-full w-2/5 flex flex-col justify-center items-start text-left">
                        <div className="p-3 bg-[#E1DFDD] rounded-md w-full h-auto lg:self-center flex justify-center items-center overflow-hidden">
                            <img src={trend.img} alt={trend.title} className="lg:h-48 h-32" />
                        </div>
                        <div className="flex flex-col text-left items-start pt-3">
                            <p className="lg:text-sm text-[12px]">{trend.title}</p>
                            <p className="text-darker-green font-extrabold lg:text-[18px] text-[12px]">
                                Rs. {trend.price}
                            </p>
                        </div>
                    </div>
                ))}
                <button
                    onClick={() => navigate("/category?category=trending")}
                    className="flex-shrink-0 text-[12px] border text-white border-gray-400 py-3 px-6 mt-10 tracking-wider bg-dark-green hover:bg-darker-green w-auto rounded-xl self-center lg:hidden"
                >
                    View All
                </button>
            </div>
            <button
                onClick={() => navigate("/category?category=trending")}
                className="hidden lg:flex lg:text-1xl text-1xl border text-white border-gray-400 py-3 lg:px-8 px-4 mt-5 tracking-wider bg-dark-green hover:bg-darker-green w-auto rounded-xl self-center"
            >
                View All
            </button>
        </div>
    );
};

export default Trending;
