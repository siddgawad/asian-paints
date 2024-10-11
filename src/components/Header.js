import React from 'react';
import colorPalettes from '../data/colorPalettes';
import RoomSelector from './RoomSelector';

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

  const { hex, } = getFlowerDetails(selectedFlower);

  return (
    <div className="flex justify-between flex-wrap gap-2">
  {/* Flower name and color details section */}
  <div className="flex flex-col justify-center items-center col-span-3 h-[40px] text-xl">
    {selectedFlower ? (
      <div className="flex flex-col items-start w-full">
        {/* Display Main wall color on top with hex code immediately after */}
        {selectedMainWallColor && (
          <div className="mr-2 text-base flex items-center">
            Main: {selectedMainWallColor.name}
            <span className="text-xs ml-2" style={{ color: 'black' }}>
              {hex}
            </span>
          </div>
        )}

        {/* Display Side wall color below Main with hex code immediately after */}
        {selectedSideWallColor && (
          <div className="mr-2 text-base flex items-center">
            Side: {selectedSideWallColor.name}
            <span className="text-xs ml-2" style={{ color: 'black' }}>
              {hex}
            </span>
          </div>
        )}
      </div>
    ) : (
      <span>Select Flower</span>
    )}
  </div>

  {/* RoomSelector on the right */}
  <RoomSelector onRoomChange={onRoomChange} />
</div>



  );
};

export default Header;