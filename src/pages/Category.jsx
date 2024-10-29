import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; 

export default function Category() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const location = useLocation(); // Get current location to access query params

    const queryParams = new URLSearchParams(location.search);
    const selectedCategory = queryParams.get('category'); // Check if category is 'recent'

    const fetchProducts = async () => {
        setLoading(true);
        const url = selectedCategory === 'recent'
            ? "http://localhost:3001/api/getRecentProducts"
            : selectedCategory === 'trending'
            ? "http://localhost:3001/api/getTrendingProducts"
            : `http://localhost:3001/api/getProducts?category=${selectedCategory}&name=${searchTerm}`;
    
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch products.");
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchProducts(); // Fetch products on category or search change
    }, [selectedCategory, searchTerm]);

    const handleProductClick = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="flex">
            <main className="h-screen w-full bg-white ml-14 mt-3">
                <header className="h-32 w-full bg-white flex">
                    <div className="h-32 w-1/4 bg-white p-2">
                        <div className="flex-col">
                            <nav className="flex">
                                <h6 className="cursor-pointer">Home</h6>
                                <h6 className="pl-2">/</h6>
                                <h6 className="cursor-pointer pl-2">Product</h6>
                            </nav>
                            <h3 className="text-3xl font-bold mt-1">PRODUCTS</h3>
                            <input
                                type="search"
                                placeholder="Search"
                                className="border-2 border-gray-300 p-2 w-full bg-gray-100 mt-1"
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </header>

                <div className="flex-col">
                    <div className="flex flex-wrap justify-center w-full">
                        {loading ? (
                            <p>Loading...</p>
                        ) : products.length > 0 ? (
                            products.map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleProductClick(product._id)}
                                    className="flex-col m-3"
                                >
                                    <div className="bg-green-50 h-80 w-64">
                                        <img
                                            src={product.images[0]}
                                            alt={product.name}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = "fallback-image.jpg";
                                            }}
                                        />
                                    </div>
                                    <div className="flex justify-between mt-2">
                                        <h6>{product.title}</h6>
                                    </div>
                                    <h6 className="line-through text-sm">₹{product.mrp}</h6>
                                    <h6 className="font-bold">₹{product.price}</h6>
                                </div>
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
