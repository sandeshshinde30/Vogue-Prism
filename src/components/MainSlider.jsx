    import React from "react";
    import Carousel from "./Carousel";
    import { useNavigate } from "react-router-dom";


    function MainSlider (){
        const navigate = useNavigate();

        let slides = [
            "cloth1.png",
            "cloth2.png",
            "cloth3.png",
        ]

        const handleShopNow = () => {
            navigate('/category?category=category'); // Navigate to the Product page
        };



        return (
            <>
            <div className="flex justify-center md:flex-row flex-col items-center w-auto  md:h-4/5 lg:mt-20 mt-3 md:mx-36 tracking-[1.0em]">
                    <div className="w-1/3 flex flex-1 order-2 md:order-1 lg:justify-between justify-center lg:items-center items-center">
                    <div className="lg:text-left lg:text-5xl text-center  lg:mt-0 mt-5 font-extrabold ">
                    <h1 className="text-gray-400 md:text-5xl text-4xl">FASHION</h1> <br />
                        <h1 className="text-dark-green md:text-5xl text-4xl">MADE</h1> <br />
                        <h1 className="text-gray-400 md:text-5xl text-4xl">EASY</h1>
                        <button className="md:text-2xl text-1xl border border-gray-400  p-3 text-gray-800 mt-10 uppercase tracking-wider w-full"
                        onClick={handleShopNow}>Explore NOW</button>
                    </div>
                    
                    </div> 

                    <div className="flex flex-1 lg:w-2/3  lg:m-auto order-1 md:order-2 m-5">
                    <Carousel slides={slides}/>
                    </div>
                    
            </div>
            </>
        );
    }

    export default MainSlider;