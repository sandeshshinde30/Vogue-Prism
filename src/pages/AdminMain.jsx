import React, { useState } from "react";
import { IoMdHome, IoMdTrendingUp } from "react-icons/io";
import { MdCollectionsBookmark, MdDelete } from "react-icons/md";
import { BiSolidOffer, BiSolidLogOut } from "react-icons/bi";
import { IoBagAdd } from "react-icons/io5";
import { RxUpdate } from "react-icons/rx";
import { FaUserEdit } from "react-icons/fa";
import AddProduct from "../components/AddProduct";
import UpdateProduct from "../components/UpdateProduct";
import DeleteProduct from "../components/DeleteProduct";
import UpdateSearchProduct from "../components/UpdateSearchProduct";
import Offers from "../components/Offers";
import Dashboard from "../components/Dashboard";

export default function AdminMain() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [showCollectionTabs, setShowCollectionTabs] = useState(false);
  const [activeCollectionTab, setActiveCollectionTab] = useState("");
  const [showTrendingTabs, setShowTrendingTabs] = useState(false); // Added state
  const [activeTrendingTab, setActiveTrendingTab] = useState("");

  const handleCollectionClick = () => {
    setShowCollectionTabs(!showCollectionTabs);
    setActiveCollectionTab("");
    setActiveTab("Collections");
  };

  const handleTrendingClick = () => {
    setShowTrendingTabs(!showTrendingTabs); // Toggle trending tabs
    setActiveTrendingTab("");
    setActiveTab("Trending");
  };

  const renderContent = () => {
    if (activeTab === "Collections") {
      switch (activeCollectionTab) {
        case "Add":
          return <AddProduct />;
        case "Update":
          return <UpdateSearchProduct />;
        case "Delete":
          return <DeleteProduct />;
        default:
          return <div className="p-10">Select an action from Collections.</div>;
      }
    }

    if (activeTab === "Trending") {
      switch (activeTrendingTab) {
        case "Add":
          return <AddProduct />;
        case "Update":
          return <UpdateProduct />;
        case "Delete":
          return <DeleteProduct />;
        default:
          return <div className="p-10">Select an action from Trending.</div>;
      }
    }

    switch (activeTab) {
      case "Dashboard":
        return <Dashboard/>;
      case "Offers":
        return <Offers/>;
      case "Edit Profile":
        return <div className="p-10">Edit your profile details here.</div>;
      default:
        return <div className="p-10">Select an option from the sidebar.</div>;
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="md:w-[20%] lg:w-[18%] border-r-[2px] border-light-green flex flex-col items-center gap-3">
        <img src="VOGUE_PRISM _black.png" alt="VOGUE_PRISM BLACK" className="w-24 h-10 mt-3" />
        <div className="flex justify-center items-center gap-4 mt-3">
          <div className="rounded-full bg-gray-400 w-10 h-10 overflow-hidden">
            <img src="cloth1.png" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xs font-bold">Hrishikesh Lad</h1>
            <h3 className="text-[10px] text-gray-600">Co-Founder</h3>
          </div>
        </div>

        <div className="h-[2px] bg-light-green w-full"></div>

        <div className="flex flex-col gap-3 mt-3 justify-stretch h-full">
          <div className="flex gap-3 items-center cursor-pointer" onClick={() => setActiveTab("Dashboard")}>
            <IoMdHome size={20} className="text-dark-green" />
            <h1 className="whitespace-nowrap">Dashboard</h1>
          </div>

          <div className="flex flex-col">
            <div className="flex gap-3 items-center cursor-pointer" onClick={handleCollectionClick}>
              <MdCollectionsBookmark size={20} className="text-dark-green" />
              <h1 className="whitespace-nowrap">Collections</h1>
            </div>
            {showCollectionTabs && (
              <div className="ml-8 mt-2 flex flex-col gap-2 text-[12px]">
                <div className="flex gap-3 items-center cursor-pointer" onClick={() => setActiveCollectionTab("Add")}>
                  <IoBagAdd size={16} className="text-dark-green" />
                  <h1 className="whitespace-nowrap">Add</h1>
                </div>
                <div className="flex gap-3 items-center cursor-pointer" onClick={() => setActiveCollectionTab("Update")}>
                  <RxUpdate size={16} className="text-dark-green" />
                  <h1 className="whitespace-nowrap">Update</h1>
                </div>
                <div className="flex gap-3 items-center cursor-pointer" onClick={() => setActiveCollectionTab("Delete")}>
                  <MdDelete size={16} className="text-dark-green" />
                  <h1 className="whitespace-nowrap">Delete</h1>
                </div>
              </div>
            )}
          </div>

          {/* <div className="flex flex-col">
            <div className="flex gap-3 items-center cursor-pointer" onClick={handleTrendingClick}>
              <IoMdTrendingUp size={20} className="text-dark-green" />
              <h1 className="whitespace-nowrap">Trending</h1>
            </div>
            {showTrendingTabs && (
              <div className="ml-8 mt-2 flex flex-col gap-2 text-[12px]">
                <div className="flex gap-3 items-center cursor-pointer" onClick={() => setActiveTrendingTab("Add")}>
                  <IoBagAdd size={16} className="text-dark-green" />
                  <h1 className="whitespace-nowrap">Add</h1>
                </div>
                <div className="flex gap-3 items-center cursor-pointer" onClick={() => setActiveTrendingTab("Update")}>
                  <RxUpdate size={16} className="text-dark-green" />
                  <h1 className="whitespace-nowrap">Update</h1>
                </div>
                <div className="flex gap-3 items-center cursor-pointer" onClick={() => setActiveTrendingTab("Delete")}>
                  <MdDelete size={16} className="text-dark-green" />
                  <h1 className="whitespace-nowrap">Delete</h1>
                </div>
              </div>
            )}
          </div> */}

          <div className="flex gap-3 items-center cursor-pointer" onClick={() => setActiveTab("Offers")}>
            <BiSolidOffer size={20} className="text-dark-green" />
            <h1 className="whitespace-nowrap">Offers</h1>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-3 text-sm bg-dark-green px-4 py-2 mb-10 rounded-2xl text-white">
          <div className="flex gap-3 items-center cursor-pointer" onClick={() => setActiveTab("Edit Profile")}>
            <FaUserEdit size={20} />
            <h1 className="whitespace-nowrap">Edit Profile</h1>
          </div>
          <div className="flex gap-3 items-center cursor-pointer">
            <BiSolidLogOut size={20} />
            <h1 className="whitespace-nowrap">Logout</h1>
          </div>
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col h-full">
          <div className="mt-2">
            <h1 className="pl-10 text-[20px] font-bold text-gray-700">Admin Panel</h1>
          </div>
          <div className="h-[2px] bg-light-green w-full mt-1"></div>
          <div className="bg-gray-100 h-full">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
}
