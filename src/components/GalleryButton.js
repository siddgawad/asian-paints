import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'; // Adjust the path as needed
import GalleryView from './ViewGallery'; // Import GalleryView

const GalleryComponent = ({ addToGallery, galleryCount, gallery, onRemove }) => {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center">
        <div className="w-[58%] pr-4">
          <img src={logo} alt="Logo" className="h-[102px] w-full object-contain" />
        </div>
        <div className="w-[40%] flex justify-end">
          <button
            onClick={addToGallery}
            className="bg-blue-500 text-white px-4 py-2 rounded whitespace-nowrap"
          >
            Add to Gallery
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <Link
          to="/gallery"
          className="bg-green-500 text-white p-2 rounded flex items-center justify-center relative w-full"
          aria-label="View Gallery"
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
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <circle cx="8.5" cy="8.5" r="1.5"></circle>
            <polyline points="21 15 16 10 5 21"></polyline>
          </svg>
          {galleryCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {galleryCount}
            </span>
          )}
        </Link>
      </div>
      <GalleryView gallery={gallery} onRemove={onRemove} />
    </div>
  );
};

export default GalleryComponent;