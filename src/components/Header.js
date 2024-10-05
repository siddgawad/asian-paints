import React from 'react';

const Header = ({ 
  selectedFlower, 
  selectedMainWallColor, 
  selectedSideWallColor, 
  onRoomChange 
}) => {
  return (
    <div className="grid gap-1 grid-cols-6 mt-2 ml-2 mr-2">
      <div className="flex justify-center items-center col-span-1 h-[40px] border border-black">
        <img
          src={selectedFlower || "/placeholder-image.png"}
          alt="Selected flower"
          className="h-full"
        />
      </div>
      <div className="flex justify-center items-center col-span-3 h-[40px] border border-black">
        {selectedFlower ? (
          <>
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