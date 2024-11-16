import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar1 from '../components/Navbar1';
import ProductCarousel from "../components/ProductCarousel"
import config from '../config';
import Navbar from '../components/Navbar';

export default function Product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');

    const fetchProductData = async () => {
        try {
            const response = await fetch(`${config.BASE_URL}/api/getProduct/${id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProduct(data);

            console.log(data);
        } catch (error) {
            setError('Error fetching product data: ' + error.message);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [id]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="w-full md:h-screen h-auto md:mb-0 mb-10">
            <Navbar1 />
            <div className="flex lg:flex-row flex-col w-full h-auto mt-5 lg:h-[80%]">
                <div className="flex lg:w-1/2 w-full relative">
                    {/* <div className="lg:bg-dark-green lg:w-[70%] w-full h-full absolute left-0 top-0"></div> */}
                    <div className="w-full h-full flex items-center justify-center relative z-10">
                        <ProductCarousel slides={product.images} /> {/* Use product images */}
                    </div>
                </div>
                <div className="md:w-1/2 w-full tracking-[.10em] md:text-left text-center">
                    <div className="mt-10 md:ml-7 flex flex-col gap-5 md:text-left text-center">
                        <h1 className="font-bold md:text-[26px] text-[20px]">{product.title}</h1>
                        <div className="flex md:flex-row flex-col items-center md:justify-start justify-center gap-7">
                            <h1 className="text-dark-green font-extrabold md:text-2xl text-3xl">Rs. {product.price}</h1>
                            <h3 className="text-xs line-through">MRP Rs. {product.mrp}</h3>
                        </div>
                        <p className="text-xs">(incl. of all taxes)</p>
                        <h3 className="text-[20px] font-bold text-gray-800">COLOR</h3>
                        <div className="flex gap-3 justify-center md:justify-start">
    {product.colors.map((color, index) => (
        <div 
            key={index} 
            style={{ backgroundColor: color }} // Use inline styles for dynamic color
            className="rounded-full w-6 h-6 border-x-2 border-gray-200"
        ></div>
    ))}
</div>

                        <h3 className="text-[20px] font-bold text-gray-800">SIZE</h3>
                        <div className="flex gap-3 font-bold text-lg md:justify-start justify-center">
                            {product.sizes.map((size, index) => (
                                <div key={index}><h1>{size}</h1></div>
                            ))}
                        </div>
                        <div className="flex md:justify-start justify-center">
                            <button className="bg-dark-green px-10 md:mx-0 mx-2 py-2 md:w-auto w-full rounded-2xl text-white font-bold">AVAILABLE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
