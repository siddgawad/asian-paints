import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./App.css";

// Import components
import Cart from "./Cart";
import ColorPalette from "./components/ColorPalette";
import Header from "./components/Header";
import FlowerSelector from "./components/FlowerSelector";

// Import assets
import {
  bedroom_bg,
  bedroom,
  default_img,
  livingroom,
  flower1,
  flower2,
  flower3,
  flower4,
  flower5,
  flower6,
  logo,
} from "./assets";

const colorPalettes = [
  {
    name: "Red",
    primary: [
      { hex: "#FFEBEE", name: "Khaskhas" },
      { hex: "#FFCDD2", name: "Julie" },
      { hex: "#EF9A9A", name: "Cherry" },
      { hex: "#E57373", name: "Crimson" },
      { hex: "#EF5350", name: "Rose" },
      { hex: "#F44336", name: "Ruby" },
    ],
    secondary: [
      { hex: "#FCE4EC", name: "Blush" },
      { hex: "#F8BBD0", name: "Pinkish" },
      { hex: "#F48FB1", name: "Peony" },
      { hex: "#F06292", name: "Flamingo" },
      { hex: "#EC407A", name: "Coral" },
      { hex: "#E91E63", name: "Magenta" },
    ],
    image: flower1,
  },
  {
    name: "Green",
    primary: [
      { hex: "#E8F5E9", name: "Mint" },
      { hex: "#C8E6C9", name: "Lime" },
      { hex: "#A5D6A7", name: "Emerald" },
      { hex: "#81C784", name: "Forest" },
      { hex: "#66BB6A", name: "Olive" },
      { hex: "#4CAF50", name: "Fern" },
    ],
    secondary: [
      { hex: "#F1F8E9", name: "Pastel" },
      { hex: "#DCEDC8", name: "Chartreuse" },
      { hex: "#C5E1A5", name: "Sage" },
      { hex: "#AED581", name: "Basil" },
      { hex: "#9CCC65", name: "Sprout" },
      { hex: "#8BC34A", name: "Verdant" },
    ],
    image: flower2,
  },
  {
    name: "Blue",
    primary: [
      { hex: "#E3F2FD", name: "Sky" },
      { hex: "#BBDEFB", name: "Cloud" },
      { hex: "#90CAF9", name: "Ocean" },
      { hex: "#64B5F6", name: "Azure" },
      { hex: "#42A5F5", name: "Cyan" },
      { hex: "#2196F3", name: "Marine" },
    ],
    secondary: [
      { hex: "#E1F5FE", name: "Frost" },
      { hex: "#B3E5FC", name: "Ice" },
      { hex: "#81D4FA", name: "Wave" },
      { hex: "#4FC3F7", name: "Teal" },
      { hex: "#29B6F6", name: "Aqua" },
      { hex: "#03A9F4", name: "Bluebell" },
    ],
    image: flower3,
  },
  {
    name: "Yellow",
    primary: [
      { hex: "#FFFDE7", name: "Butter" },
      { hex: "#FFF9C4", name: "Daisy" },
      { hex: "#FFF59D", name: "Lemon" },
      { hex: "#FFF176", name: "Gold" },
      { hex: "#FFEE58", name: "Sun" },
      { hex: "#FFEB3B", name: "Amber" },
    ],
    secondary: [
      { hex: "#FFF8E1", name: "Cream" },
      { hex: "#FFECB3", name: "Honey" },
      { hex: "#FFE082", name: "Pineapple" },
      { hex: "#FFD54F", name: "Canary" },
      { hex: "#FFCA28", name: "Marigold" },
      { hex: "#FFC107", name: "Goldenrod" },
    ],
    image: flower4,
  },
  {
    name: "Purple",
    primary: [
      { hex: "#F3E5F5", name: "Lavender" },
      { hex: "#E1BEE7", name: "Lilac" },
      { hex: "#CE93D8", name: "Amethyst" },
      { hex: "#BA68C8", name: "Orchid" },
      { hex: "#AB47BC", name: "Grape" },
      { hex: "#9C27B0", name: "Violet" },
    ],
    secondary: [
      { hex: "#EDE7F6", name: "Mauve" },
      { hex: "#D1C4E9", name: "Periwinkle" },
      { hex: "#B39DDB", name: "Plum" },
      { hex: "#9575CD", name: "Purple Heart" },
      { hex: "#7E57C2", name: "Amethyst" },
      { hex: "#673AB7", name: "Indigo" },
    ],
    image: flower5,
  },
  {
    name: "Orange",
    primary: [
      { hex: "#FFF3E0", name: "Peach" },
      { hex: "#FFE0B2", name: "Apricot" },
      { hex: "#FFCC80", name: "Amber" },
      { hex: "#FFB74D", name: "Copper" },
      { hex: "#FFA726", name: "Tangerine" },
      { hex: "#FF9800", name: "Marmalade" },
    ],
    secondary: [
      { hex: "#FBE9E7", name: "Salmon" },
      { hex: "#FFCCBC", name: "Coral" },
      { hex: "#FFAB91", name: "Salmon" },
      { hex: "#FF8A65", name: "Rust" },
      { hex: "#FF7043", name: "Sunset" },
      { hex: "#FF5722", name: "Carrot" },
    ],
    image: flower6,
  },
];
const initialState = {
  selectedFlower: null,
  selectedMainWallColor: null,
  selectedSideWallColor: null,
  selectedRoom: bedroom,
  mainWallColors: [],
  sideWallColors: [],
};

