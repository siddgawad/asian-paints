import React from 'react';

const FlowerSelector = ({ palettes, selectedFlower, onFlowerSelect }) => {
  return (
    <div className="flex space-x-2 ml-2 mr-2 mb-2">
      {Object.keys(palettes).map((key) => {
        const palette = palettes[key];
        return (
          <div
            key={key}
            className="flex-shrink-0"
          >
            <button
              onClick={() => onFlowerSelect(palette)}
              className={`p-1 rounded-lg bg-transparent ${
                selectedFlower === palette.image ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <img
                src={palette.image}
                className="object-contain w-16 h-16"
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























