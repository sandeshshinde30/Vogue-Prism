import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Category() {
    const [sizeFilters, setSizeFilters] = useState([]);
    const [availabilityFilters, setAvailabilityFilters] = useState({});
    const [priceFilters, setPriceFilters] = useState({});
    const [colorFilters, setColorFilters] = useState({});
    const [products, setProducts] = useState([]); // State to store products
    const [loading, setLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(''); // Set default or selected category
    const [searchTerm, setSearchTerm] = useState(''); // State to hold the search term

    const navigate = useNavigate(); // Initialize useNavigate

    const fetchProducts = async () => {
        setLoading(true);
        const url = `https://vogue-backend-1.onrender.com/api/getProducts?category=${selectedCategory}&name=${searchTerm}`;
        console.log("Fetching from URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("Fetched products:", data); // Log fetched products
            setProducts(data); // Update products state with fetched data
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products when the component mounts or when selectedCategory or searchTerm changes
    }, [selectedCategory, searchTerm]);

    const handleSizeChange = (size) => {
        setSizeFilters((prev) => 
            prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
        );
    };

    const handleAvailabilityChange = (e) => {
        setAvailabilityFilters((prev) => ({
            ...prev,
            [e.target.id]: e.target.checked,
        }));
    };

    const handlePriceChange = (e) => {
        setPriceFilters((prev) => ({
            ...prev,
            [e.target.id]: e.target.checked,
        }));
    };

    const handleColorChange = (e) => {
        setColorFilters((prev) => ({
            ...prev,
            [e.target.id]: e.target.checked,
        }));
    };

    const handleProductClick = (productId) => {
        // Navigate to the product page with the productId
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
                                onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                            />
                        </div>
                    </div>
                </header>

                <div className="flex-col">
                    <div className="flex flex-wrap justify-center md:justify-start w-4/5">
                        {loading ? ( // Show loading indicator while fetching
                            <p>Loading...</p>
                        ) : products.length > 0 ? ( // Check if there are products
                            products.map((product) => (
                                <div className="flex-col m-3" key={product.id} onClick={() => handleProductClick(product._id)}> {/* Added click handler */}
                                    <div className="bg-green-50 h-80 w-64">
                                        <img 
                                            src={product.images[0]} 
                                            alt={product.name} 
                                            className="h-full w-full object-cover" 
                                            onError={(e) => { e.target.onerror = null; e.target.src="fallback-image.jpg"; }} // Fallback image on error
                                        /> 
                                    </div>
                                    <div className="flex w-64 h-auto justify-between mt-2">
                                        <h6 className="pl-1">{product.title}</h6> 
                                    </div>
                                    <h6 className="line-through text-sm">₹{product.mrp}</h6> 
                                    <div className="flex w-64 h-auto justify-between">
                                        <h6 className="font-bold">₹{product.price}</h6> 
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No products found</p> // Show a message if no products are returned
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
