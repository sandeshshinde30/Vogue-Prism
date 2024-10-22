import React, { useState } from "react";

export default function Category() {
    const [sizeFilters, setSizeFilters] = useState([]);
    const [availabilityFilters, setAvailabilityFilters] = useState({});
    const [priceFilters, setPriceFilters] = useState({});
    const [colorFilters, setColorFilters] = useState({});

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

    return (
        <div className="flex">
            {/* */}

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
                            <input type="search" placeholder="Search" className="border-2 border-gray-300 p-2 w-full bg-gray-100 mt-1" />
                        </div>
                    </div>

                   
                </header>

                <div className="flex-col">
                    <div className="flex flex-wrap justify-center md:justify-start w-4/5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div className="flex-col m-3" key={index}>
                                <div className="bg-green-50 h-80 w-64">
                                    <img src={`t${index % 2 ? '' : '1'}.jpeg`} alt={`Product ${index + 1}`} className="h-full w-full object-cover" />
                                </div>
                                <div className="flex w-64 h-auto justify-between mt-2">
                                    <h6 className="pl-1">Cotton T-Shirt</h6>
                                    <h6 className="line-through text-sm">₹1999</h6>
                                </div>
                                <div className="flex w-64 h-auto justify-between">
                                    <h6 className="pl-1 text-gray-500">Basic Heavy Weight T-Shirt</h6>
                                    <h6 className="font-bold">₹999</h6>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
