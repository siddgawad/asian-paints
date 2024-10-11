import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const RoomSelector = ({ onRoomChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState('bedroom');

  const rooms = [
    { value: 'bedroom', label: 'Bedroom' },
    { value: 'livingroom', label: 'Living Room' },
    // { value: 'kitchen', label: 'Kitchen' },
    // { value: 'bathroom', label: 'Bathroom' },
  ];

  const handleSelect = (room) => {
    setSelectedRoom(room.value);
    onRoomChange(room.value);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-800 border border-gray-300 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 float-right"
          onClick={() => setIsOpen(!isOpen)}
        >
          {rooms.find(room => room.value === selectedRoom).label}
          <ChevronDown className="w-5 h-5 ml-2 -mr-1" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-4 w-auto mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {rooms.map((room) => (
              <button
                key={room.value}
                className="block w-full px-4 py-2 text-xs text-gray-700 text-left bg-transparent hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
                onClick={() => handleSelect(room)}
              >
                {room.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomSelector;
