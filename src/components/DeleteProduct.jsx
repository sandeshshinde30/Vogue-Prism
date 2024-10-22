import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

export default function DeleteProduct() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); // State for search term
    const [products, setProducts] = useState([]); // State for fetched products
    const [loading, setLoading] = useState(false); // State for loading status

    const category = ["Shirt", "T-shirt", "Jeans", "Formals", "Clothing"];

    // Toggle dropdown visibility
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    // Handle category selection
    const handleCategorySelect = (cat) => {
        setSelectedCategory(cat);
        setDropdownOpen(false); // Close dropdown on selection
    };

    // Fetch products based on selected category and search term
    const fetchProducts = async () => {
        setLoading(true);
        const url = `http://13.127.31.26:4000/api/getProducts?category=${selectedCategory}&name=${searchTerm}`;
        console.log("Fetching from URL:", url); // Log the URL
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data); // Update products state with fetched data
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Call fetchProducts when selectedCategory or searchTerm changes
    useEffect(() => {
        if (selectedCategory || searchTerm) {
            fetchProducts();
        } else {
            setProducts([]); // Reset products if no category or search term is set
        }
    }, [selectedCategory, searchTerm]);

   // Handle product deletion with confirmation
const handleDelete = async (productId) => {
    if (!productId) {
        console.error('No product ID provided for deletion');
        return; // Exit the function if no ID is given
    }
    
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
        try {
            console.log("Deleting product with ID:", productId); // Log the product ID
            const response = await fetch(`http://13.127.31.26:4000/api/deleteProduct/${productId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete the product');
            }

            fetchProducts();

            // Remove product from local state
            const updatedProducts = products.filter(product => product.id !== productId);
            setProducts(updatedProducts);
            console.log("Product deleted successfully");
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }
};


    return (
        <div className="h-full w-full">
            <div className="w-full text-center mt-0 text-[18px] text-gray-700">
                <h1 className="uppercase font-bold">Delete Collection</h1>
            </div>

            <div className="flex h-auto mt-2 px-10 py-5 gap-10">
                {/* Dropdown Button */}
                <button
                    id="dropdownDefaultButton"
                    onClick={toggleDropdown}
                    className="text-white bg-dark-green hover:bg-darker-green focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
                    type="button"
                >
                    {selectedCategory || "Select Category"}
                    <svg
                        className="w-3 h-3 ml-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 4 4 4-4"
                        />
                    </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div
                        id="dropdown"
                        className="z-10 bg-dark-green divide-y divide-gray-600 rounded-lg shadow w-44 absolute mt-12"
                    >
                        <ul className="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
                            {category.map((cat) => (
                                <li key={cat}>
                                    <button
                                        className="block w-full text-left px-4 py-2 hover:bg-green-600"
                                        onClick={() => handleCategorySelect(cat)}
                                    >
                                        {cat}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Search Bar */}
                <div className="flex items-center w-64 bg-dark-green rounded-lg px-3">
                    <FaSearch size={20} className="text-white" />
                    <input
                        type="text"
                        className="w-full bg-transparent text-white placeholder-white outline-none ml-2 h-10"
                        placeholder="Search Name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update search term
                    />
                </div>
            </div>

            {/* Product Grid with Scrollable Container */}
            <div className="flex flex-col">
                {loading ? (
                    <p className="text-white text-center">Loading...</p>
                ) : (
                    <div
                        className="grid grid-cols-4 gap-5 lg:mx-10 mx-3 pb-5 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-dark-green"
                    >
                        {products.map((trend) => (
                            <div
                                key={trend.id} // Use product's unique identifier
                                className="relative mt-5 flex-shrink-0 flex flex-col items-center group"
                            >
                                {/* Image Container */}
                                <div className="bg-dark-green rounded-md relative">
                                    <img src={trend.img} alt={trend.title} className="lg:h-60 h-48" />

                                    {/* Delete Button - Visible on Hover */}
                                    <button
                                        className="absolute top-2 right-2 bg-red-600 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                        onClick={() => handleDelete(trend._id)} // Pass product's ID
                                    >
                                        Delete
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="flex flex-col items-center pt-3">
                                    <p className="lg:text-sm text-[12px]">{trend.title}</p>
                                    <p className="text-darker-green font-extrabold lg:text-[18px] text-[12px]">
                                        Rs. {trend.price}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
