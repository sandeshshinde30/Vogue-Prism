import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiFacebook,CiTwitter,CiYoutube } from "react-icons/ci";
import { SlSocialYoutube } from "react-icons/sl";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { Link as RouterLink, useNavigate } from 'react-router-dom'; // Renamed to RouterLink
import { Link as ScrollLink, animateScroll as scroll } from 'react-scroll';
function Navbar() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        setIsMobileMenuOpen(false);  // Close the mobile menu after navigation
    };
    
    return (
        <>
            {/* Mobile Menu Button */}
            <div className='absolute flex w-screen justify-end pr-5 mt-5 md:hidden'>
                <FaBars size={24} onClick={toggleMobileMenu} />
            </div>

            {/* Main Content */}
            <div className='flex flex-col md:items-center md:justify-between ml-4 mt-0 lg:ml-10 '>
                {/* Logo Section */}
                <div className='flex-1 flex mt-3'>
                    <img src="vogueBlack.png" alt="VOGUE_PRISM" className='w-24 mt-0' />
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex flex-1 justify-around w-full mt-2 tracking-wide'>
                    <div className='flex space-x-4'>
                        <FaFacebook className="icon-outline hover:text-green-700 cursor-pointer" size={22} />
                        <FaTwitter className="icon-outline hover:text-green-700 cursor-pointer" size={24} />
                        <FaYoutube className="icon-outline hover:text-green-700 cursor-pointer" size={24} />
                        <AiFillInstagram className="icon-outline hover:text-green-700 cursor-pointer" size={24} />
                    </div>
                    <div className='flex space-x-4 text-md font-bold gap-5'>
                        <a className='hover:text-green-700 cursor-pointer' onClick={() => handleNavigation('/')}>HOME</a>
                        <ScrollLink 
                to="cat" 
                smooth={true} 
                duration={500} 
                className='hover:text-green-700 cursor-pointer'
            >
                CATEGORIES
            </ScrollLink>
                        <a className='hover:text-green-700 cursor-pointer' onClick={() => handleNavigation('/category')}>PRODUCTS</a>
                        <ScrollLink 
                to="rew" 
                smooth={true} 
                duration={500} 
                className='hover:text-green-700 cursor-pointer'
            >
                REVIEWS
            </ScrollLink>
                    </div>
                    
                   
                    <Link to="/login">
            <div className='flex lg:mr-20 hover:text-green-700 text-center justify-center items-center gap-2'>
                <FaUser size={24} />
                <h2 className=' font-bold hover:text-green-700 align-baseline'>Admin</h2>
            </div>
        </Link>

                    
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className='fixed bg-gray-100 inset-0 text-center z-50'>
                    {/* Logo in Mobile Menu */}
                    
                    <div className='flex justify-end items-center p-4 mt-0'>
                    <div className='flex-1  flex'>
                    <img src="vogueBlack.png" alt="VOGUE_PRISM" className='w-24 mt-0' />
                     </div>
                        <div className='flex justify-end pr-1'>
                            <FaTimes size={24} onClick={toggleMobileMenu} />
                        </div>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className='flex flex-col justify-center items-center w-full mt-5 tracking-wide'>
                    <div className='flex flex-col space-x-4 text-lg font-bold gap-7'>
                <a className='hover:text-green-700 cursor-pointer' onClick={() => handleNavigation('/')}>HOME</a>
                <a className='hover:text-green-700 cursor-pointer' >CATEGORIES</a>
                <a className='hover:text-green-700 cursor-pointer' onClick={() => handleNavigation('/category')} >PRODUCTS</a>
                <a className='hover:text-green-700 cursor-pointer'>REVIEWS</a>
</div>

                        <div className='flex space-x-6 mt-10'>
                        <FaFacebook className="icon-outline hover:text-green-700 cursor-pointer" size={22} />
                        <FaTwitter className="icon-outline hover:text-green-700 cursor-pointer" size={24} />
                        <FaYoutube className="icon-outline hover:text-green-700 cursor-pointer" size={24} />
                        <AiFillInstagram className="icon-outline hover:text-green-700 cursor-pointer" size={24} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
