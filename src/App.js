import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useLocalStorage } from "./hooks/useLocalStorage";
import Cookies from 'js-cookie';
import "./App.css";
// Import components
import Cart from "./Cart";
import Header from "./components/Header";
import Login from "./components/Login";
import VideoPlayer from './components/Video';
import MainContent from './components/MainContent';
// Import assets and color palettes
import { bedroom, livingroom } from "./assets";
import colorPalettes from './data/colorPalettes';
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
  const [gallery, setGallery] = useLocalStorage("gallery", []);
  const [showVideo, setShowVideo] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const { username } = JSON.parse(userCookie);
      const storedUserData = localStorage.getItem(username);
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
        setIsLoggedIn(true);
      }
    }
  }, []);
  const resetAppState = () => {
    setState(initialState);
    setCart([]);
  };
  const handleLoginSuccess = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
  };
  // ... (keep other functions like getColorOverlay, handleFlowerSelection, handleColorSelection, handleRoomChange)
  const getColorOverlay = (color) => {
    if (!color) return "rgba(0, 0, 0, 0)";
    const hex = color.hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, 1)`;
  };
  const handleFlowerSelection = (flowerKey) => {
    const palette = colorPalettes[flowerKey];
    const isSelected = state.selectedFlower === palette.image;
    setState((prev) => ({
      ...prev,
      selectedFlower: isSelected ? null : palette.image,
      mainWallColors: isSelected ? [] : palette.primary,
      sideWallColors: isSelected ? [] : palette.secondary,
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
        image: selectedFlower || "placeholder-image.png",
        quantity: 1,
      };
      const updatedCart = [...cart, newItem];
      setCart(updatedCart);
      // Update user data in local storage
      if (userData) {
        const updatedUserData = { ...userData, cart: updatedCart };
        localStorage.setItem(userData.username, JSON.stringify(updatedUserData));
        setUserData(updatedUserData);
      }
    } else {
      alert("Please select at least one wall color before adding to cart.");
    }
  };
  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    // Update user data in local storage
    if (userData) {
      const updatedUserData = { ...userData, cart: updatedCart };
      localStorage.setItem(userData.username, JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
    }
  };
  const handleVideoEnd = () => {
    setShowVideo(false);
  };
  const Main = () => (
    <>
      <Header
        selectedFlower={state.selectedFlower}
        selectedMainWallColor={state.selectedMainWallColor}
        selectedSideWallColor={state.selectedSideWallColor}
        onRoomChange={handleRoomChange}
      />
      <MainContent
        state={state}
        getColorOverlay={getColorOverlay}
        handleColorSelection={handleColorSelection}
        handleFlowerSelection={handleFlowerSelection}
        addToCart={addToCart}
        cart={cart}
        handleRemove={handleRemove}
        colorPalettes={colorPalettes}
        userData={userData}
      />
    </>
  );
  return (
    <Router>
      <Routes>
        <Route
          path="/cart"
          element={isLoggedIn ? <Cart cart={cart} setCart={setCart} userData={userData} /> : <Navigate to="/login" />}
        />
        <Route
          path="/"
          element={showVideo ? (
            <VideoPlayer videoplayer={showVideo} setShowVideo={setShowVideo} onVideoEnd={handleVideoEnd} />
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route
          path="/login"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              onLoginSuccess={handleLoginSuccess}
              resetAppState={resetAppState}
            />
          }
        />
        <Route
          path="/main"
          element={isLoggedIn ? <Main /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}
export default App;