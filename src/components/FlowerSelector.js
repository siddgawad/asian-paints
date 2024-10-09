import React from 'react';

const FlowerSelector = ({ palettes, selectedFlower, onFlowerSelect }) => {
  return (
    <div className="grid gap-1 grid-cols-6 ml-2 mr-2 mb-2">
      {Object.keys(palettes).map((key) => {
        const palette = palettes[key];
        return (
          <div
            key={key}
            className="flex justify-center items-center col-span-1 h-[70px]"
          >
            <button
              onClick={() => onFlowerSelect(palette)}
              className={`p-1 rounded-lg bg-transparent ${
                selectedFlower === palette.image ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <img
                src={palette.image}
                className="object-contain w-full h-full"
                alt={`${palette.name} flower`}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default FlowerSelector;