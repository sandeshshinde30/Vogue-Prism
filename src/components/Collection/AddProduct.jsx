import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiSolidImageAdd } from "react-icons/bi";
import { SketchPicker } from "react-color";

export default function AddProduct() {
    const [images, setImages] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null); // Track which image is being hovered

    const [selectedSize, setSelectedSize] = useState("");
    const [addedSizes, setAddedSizes] = useState([]);
    const [selectedColor, setSelectedColor] = useState("#ffffff"); // Default color
    const [addedColors, setAddedColors] = useState([]);
    const [showPicker, setShowPicker] = useState(false);

    const handleAddSize = () => {
        if (selectedSize && !addedSizes.includes(selectedSize)) {
            setAddedSizes((prevSizes) => [...prevSizes, selectedSize]);
            setSelectedSize(""); // Clear the dropdown after adding
        }
    };

    const handleAddColor = () => {
        if (selectedColor && !addedColors.includes(selectedColor)) {
            setAddedColors((prevColors) => [...prevColors, selectedColor]);
            setSelectedColor("#ffffff"); // Reset to default color after adding
        }
    };

    const handleImageChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const newImages = selectedFiles.map((file) => URL.createObjectURL(file));
        setImages((prevImages) => prevImages.concat(newImages));
        event.target.value = ""; // Clear the input after selecting
    };

    const handleDeleteImage = (index) => {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="h-full w-full max-h-[calc(100vh-100px)] overflow-y-auto">
            <div className="w-full text-center text-[18px] text-gray-700">
                <h1 className="uppercase font-bold">Add New Collection</h1>
            </div>

            <div className="flex h-auto">
                {/* Container with max height and overflow for scrolling */}
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
                                />
                            </div>
                            <div className="w-full px-4 flex flex-col gap-2">
                                <h2 className="text-sm">Description</h2>
                                <textarea
                                    className="w-full bg-dark-green rounded-md h-24 pl-2 pt-2 text-white placeholder-white resize-none"
                                    placeholder="Enter Description"
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
                                />
                                <h1>Actual Price</h1>
                                <input
                                    type="number"
                                    className="w-full bg-dark-green rounded-md h-7 text-white pl-2 text-center placeholder-white"
                                    placeholder="Enter Price"
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
                                    {addedSizes.map((size, index) => (
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
                                        {/* Color Picker Button */}
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

                                    {/* Color Picker Component */}
                                    {showPicker && (
                                        <div className="relative z-10">
                                            <SketchPicker
                                                color={selectedColor}
                                                onChangeComplete={(color) => setSelectedColor(color.hex)}
                                            />
                                        </div>
                                    )}

                                    {/* Display Added Colors */}
                                    <div className="grid grid-cols-4 gap-2 px-5 mt-2">
                                        {addedColors.map((color, index) => (
                                            <div
                                                key={index}
                                                className="w-full h-10 rounded-md"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pictures Section */}
                <div className="flex flex-col px-5 mt-2 w-1/2">
                    <h1 className="font-semibold">Pictures</h1>
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
                                    <img src={imgSrc} alt={`Uploaded preview ${index}`} className="h-full w-full object-cover" />
                                    {hoveredIndex === index && ( // Show delete button on hover
                                        <button
                                            onClick={() => handleDeleteImage(index)} // Delete image on button click
                                            className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}
                            {/* Image upload button */}
                            <div className="flex bg-dark-green rounded-md">
                                <label htmlFor="image-upload" className="h-full w-full p-7 flex items-center justify-center cursor-pointer">
                                    <BiSolidImageAdd className="text-white" />
                                </label>
                                <input
                                    id="image-upload"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                    multiple
                                />
                            </div>
                        </div>
                    </div>
                    <button className="w-full mt-8 font-extrabold bg-dark-green rounded-lg text-white h-8">ADD</button>
                </div>
            </div>
        </div>
    );
}
