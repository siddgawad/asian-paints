import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path as needed
import logo2 from '../assets/logo_top.png';

const GalleryComponent = ({ addToCart, cartCount }) => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center">
        <div className="w-[58%] pr-4">
        {/* <img src={logo2} alt="Logo" className="h-[18px] w-full object-contain" /> */}
          <img src={logo} alt="Logo" className="h-[102px] w-full object-contain" />
        </div>
        <div className="w-[40%] flex justify-end">
          <button
            onClick={addToCart}
            className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Add to Gallery
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          to="/cart"
          className="bg-green-500 text-white p-2 rounded flex items-center justify-center relative w-10"
          aria-label="View Cart"
        >
          <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6"
          >
            <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
            <path d="M2 9l4 4 3-3 4 4 5-5"></path>
            </svg>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </div>
  );
};

export default GalleryComponent;