    import React from "react";
    import Carousel from "./Carousel";
    import { useNavigate } from "react-router-dom";


    function MainSlider (){
        const navigate = useNavigate();

        let slides = [
            "cloth1.png",
            "4568147.webp",
            "4568146.webp"
        ]

        const handleShopNow = () => {
            navigate('/category'); // Navigate to the Product page
        };



        return (
            <>
            <div className="flex justify-center md:flex-row flex-col items-center w-full  md:h-4/5 lg:mt-28 mt-3 tracking-[1.0em]">
                    <div className="w-1/2 flex flex-1 order-2 md:order-1 justify-center items-center">
                    <div className="lg:text-left lg:text-5xl text-center  lg:mt-0 mt-5 font-extrabold ">
                    <h1 className="text-gray-400 md:text-5xl text-4xl">FASHION</h1> <br />
                        <h1 className="text-dark-green md:text-5xl text-4xl">MADE</h1> <br />
                        <h1 className="text-gray-400 md:text-5xl text-4xl">EASY</h1>
                        <button className="md:text-2xl text-1xl border border-gray-400  p-5 mt-10 tracking-wider w-full"
                        onClick={handleShopNow}>SHOP NOW</button>
                    </div>
                    </div> 

                    <div className="flex flex-1 lg:w-1/2  lg:m-auto order-1 md:order-2 m-5">
                    <Carousel slides={slides}/>
                    </div>
                    
            </div>
            </>
        );
    }

    export default MainSlider;