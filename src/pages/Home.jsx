import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import MainSlider from '../components/MainSlider';
import Categories from '../components/Categories';
import Trending from '../components/Trending';
import SiteInsights from '../components/SiteInsights';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';
import HomeOffer from '../components/HomeOffer';

function Home() {
    const [offerExists, setOfferExists] = useState(false); // Track if offer exists
    const [loading, setLoading] = useState(true); // Track loading state

    // Fetch offers from the backend
    useEffect(() => {
        const fetchOfferStatus = async () => {
            try {
                const response = await fetch("http://localhost:3001/api/offers");
                if (response.ok) {
                    const data = await response.json();
                    setOfferExists(data.length > 0); // If offers exist, set state to true
                } else {
                    console.error("Failed to fetch offers:", response.statusText);
                }
            } catch (error) {
                console.error("Error fetching offers:", error);
            } finally {
                setLoading(false); // Stop loading once fetch completes
            }
        };

        fetchOfferStatus();
    }, []);

    return (
        <>
            <div className='bg-gray-100 h-full'>
                <Navbar />
                <MainSlider />

                {/* Conditionally render HomeOffer if offer exists */}
                {!loading && offerExists && <HomeOffer />}

                <Categories />
                <Trending />
                <SiteInsights />
                <Reviews />
                <Footer />
            </div>
        </>
    );
}

export default Home;
