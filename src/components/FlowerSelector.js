import React from 'react';

const FlowerSelector = ({ palettes, selectedFlower, onFlowerSelect }) => {
  // Ensure palettes is an array before mapping
  const paletteArray = Array.isArray(palettes) ? palettes : [];

  return (
    <div className="grid gap-1 grid-cols-6 ml-2 mr-2 mb-2">
      {paletteArray.map((palette, index) => (
        <div
          key={index}
          className="flex justify-center items-center col-span-1 h-[70px]"
        >
          <button 
            onClick={() => onFlowerSelect(index)}
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