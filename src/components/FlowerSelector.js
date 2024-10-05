import React from 'react';

const FlowerSelector = ({ palettes, selectedFlower, onFlowerSelect }) => {
  return (
    <div className="grid gap-1 grid-cols-6 ml-2 mr-2 mb-2">
      {Object.entries(palettes).map(([key, palette], index) => (
        <div
          key={index}
          className="flex justify-center items-center col-span-1 h-[70px]"
        >
          <button 
            onClick={() => onFlowerSelect(key)}
            className={`p-1 rounded-lg ${
              selectedFlower === palette.image ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            <img
              src={palette.image}
              className="object-contain w-full"
              alt={`${palette.name} flower`}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FlowerSelector;