import React, { useEffect, useState } from "react";

export default function HomeOffer() {
    const [offerImage, setOfferImage] = useState(null); // Store the offer image URL

    // Fetch the offer image from the database
    useEffect(() => {
        const fetchOfferImage = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/offers");
                if (response.ok) {
                    const data = await response.json();
                    if (data.length > 0) {
                        setOfferImage(data[0].imageUrl); // Use the first offer image
                    }
                } else {
                    console.error("Failed to fetch offer:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching offer:", error);
            }
        };

        fetchOfferImage();
    }, []);

    if (!offerImage) return null; // Don't render if no offer image

    return (
        <div className="mt-5 text-center">
            <h1 className="lg:text-4xl text-2xl font-bold text-dark-green tracking-[.25em]">
                OFFER
            </h1>
            <div className="flex justify-center items-center mt-5">
                <img
                    src={offerImage}
                    alt="Offer"
                    className="w-full max-w-[600px] h-auto object-contain rounded-md shadow-md"
                />
            </div>
        </div>
    );
}
