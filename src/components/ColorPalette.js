import React from 'react';

const ColorPalette = ({ title, colors, selectedColor, onColorSelect }) => {
  return (
    <div className="grid gap-1 grid-cols-6 mt-2 ml-2 mr-2">
      {/* <div className="min-h-[10px] bg-black text-white mt-2 col-span-6 text-center">
        {title}
      </div> */}
      {colors?.length > 0 ? (
        colors.map((color, index) => (
          <div
            key={index}
            className={`flex justify-center items-center col-span-1 h-[30px] text-black cursor-pointer p-2 ${
              selectedColor?.hex === color.hex ? 'ring-2 ring-blue-500' : ''
            }`}
            style={{ backgroundColor: color.hex }}
            onClick={() => onColorSelect(color)}
          >
            {color.name}
          </div>
        ))
      ) : (
        <div className="col-span-6 text-center p-2">No Colors Selected</div>
      )}
    </div>
  );
};

export default ColorPalette;