function App() {
  const [state, setState] = useState(initialState);
  const [cart, setCart] = useLocalStorage("cart", []);

  const getColorOverlay = (color) => {
    if (!color) return 'rgba(0, 0, 0, 0)';
    const hex = color.hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 1)`; // Full opacity for solid color
  };


  const handleFlowerSelection = (flowerKey) => {
    const palette = colorPalettes[flowerKey];
    setState((prev) => ({
      ...prev,
      selectedFlower: prev.selectedFlower === palette.image ? null : palette.image,
      mainWallColors: prev.selectedFlower === palette.image ? [] : palette.primary,
      sideWallColors: prev.selectedFlower === palette.image ? [] : palette.secondary,
      selectedMainWallColor: null,
      selectedSideWallColor: null,
    }));
  };

  const handleColorSelection = (type, color) => {
    setState((prev) => ({
      ...prev,
      [type === "main" ? "selectedMainWallColor" : "selectedSideWallColor"]:
        prev[type === "main" ? "selectedMainWallColor" : "selectedSideWallColor"]?.hex === color.hex
          ? null
          : color,
    }));
  };

  const handleRoomChange = (roomType) => {
    setState((prev) => ({
      ...prev,
      selectedRoom: roomType === "bedroom" ? bedroom : livingroom,
    }));
  };

  const addToCart = () => {
    const { selectedMainWallColor, selectedSideWallColor, selectedFlower } = state;

    if (selectedMainWallColor || selectedSideWallColor) {
      const newItem = {
        id: Date.now(),
        name: selectedFlower
          ? Object.keys(colorPalettes).find((key) => colorPalettes[key].image === selectedFlower)
          : "Custom",
        mainWall: selectedMainWallColor?.name || "None",
        sideWall: selectedSideWallColor?.name || "None",
        quantity: 1,
        image: selectedFlower || "placeholder-image.png",
      };
      setCart([...cart, newItem]);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route
          path="/"
          element={
            <div className="flex flex-col min-h-screen bg-gray-100">
              <div className="relative h-[50vh] overflow-hidden">
                {/* Background layer (Image 2) */}
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    backgroundColor: getColorOverlay(state.selectedMainWallColor),
                    maskImage: `url(${bedroom})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'center',
                    WebkitMaskImage: `url(${bedroom})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                  }}
                />
                {/* Foreground layer (Image 1) */}
                <img
                  src={default_img}
                  className="absolute inset-0 z-10 w-full h-full object-contain"
                  alt="Motorcycle"
                />
              </div>

              <div className="container mx-auto px-4 py-8">
                <Header
                  selectedFlower={state.selectedFlower}
                  selectedMainWallColor={state.selectedMainWallColor}
                  selectedSideWallColor={state.selectedSideWallColor}
                  onRoomChange={handleRoomChange}
                />

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

                {/* Keep the logo and cart buttons as they were */}
                <div className="mt-8 grid grid-cols-3">
                  <div className="col-span-2 flex justify-center items-center shadow">
                    <img src={logo} alt="Logo" className="h-[102px] w-full object-contain" />
                  </div>

                  <div className="flex flex-col">
                    <button
                      onClick={addToCart}
                      className="flex justify-center items-center shadow h-[50px] bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                    >
                      Add to Cart {cart.length > 0 && `(${cart.length})`}
                    </button>
                    <Link
                      to="/cart"
                      className="flex justify-center items-center gap-2 shadow h-[50px] bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
                    >
                      Go to Cart
                      {cart.length > 0 && (
                        <span className="bg-red-600 text-white rounded-full px-2 text-xs">
                          {cart.length}
                        </span>
                      )}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;