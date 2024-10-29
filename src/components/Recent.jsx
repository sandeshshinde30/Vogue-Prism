import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; 

export default function Recent() {
    const [recentProducts, setRecentProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchRecentProducts = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/getRecentProducts");
                if (!response.ok) {
                    throw new Error("Failed to fetch recent products.");
                }
                const data = await response.json();
                setRecentProducts(data);
            } catch (error) {
                console.error("Error fetching recent products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentProducts();
    }, []);

    if (loading) {
        return <p className="text-center mt-20">Loading...</p>;
    }

    const handleProductClick = (id) => {
        navigate(`/product/${id}`); 
    };

    const handleViewAll = () => {
        navigate("/category?category=recent");  // Navigate with query parameter
    };

    return (
        <div className="mt-28 mb-20 flex flex-col">
            <div className="text-center">
                <h1 className="lg:text-4xl text-2xl font-bold text-dark-green tracking-[.25em]">
                    RECENT
                </h1>
            </div>
            <div className="flex overflow-x-auto gap-5 lg:mx-10 mx-3 pb-5">
                {recentProducts.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => handleProductClick(product._id)}
                        className="cursor-pointer mt-10 flex-shrink-0 lg:flex-shrink lg:w-full w-2/5 flex flex-col justify-center items-start text-left"
                    >
                        <div className="p-3 bg-[#E1DFDD] rounded-md w-full h-auto lg:self-center flex justify-center items-center overflow-hidden">
                            <img
                                src={product.img}
                                alt={product.title}
                                className="lg:h-48 h-48"
                            />
                        </div>
                        <div className="flex flex-col text-left items-start pt-3">
                            <p className="lg:text-sm text-[12px]">{product.title}</p>
                            <p className="text-darker-green font-extrabold lg:text-[18px] text-[12px]">
                                Rs. {product.price}
                            </p>
                        </div>
                    </div>
                ))}
                <button
                    onClick={handleViewAll}  // Handle View All click
                    className="flex-shrink-0 text-[12px] border text-white border-gray-400 py-3 px-6 mt-10 tracking-wider bg-dark-green hover:bg-darker-green w-auto rounded-xl self-center lg:hidden"
                >
                    View All
                </button>
            </div>

            <button
                onClick={handleViewAll}  // Handle View All click
                className="hidden lg:flex lg:text-1xl text-1xl border text-white border-gray-400 py-3 lg:px-8 px-4 mt-5 tracking-wider bg-dark-green hover:bg-darker-green w-auto rounded-xl self-center"
            >
                View All
            </button>
        </div>
    );
}
