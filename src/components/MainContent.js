import React from 'react';
import { useNavigate } from 'react-router-dom';
import ColorPalette from './ColorPalette';
import FlowerSelector from './FlowerSelector';
import GalleryComponent from './GalleryButton';
import { default_img } from '../assets';
import Header from "./Header";
import { bedroom, livingroom } from "../assets";
import logo from '../assets/logo.png'; // Adjust the path as needed
import { Plus } from 'lucide-react';

const MainContent = ({
  state,
  setState,
  getColorOverlay,
  handleColorSelection,
  addToCart,
  cart,
  colorPalettes
}) => {
  const navigate = useNavigate();
  const cartCount = cart ? cart.length : 0;

  const handleRoomChange = (roomType) => {
    setState((prev) => ({
      ...prev,
      selectedRoom: roomType === "bedroom" ? bedroom : livingroom,
    }));
  };

  const handleCartClick = () => {
    navigate('/cart');
  };

  const handleMainFlowerSelection = (palette) => {
    setState((prev) => ({
      ...prev,
      selectedMainFlower: palette.image,
      mainWallColors: palette.primary,
      selectedMainWallColor: null,
    }));
  };

  const handleAccentFlowerSelection = (palette) => {
    setState((prev) => ({
      ...prev,
      selectedAccentFlower: palette.image,
      sideWallColors: palette.secondary,
      selectedSideWallColor: null,
    }));
  };

  return (
    <div className="main-content relative">
      <div className="absolute top-4 right-4 z-50">
        <GalleryComponent addToCart={addToCart} cartCount={cartCount} onCartClick={handleCartClick} />
      </div>
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
        <Header
          selectedMainFlower={state.selectedMainFlower}
          selectedAccentFlower={state.selectedAccentFlower}
          selectedMainWallColor={state.selectedMainWallColor}
          selectedSideWallColor={state.selectedSideWallColor}
          onRoomChange={handleRoomChange}
        />
        <div className="mt-8">
          <h2 className="text-xs font-bold mb-2 text-left">Main Color</h2>
          <div className="mb-4">
            <ColorPalette
              title="Main Color"
              colors={state.mainWallColors}
              selectedColor={state.selectedMainWallColor}
              onColorSelect={(color) => handleColorSelection("main", color)}
            />
          </div>
          <div className="h-20 overflow-x-auto">
            <FlowerSelector
              palettes={colorPalettes}
              selectedFlower={state.selectedMainFlower}
              onFlowerSelect={handleMainFlowerSelection}
            />
          </div>
        </div>
        <div className="mt-8">
          <h2 className="text-xs font-bold mb-2 text-left">Accent Color</h2>
          <div className="mb-4">
            
            <ColorPalette
              title="Accent Color"
              colors={state.sideWallColors}
              selectedColor={state.selectedSideWallColor}
              onColorSelect={(color) => handleColorSelection("side", color)}
            />
          </div>
          <div className="h-20 overflow-x-auto">
            <FlowerSelector
              palettes={colorPalettes}
              selectedFlower={state.selectedAccentFlower}
              onFlowerSelect={handleAccentFlowerSelection}
            />
          </div>
        </div>
      </div>
      {/* add to gallery */}
      <div className="flex items-center mx-auto px-4 py-2">
        <div className="w-[58%] pr-4">
        {/* <img src={logo2} alt="Logo" className="h-[18px] w-full object-contain" /> */}
          <img src={logo} alt="Logo" className="h-[102px] w-full object-contain" />
        </div>
        <div className="w-[40%] flex justify-end">
        <button
  onClick={addToCart}
  className="flex items-center justify-center bg-gray-800 text-white rounded-full py-2 px-4 hover:bg-gray-700 transition-colors duration-200"
>
  <Plus size={20} />
  <span className="font-semibold">Add to Gallery</span>
</button>
          </div>
          </div>
          </div>
  );
};

export default MainContent;