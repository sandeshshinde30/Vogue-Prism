import React, { useState, useEffect } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

export default function Offers() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [hovering, setHovering] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploadedUrl, setUploadedUrl] = useState(null);
    const [apiMessage, setApiMessage] = useState('');
    const [offers, setOffers] = useState([]); 
    const [deletingOffer, setDeletingOffer] = useState(null); // Store offer being deleted

    // Fetch offers from backend
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/offers");
                if (response.ok) {
                    const data = await response.json();
                    setOffers(data);
                } else {
                    console.error("Failed to fetch offers:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching offers:", error);
            }
        };

        fetchOffers();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleDeleteImage = async (offerId) => {
        if (!window.confirm("Are you sure you want to delete this offer?")) return;

        try {
            const response = await fetch(`http://localhost:3001/api/offers/${offerId}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setOffers(offers.filter((offer) => offer._id !== offerId));
                setApiMessage("Offer deleted successfully.");
            } else {
                console.error("Failed to delete offer:", response.statusText);
            }
        } catch (error) {
            console.error("Error deleting offer:", error);
        }
    };

    const handleDelete = () => {
        setSelectedImage(null);
        setPreview(null);
        setUploadedUrl(null); 
        setApiMessage('');
    };

    const handleUploadImage = async () => {
        if (!selectedImage) return;

        setLoading(true);
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('upload_preset', 'vogue_prism'); 

        try {
            const uploadResponse = await fetch(
                "https://api.cloudinary.com/v1_1/dldrjl92a/image/upload", 
                { method: 'POST', body: formData }
            );

            if (uploadResponse.ok) {
                const data = await uploadResponse.json();
                setUploadedUrl(data.secure_url); 
                await storeOfferInDB(data.secure_url); 
            } else {
                console.error('Upload failed:', uploadResponse.statusText);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoading(false);
        }
    };

    const storeOfferInDB = async (imageUrl) => {
        try {
            const response = await fetch("http://localhost:3001/api/offers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl }),
            });

            if (response.ok) {
                const result = await response.json();
                setApiMessage(result.message);
            } else {
                console.error("Failed to store offer:", response.statusText);
            }
        } catch (error) {
            console.error("Error storing offer in DB:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-gray-100 p-5">
            {offers.length === 0 && (
                <div className="flex flex-col justify-center items-center">
                    {!selectedImage && (
                        <label className="flex flex-col items-center justify-center w-48 h-auto bg-darker-green border-2 border-light-gray rounded-md cursor-pointer">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <BiSolidImageAdd className="text-4xl text-white" size={72} />
                            <span className="text-white">Select Image</span>
                        </label>
                    )}

                    {preview && (
                        <div
                            className="relative mt-5"
                            onMouseEnter={() => setHovering(true)}
                            onMouseLeave={() => setHovering(false)}
                        >
                            <img
                                src={preview}
                                alt="Selected"
                                className="w-full h-auto max-h-96 object-contain"
                            />
                            {hovering && (
                                <button
                                    onClick={handleDelete}
                                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                                >
                                    <AiFillDelete size={24} />
                                </button>
                            )}
                        </div>
                    )}

                    {selectedImage && (
                        <button
                            onClick={handleUploadImage}
                            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-md"
                            disabled={loading}
                        >
                            {loading ? 'Uploading...' : 'Upload Image'}
                        </button>
                    )}
                </div>
            )}

            {uploadedUrl && (
                <div className="mt-5">
                    <p className="text-green-500">Image uploaded successfully!</p>
                    {apiMessage && <p className="text-blue-500">{apiMessage}</p>}
                </div>
            )}

            <div className="mt-5 flex justify-center items-center">
                {offers.map((offer) => (
                    <div
                        key={offer._id}
                        className="bg-white p-4 h-auto w-auto relative rounded-md flex justify-center items-center shadow-md"
                        onMouseEnter={() => setDeletingOffer(offer._id)}
                        onMouseLeave={() => setDeletingOffer(null)}
                    >
                        <img
                            src={offer.imageUrl}
                            alt="Offer"
                            className="w-[80%] h-[70%] object-cover  rounded-md"
                        />
                        {deletingOffer === offer._id && (
                            <button
                                onClick={() => handleDeleteImage(offer._id)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                            >
                                <AiFillDelete size={24} />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
