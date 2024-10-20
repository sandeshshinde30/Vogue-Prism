import React from "react";
import { FaSearch } from "react-icons/fa";
import { BiSolidImageAdd } from "react-icons/bi";
export default function UpdateProduct(){
    return (
        <div className="h-full w-full">
            <div className="w-full text-center text-[18px] text-gray-700">
                <h1 className="uppercase font-bold">update collection</h1>
            </div>
            
            <div className="flex h-auto">
                <div className="flex  flex-col w-1/2 border-r-2  border-light-green">
                    <div className="px-5">
                        <h1 className="font-semibold">Base Information</h1>
                        <div className="mt-4 gap-4 flex flex-col py-2 bg-white rounded-lg">
                        <div className="w-full px-4 flex flex-col gap-2">
                            <h2 className="text-sm">Title</h2>
                            <input type="text" className="w-full bg-dark-green rounded-md h-7 text-white pl-2 placeholder-white" placeholder="Enter Title"/>
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

                     <div className="flex px-5 pt-2 w-full  gap-2">
                        <div className="w-[33%] ">
                            <h1 className="font-semibold">Details</h1>
                            <div className="w-full mt-2 bg-white p-4 rounded-md flex flex-col gap-2">
                                <h1>MRP</h1>
                                <input type="text" className="w-full bg-dark-green rounded-md h-7 text-white pl-2 text-center  placeholder-white" placeholder="Enter MRP"/>
                                <h1>Actual Price</h1>
                                <input type="text" className="w-full bg-dark-green rounded-md h-7 text-white pl-2 text-center placeholder-white" placeholder="Enter Price"/>
                            </div>
                        </div>

                     <div className="w-[2px] mt-3 bg-light-green h-full"></div>

                     <div className="w-[66%] px-2 ">
                            <div>
                                <h1 className="font-semibold">Size</h1>
                                <div className="w-full  bg-white p-4 rounded-md flex  gap-2"> 
                                <div className="flex">
                                        <FaSearch size={20} className="absolute ml-2 mt-1 text-white"/>
                                        <input type="text" className="w-full bg-gray-500 rounded-md h-7 text-white pl-2 text-center placeholder-white" placeholder="Search Size"/>                            
                                </div>   
                                <button className="bg-dark-green text-white px-2 rounded-md w-28">ADD</button>                            
                                </div>

                                <div className="grid grid-cols-4 gap-2 px-5">
                                <div className=" text-center text-white rounded-md bg-dark-green">
                                    <h1>SM</h1>    
                                </div> 
                                <div className=" text-center text-white rounded-md bg-dark-green">
                                    <h1>SM</h1>    
                                </div> 
                                <div className=" text-center text-white rounded-md bg-dark-green">
                                    <h1>SM</h1>    
                                </div> 
                                <div className=" text-center text-white rounded-md bg-dark-green">
                                    <h1>SM</h1>    
                                </div> 
                                <div className=" text-center text-white rounded-md bg-dark-green">
                                    <h1>SM</h1>    
                                </div> 
                                <div className=" text-center text-white rounded-md bg-dark-green">
                                    <h1>SM</h1>    
                                </div> 
                                </div>
                            </div>
                            <div className="mt-2">
                                <h1 className="font-semibold">Color</h1>
                                <div className="w-full  bg-white p-4 rounded-md flex  gap-2"> 
                                <div className="flex">
                                        <FaSearch size={20} className="absolute ml-2 mt-1 text-white"/>
                                        <input type="text" className="w-full bg-gray-500 rounded-md h-7 text-white pl-2 text-center placeholder-white" placeholder="Search Color"/>                            
                                </div>   
                                <button className="bg-dark-green text-white px-2 rounded-md w-28">ADD</button>                            
                                </div>

                                <div className="grid grid-cols-4 gap-2 px-5">
                                <div className=" text-center text-white rounded-md bg-dark-green">
                                    <h1>Red</h1>    
                                </div> 
                                <div className=" text-center text-white rounded-md bg-dark-green">
                                    <h1>Green</h1>    
                                </div> 
                                </div>
                            </div>
                       </div>
                     </div>
                </div>
                <div className="flex flex-col  px-5 mt-2 w-1/2 ">
                <h1 className="font-semibold">Pictures</h1>
                   <div className="bg-white mt-3 rounded-lg">
                    <div className="grid grid-cols-3 gap-3 p-5">
                        <div className="bg-dark-green rounded-md">
                            <img src="cloth1.png" alt="" />
                        </div>
                        <div className="bg-dark-green rounded-md">
                            <img src="cloth1.png" alt="" />
                        </div>
                        <div className="bg-dark-green rounded-md">
                            <img src="cloth1.png" alt="" />
                        </div>
                        <div className="bg-dark-green rounded-md">
                            <img src="cloth1.png" alt="" />
                        </div>
                        <div className="flex  bg-dark-green rounded-md">
                            <button>
                            <BiSolidImageAdd className="text-white h-full w-full p-7" />
                            </button>
                        </div>
                    </div>    
                   </div>
                   <button className="w-full mt-8 font-extrabold bg-dark-green rounded-lg text-white h-8">UPDATE</button>
                </div>  
            </div>
        </div>
    );
}