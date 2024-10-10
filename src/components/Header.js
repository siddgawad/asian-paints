import React from 'react';
import colorPalettes from '../data/colorPalettes';

const Header = ({
  selectedMainFlower,
  selectedAccentFlower,
  selectedMainWallColor,
  selectedSideWallColor,
  onRoomChange
}) => {
  const selectedFlower = selectedMainFlower || selectedAccentFlower;

  // Helper function to get the hex code and details of the flower
  const getFlowerDetails = (flower) => {
    if (!flower) return { hex: '', name: 'No flower selected' };

    // Find the color palette that matches the selected flower
    const palette = colorPalettes.find(p => p.image === flower);
    if (palette) {
      return {
        hex: palette.primary[0]?.hex || '',
        name: palette.name,
        primaryColor: palette.primary[3]?.hex || '' // Use primary color at index 3 for styling
      };
    }
    return { hex: '', name: 'Unknown flower', primaryColor: '' };
  };

  const { hex, name, primaryColor } = getFlowerDetails(selectedFlower);

  return (
    <div className="grid gap-1 grid-cols-6 mt-2 ml-2 mr-2">
      <div className="flex justify-center items-center col-span-1 h-[40px] border border-black">
        {selectedFlower ? (
          <img
            src={selectedFlower}
            alt="Selected flower"
            className="h-full w-full object-contain"
          />
        ) : (
          <span>No flower selected</span>
        )}
      </div>
      <div className="flex flex-col justify-center items-center col-span-3 h-[40px] border border-black text-center">
        {selectedFlower ? (
          <>
            <div className='text-lg' style={{ color: 'black' }}>{hex}</div> {/* Display hex code in black color */}
            {selectedMainWallColor && selectedSideWallColor &&
              `Main: ${selectedMainWallColor.name}, Side: ${selectedSideWallColor.name}`}
            {selectedMainWallColor && !selectedSideWallColor &&
              `Main: ${selectedMainWallColor.name}`}
            {!selectedMainWallColor && selectedSideWallColor &&
              `Side: ${selectedSideWallColor.name}`}
          </>
        ) : (
          <span>Select Flower</span>
        )}
      </div>
      <div className="flex justify-center items-center col-span-2 h-[40px] border border-black">
        <select
          onChange={(e) => onRoomChange(e.target.value)}
          className="bg-transparent text-black"
        >
          <option value="bedroom">Bedroom</option>
          <option value="livingroom">Living Room</option>
        </select>
      </div>
    </div>
  );
};

export default Header;
