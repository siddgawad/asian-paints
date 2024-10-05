// RoomPreview.js
import React from "react";

const RoomPreview = ({ background, foreground, mainWallColor }) => {
  return (
    <div className="relative top-0 h-[30]">
      <img src={background} className="rounded-6xl object-cover w-full" alt="room background" />
      {mainWallColor && (
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: mainWallColor.hex,
            mixBlendMode: "multiply", // Use blend mode to mix the colors
          }}
        />
      )}
      <img
        src={foreground}
        className="absolute inset-0 object-contain w-full h-full"
        alt="Bedroom foreground"
      />
    </div>
  );
};

export default RoomPreview;
