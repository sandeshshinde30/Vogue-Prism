import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { BiSolidImageAdd } from "react-icons/bi";
import config from '../config';


export default function UpdateProductPage() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const category = [ 
    "Shirt",
    "T-Shirt",
    "Jeans",
    "Shorts",
    "Jackets",
    "Formals",
    "Kurtas",
    "Sports Wear",
    "Innerwear"];

    // Toggle dropdown visibility
    const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

    // Handle category selection
    const handleCategorySelect = (cat) => {
        setSelectedCategory(cat);
        setDropdownOpen(false);
    };

    // Handle product selection for update
    const handleSelect = (index) => {
        setSelectedProduct(products[index]);
        setIsUpdating(true);
    };

    // Reset to search view
    const handleBackToSearch = () => {
        setIsUpdating(false);
        setSelectedProduct(null);
    };

    // Fetch products based on selected category and search term
    const fetchProducts = async () => {
        setLoading(true);
        const url = `${config.BASE_URL}/api/getUpdateProducts?category=${selectedCategory}&name=${searchTerm}`;
        console.log("Fetching from URL:", url);
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    // Handle search submission
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchProducts();
    };

    // Call fetchProducts when selectedCategory or searchTerm changes
    useEffect(() => {
        if (selectedCategory || searchTerm) {
            fetchProducts();
        } else {
            setProducts([]);
        }
    }, [selectedCategory, searchTerm]);

    return (
        <div className="h-full w-full">
            {!isUpdating ? (
                <div>
                    <div className="w-full text-center mt-0 text-[18px] text-gray-700">
                        <h1 className="uppercase font-bold">Update collection</h1>
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

                    {/* Loading Spinner */}
                    {loading && <div className="text-center text-white">Loading...</div>}

                    {/* Product Grid with Scrollable Container */}
                    <div className="flex flex-col">
                        <div className="grid grid-cols-4 gap-5 lg:mx-10 mx-3 pb-5 overflow-y-auto max-h-[400px] scrollbar-thin scrollbar-thumb-dark-green">
                            {products.map((trend, index) => (
                                <div
                                    key={index}
                                    className="relative mt-5 flex-shrink-0 flex flex-col items-center group"
                                >
                                    {/* Image Container */}
                                    <div className="bg-dark-green rounded-md relative">
                                        <img src={trend.img} alt={trend.title} className="lg:h-60 h-48" />
                                        {/* Update Button - Visible on Hover */}
                                        <button
                                            className="absolute top-2 right-2 bg-yellow-600 text-white text-sm px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            onClick={() => handleSelect(index)}
                                        >
                                            Update
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
                    </div>
                </div>
            ) : (
                <UpdateProduct product={selectedProduct} onBack={handleBackToSearch} />
            )}
        </div>
    );
}

function UpdateProduct({ product, onBack }) {
    const [title, setTitle] = useState(product?.title || '');
    const [description, setDescription] = useState(product?.description || '');
    const [mrp, setMrp] = useState(product?.mrp || '');
    const [price, setPrice] = useState(product?.price || '');
    const [sizes, setSizes] = useState(product?.sizes || []);
    const [selectedSize, setSelectedSize] = useState('');
    const [colors, setColors] = useState(product?.colors || []);
    const [selectedColor, setSelectedColor] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [images, setImages] = useState(product?.images || []);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(product.category || '');

    const categories = [
    "Shirt",
    "T-Shirt",
    "Jeans",
    "Shorts",
    "Jackets",
    "Formals",
    "Kurtas",
    "Sports Wear",
    "Innerwear"]; // Replace with your actual categories

    // Define the handleCategoryChange function
    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    
    const handleAddSize = () => {
        if (selectedSize && !sizes.includes(selectedSize)) {
            setSizes([...sizes, selectedSize]);
            setSelectedSize('');
        }
    };

    const handleAddColor = () => {
        if (selectedColor && !colors.includes(selectedColor)) {
            setColors([...colors, selectedColor]);
            setSelectedColor('');
            setShowPicker(false);
        }
    };

    const handleDeleteImage = (index) => {
        const newImages = images.filter((_, imgIndex) => imgIndex !== index);
        setImages(newImages);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const handleSubmit = async () => {
        // Prepare data to send to the server
        const updatedProduct = {
            title,
            description,
            mrp,
            price,
            sizes,
            colors,
            images: []
        };
    
        // Check and upload images to Cloudinary
        for (const img of images) {
            if (img.startsWith('blob:')) { // Check if the image is a local file
                const imageFile = await fetch(img).then(res => res.blob()); // Fetch the blob
                const uploadedUrl = await uploadImageToCloudinary(imageFile); // Upload and get the URL
                updatedProduct.images.push(uploadedUrl);
            } else {
                updatedProduct.images.push(img); // If already uploaded, just push the URL
            }
        }
    
        try {
            const response = await fetch(`${config.BASE_URL}/api/updateProducts/${product._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProduct),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update product'); // Throw an error if the response is not OK
            }
    
            alert('Product updated successfully!'); // Confirmation message
            onBack(); // Optionally navigate back or reset state
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product.');
        }
    };
    
    // Function to upload an image to Cloudinary
    const uploadImageToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', 'vogue_prism'); // Replace with your upload preset
    
        const response = await fetch('https://api.cloudinary.com/v1_1/dldrjl92a/image/upload', {
            method: 'POST',
            body: formData,
        });
    
        if (!response.ok) {
            throw new Error('Failed to upload image to Cloudinary');
        }
    
        const data = await response.json();
        return data.secure_url; // Return the URL of the uploaded image
    };
    
    

    return (
        <div className="h-full w-full max-h-[calc(100vh-100px)] overflow-y-auto">
        <div className="w-full text-center text-[18px] text-gray-700">
            <h1 className="uppercase font-bold">Update Collection</h1>
        </div>
        <button onClick={onBack} className="ml-5 text-white bg-dark-green px-3 py-1 underline mt-2 rounded-lg">Back to Search</button>
        
        <div className="flex h-auto">
            {/* Left Container for Base Information and Details */}
            <div className="flex flex-col w-1/2 border-r-2 border-light-green max-h-[calc(100vh-100px)] overflow-y-auto">
                {/* Base Information Section */}
                <div className="px-5">
                    <h1 className="font-semibold">Base Information</h1>
                    <div className="mt-4 gap-4 flex flex-col py-2 bg-white rounded-lg">
                        <div className="w-full px-4 flex flex-col gap-2">
                            <h2 className="text-sm">Title</h2>
                            <input
                                type="text"
                                className="w-full bg-dark-green rounded-md h-7 text-white pl-2 placeholder-white"
                                placeholder="Enter Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)} 
                            />
                        </div>
                        <div className="w-full px-4 flex flex-col gap-2">
                            <h2 className="text-sm">Description</h2>
                            <textarea
                                className="w-full bg-dark-green rounded-md h-24 pl-2 pt-2 text-white placeholder-white resize-none"
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)} 
                            ></textarea>
                        </div>
                    </div>
                </div>
    
                <div className="h-[2px] mt-2 bg-light-green w-full"></div>
    
                {/* Details Section */}
                <div className="flex px-5 pt-2 w-full gap-2">
                    <div className="w-[33%]">
                        <h1 className="font-semibold">Details</h1>
                        <div className="w-full mt-2 bg-white p-4 rounded-md flex flex-col gap-2">
                            <h1>MRP</h1>
                            <input
                                type="number"
                                className="w-full bg-dark-green rounded-md h-7 text-white pl-2 text-center placeholder-white"
                                placeholder="Enter MRP"
                                value={mrp}
                                onChange={(e) => setMrp(e.target.value)} 
                            />
                            <h1>Actual Price</h1>
                            <input
                                type="number"
                                className="w-full bg-dark-green rounded-md h-7 text-white pl-2 text-center placeholder-white"
                                placeholder="Enter Price"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)} 
                            />
                        </div>
                    </div>
    
                    <div className="w-[2px] mt-3 bg-light-green h-full"></div>
    
                    <div className="w-[66%] px-2 ">
                        <div className="w-full bg-white p-4 rounded-md flex gap-2">
                            <select
                                value={selectedSize}
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="w-full bg-darker-green rounded-md h-7 text-white pl-2 text-center"
                            >
                                <option value="">Select Size</option>
                                <option value="SM">SM</option>
                                <option value="MD">MD</option>
                                <option value="LG">LG</option>
                                <option value="XL">XL</option>
                            </select>
                            <button
                                onClick={handleAddSize}
                                className="bg-dark-green text-white px-2 rounded-md w-28"
                            >
                                ADD
                            </button>
                        </div>
    
                        <div className="mt-2">
                            <h1 className="font-semibold">Added Sizes</h1>
                            <div className="flex flex-wrap gap-2">
                                {sizes.map((size, index) => (
                                    <div key={index} className="text-center text-white rounded-md bg-dark-green px-2 py-1">
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
    
                        <div>
                            <div className="mt-2">
                                <h1 className="font-semibold">Color</h1>
                                <div className="w-full bg-white p-4 rounded-md flex gap-2">
                                    <div
                                        className="w-8 h-8 rounded-full cursor-pointer border-2"
                                        style={{ backgroundColor: selectedColor, borderColor: "#000" }}
                                        onClick={() => setShowPicker(!showPicker)}
                                    />
                                    <button
                                        onClick={handleAddColor}
                                        className="bg-dark-green text-white px-2 rounded-md w-28"
                                    >
                                        ADD
                                    </button>
                                </div>
                                {showPicker && (
                                    <div className="relative z-10">
                                        <SketchPicker
                                            color={selectedColor}
                                            onChangeComplete={(color) => setSelectedColor(color.hex)}
                                        />
                                    </div>
                                )}
                                <div className="grid grid-cols-4 gap-2 px-5 mt-2">
                                    {colors.map((color, index) => (
                                        <div key={index} className="w-full h-10 rounded-md" style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    
            {/* Right Container for Images Section */}
            <div className="flex flex-col px-5 mt-2 w-1/2">
                <div className="mt-4">
                    <label htmlFor="category" className="mb-2 font-bold">Select Category</label>
                    <select     
                        id="category"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full border rounded p-2 bg-dark-green text-white"
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
    
                <h1 className="font-semibold mt-3">Pictures</h1>
                <div className="bg-white mt-3 rounded-lg">
                    <div className="grid grid-cols-3 gap-3 p-5">
                        {/* Displaying uploaded images */}
                        {images.map((imgSrc, index) => (
                            <div
                                key={index}
                                className="relative bg-dark-green rounded-md hover:shadow-lg transition-shadow"
                                onMouseEnter={() => setHoveredIndex(index)} // Set hovered index on mouse enter
                                onMouseLeave={() => setHoveredIndex(null)} // Clear hovered index on mouse leave
                            >
                                <img src={imgSrc} alt={`Uploaded Preview ${index}`} className="w-full h-24 object-contain rounded-md" />
                                {/* Delete button shown on hover */}
                                {hoveredIndex === index && (
                                    <button
                                        onClick={() => handleDeleteImage(index)}
                                        className="absolute top-1 right-1 text-red-500 bg-red-200 w-12"
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                        {/* File Input for uploading new images */}
                        <label className="flex flex-col items-center justify-center w-full h-24 bg-darker-green border-2 border-solid border-light-gray rounded-md cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleImageChange}
                            />
                            <BiSolidImageAdd className="text-4xl text-white" />
                            <span className="text-white">Select Images</span>
                        </label>
                    </div>
                </div>
    
                {/* Update Button */}
                <button
                    onClick={handleSubmit}
                    className="bg-dark-green text-white mt-5 px-4 py-2 rounded-md"
                >
                    Update Product
                </button>
            </div>
        </div>
    </div>
    
    );
}
