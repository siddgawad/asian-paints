import React from 'react';
import ColorPalette from './ColorPalette';
import FlowerSelector from './FlowerSelector';
import GalleryComponent from './GalleryButton';
import { default_img } from '../assets';

const MainContent = ({
  state,
  getColorOverlay,
  handleColorSelection,
  handleFlowerSelection,
  addToCart,
  cart,
  colorPalettes
}) => {
  const cartCount = cart ? cart.length : 0;

  return (
    <div className="main-content">
      <div className="relative h-[50vh] overflow-hidden">
        <img
          src={default_img}
          className="absolute inset-0 z-10 w-full h-full object-contain"
          alt="Motorcycle"
        />
        <div
          className="absolute inset-0 z-20"
          style={{
            maskImage: `url(${state.selectedRoom})`,
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskImage: `url(${state.selectedRoom})`,
            WebkitMaskSize: 'contain',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            backgroundColor: getColorOverlay(state.selectedMainWallColor),
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <ColorPalette
            title="Main Color"
            colors={state.mainWallColors}
            selectedColor={state.selectedMainWallColor}
            onColorSelect={(color) => handleColorSelection("main", color)}
          />
          <ColorPalette
            title="Accent Color"
            colors={state.sideWallColors}
            selectedColor={state.selectedSideWallColor}
            onColorSelect={(color) => handleColorSelection("side", color)}
          />
        </div>
        
        <FlowerSelector
          palettes={colorPalettes}
          selectedFlower={state.selectedFlower}
          onFlowerSelect={handleFlowerSelection}
        />
        
        <GalleryComponent addToCart={addToCart} cartCount={cartCount} />
      </div>
    </div>
  );
};

export default MainContent;