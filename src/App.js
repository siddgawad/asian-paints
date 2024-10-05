import React, { useState } from "react";
import "./App.css";
import bedroom from "../src/assets/bedroom.jpeg";
import flower1 from "../src/assets/flower1.jpeg";
import flower2 from "../src/assets/flower2.jpeg";
import flower3 from "../src/assets/flower3.jpeg";
import flower4 from "../src/assets/flower4.jpeg";
import flower5 from "../src/assets/flower5.jpeg";
import flower6 from "../src/assets/flower6.jpeg";

const colors = [
  {
    name: "Red",
    primary: ["#FFEBEE", "#FFCDD2", "#EF9A9A", "#E57373", "#EF5350", "#F44336"],
    secondary: ["#FCE4EC", "#F8BBD0", "#F48FB1", "#F06292", "#EC407A", "#E91E63"],
    image: flower1,
  },
  {
    name: "Green",
    primary: ["#E8F5E9", "#C8E6C9", "#A5D6A7", "#81C784", "#66BB6A", "#4CAF50"],
    secondary: ["#F1F8E9", "#DCEDC8", "#C5E1A5", "#AED581", "#9CCC65", "#8BC34A"],
    image: flower2,
  },
  {
    name: "Blue",
    primary: ["#E3F2FD", "#BBDEFB", "#90CAF9", "#64B5F6", "#42A5F5", "#2196F3"],
    secondary: ["#E1F5FE", "#B3E5FC", "#81D4FA", "#4FC3F7", "#29B6F6", "#03A9F4"],
    image: flower3,
  },
  {
    name: "Yellow",
    primary: ["#FFFDE7", "#FFF9C4", "#FFF59D", "#FFF176", "#FFEE58", "#FFEB3B"],
    secondary: ["#FFF8E1", "#FFECB3", "#FFE082", "#FFD54F", "#FFCA28", "#FFC107"],
    image: flower4,
  },
  {
    name: "Purple",
    primary: ["#F3E5F5", "#E1BEE7", "#CE93D8", "#BA68C8", "#AB47BC", "#9C27B0"],
    secondary: ["#EDE7F6", "#D1C4E9", "#B39DDB", "#9575CD", "#7E57C2", "#673AB7"],
    image: flower5,
  },
  {
    name: "Orange",
    primary: ["#FFF3E0", "#FFE0B2", "#FFCC80", "#FFB74D", "#FFA726", "#FF9800"],
    secondary: ["#FBE9E7", "#FFCCBC", "#FFAB91", "#FF8A65", "#FF7043", "#FF5722"],
    image: flower6,
  },
];

function App() {
  const [mainWallColors, setMainWallColors] = useState(Array(6).fill("#000000"));
  const [sideWallColors, setSideWallColors] = useState(Array(6).fill("#000000"));

  const handleFlowerClick = (index) => {
    setMainWallColors(colors[index].primary);
    setSideWallColors(colors[index].secondary);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        <div className="relative top-0 h-[30]">
          <img
            src={bedroom}
            className="rounded-6xl object-cover w-full"
            alt="bedroom"
          />
        </div>

        <div className="grid gap-1 grid-cols-6 mt-2 ml-2 mr-2">
          <div className="flex justify-center items-center col-span-1 shadow h-[40px] bg-black text-white">
            sid
          </div>
          <div className="flex justify-center items-center shadow col-span-3 h-[40px] bg-black text-white">
            sid
          </div>
          <div className="flex justify-center items-center shadow col-span-2 h-[40px] bg-black text-white">
            sid
          </div>
        </div>

        <div className="min-h-[10px] bg-black text-white mt-2 ml-2 mr-2">
          Main Wall
        </div>

        <div className="grid gap-1 grid-cols-6 mt-2 ml-2 mr-2">
          {mainWallColors.map((color, index) => (
            <div
              key={index}
              className="flex justify-center items-center col-1 h-[30px] text-black"
              style={{ backgroundColor: color }}
            >
              {colors[index].name}
            </div>
          ))}
        </div>

        <div className="min-h-[10px] bg-black text-white mt-2 ml-2 mr-2">
          Side Wall
        </div>

        <div className="grid gap-1 grid-cols-6 mt-2 ml-2 mr-2">
          {sideWallColors.map((color, index) => (
            <div
              key={index}
              className="flex justify-center items-center col-1 h-[30px] text-black"
              style={{ backgroundColor: color }}
            >
              {colors[index].name}
            </div>
          ))}
        </div>

        <div className="grid gap-1 grid-cols-6 mt-2 ml-2 mr-2">
          {colors.map((color, index) => (
            <div
              key={index}
              className="flex justify-center items-center col-1 min-h-[100px]"
            >
              <button onClick={() => handleFlowerClick(index)}>
                <img
                  src={color.image}
                  className="object-fill w-full"
                  alt={`${color.name} flower`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-1 grid-cols-6 mt-2 ml-2 mb-2">
        <div className="flex justify-center items-center col-span-3 shadow min-h-[100px] bg-black text-white">
          sid footer
        </div>
        <div className="flex justify-center items-center shadow col-span-3 min-h-[100px] bg-black text-white rounded-tl-[70px]">
          sid footer
        </div>
      </div>
    </div>
  );
}

export default App;