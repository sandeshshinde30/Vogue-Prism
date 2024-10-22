import React, { useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { SketchPicker } from "react-color";

export default function AddProduct() {
    const [images, setImages] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [mrp, setMrp] = useState("");
    const [price, setPrice] = useState("");
    const [sizes, setAddedSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState("");
    const [colors, setAddedColors] = useState([]);
    const [selectedColor, setSelectedColor] = useState("#ffffff");
    const [showPicker, setShowPicker] = useState(false);
    const [loading, setLoading] = useState(false); // New state for loading
    const [selectedCategory, setSelectedCategory] = useState("");

    const categories = ["Clothing", "Footwear", "Accessories", "Jewelry"];

    const handleAddSize = () => {
        if (selectedSize && !sizes.includes(selectedSize)) {
            setAddedSizes((prevSizes) => [...prevSizes, selectedSize]);
            setSelectedSize("");
        }
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleAddColor = () => {
        if (selectedColor && !colors.includes(selectedColor)) {
            setAddedColors((prevColors) => [...prevColors, selectedColor]);
            setSelectedColor("#ffffff");
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

    const handleUploadImages = async () => {
        const uploadedImageUrls = [];
        setLoading(true);

        for (const imgSrc of images) {
            // Convert the object URL back to a File
            const response = await fetch(imgSrc);
            const blob = await response.blob();
            const file = new File([blob], "image.png", { type: 'image/png' });

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'vogue_prism');

            try {
                const uploadResponse = await fetch("https://api.cloudinary.com/v1_1/dldrjl92a/image/upload", {
                    method: 'POST',
                    body: formData
                });

                if (uploadResponse.ok) {
                    const data = await uploadResponse.json();
                    uploadedImageUrls.push(data.secure_url);
                } else {
                    console.error('Upload failed:', uploadResponse.statusText);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        setLoading(false);
        return uploadedImageUrls;
    };

    const handleSubmit = async () => {
        const uploadedImages = await handleUploadImages();
    
        const productData = {
            title,
            description,
            mrp: parseFloat(mrp),
            price: parseFloat(price),
            sizes,
            colors,
            category: selectedCategory, // Add selected category here
            images: uploadedImages
        };
    
        console.log('Product Data:', productData);
    
        try {
            const response = await fetch('https://vogue-backend-1.onrender.com/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productData)
            });
    
            if (response.ok) {
                alert('Product added successfully!');
                setTitle("");
                setDescription("");
                setMrp("");
                setPrice("");
                setAddedSizes([]);
                setAddedColors([]);
                setImages([]);
                setSelectedCategory(""); // Reset selected category after submission
            } else {
                alert('Failed to add product.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error adding product.');
        }
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
                                        {colors.map((color, index) => (
                                            <div key={index} className="w-full h-10 rounded-md" style={{ backgroundColor: color }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pictures Section */}
                <div className="flex flex-col px-5 mt-2 w-1/2">
               
                <div className="mt-4">
                    <label htmlFor="category" className=" mb-2  font-bold">Select Category</label>
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
                    {/* Submit Button */}
            <button
                onClick={handleSubmit}
                className="mt-4 mb-2 w-full h-12 bg-dark-green text-white font-semibold rounded-lg hover:bg-darker-green transition-colors"
            >
                ADD PRODUCT
            </button>
                </div>
            </div>

            
           

        </div>
    );
}
