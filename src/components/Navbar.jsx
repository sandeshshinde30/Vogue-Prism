import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaYoutube, FaInstagram, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
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
                    <img src="/VOGUE_PRISM _black.png" alt="VOGUE_PRISM" className='w-24 mt-0' />
                </div>

                {/* Desktop Navigation */}
                <div className='hidden md:flex flex-1 justify-around w-full mt-2 tracking-wide'>
                    <div className='flex space-x-4'>
                        <FaFacebook className="icon-outline" size={24} />
                        <FaTwitter className="icon-outline" size={24} />
                        <FaYoutube className="icon-outline" size={24} />
                        <FaInstagram className="icon-outline" size={24} />
                    </div>
                    <div className='flex space-x-4 text-md font-bold gap-5'>
                        <a className='hover:text-green-700 cursor-pointer'>HOME</a>
                        <a className='hover:text-green-700 cursor-pointer'>CATEGORIES</a>
                        <a className='hover:text-green-700 cursor-pointer'>PRODUCTS</a>
                        <a className='hover:text-green-700 cursor-pointer'>REVIEWS</a>
                    </div>
                    
                   
                    <Link to="/login">
            <div className='flex lg:mr-20 text-center justify-center items-center gap-2'>
                <FaUser size={24} />
                <h2 className=' font-bold'>Admin</h2>
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
                    <img src="/VOGUE_PRISM _black.png" alt="VOGUE_PRISM" className='w-24 mt-0' />
                     </div>
                        <div className='flex justify-end pr-1'>
                            <FaTimes size={24} onClick={toggleMobileMenu} />
                        </div>
                    </div>

                    {/* Mobile Navigation Links */}
                    <div className='flex flex-col justify-center items-center w-full mt-5 tracking-wide'>
                        <div className='flex flex-col space-x-4 text-lg font-bold gap-7'>
                            <a className='hover:text-green-700 cursor-pointer'>HOME</a>
                            <a className='hover:text-green-700 cursor-pointer'>CATEGORIES</a>
                            <a className='hover:text-green-700 cursor-pointer'>PRODUCTS</a>
                            <a className='hover:text-green-700 cursor-pointer'>REVIEWS</a>
                        </div>
                        <div className='flex space-x-6 mt-10'>
                            <FaFacebook className="icon-outline" size={24} />
                            <FaTwitter className="icon-outline" size={24} />
                            <FaYoutube className="icon-outline" size={24} />
                            <FaInstagram className="icon-outline" size={24} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Navbar;
