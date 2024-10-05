import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { jsPDF } from "jspdf";

const CartItem = ({ item, onRemove, onQuantityChange }) => (
  <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-4">
    <div className="flex items-center space-x-4">
      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-md object-cover" />
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-500">
          Primary shade: {item.mainWall}, Secondary shade: {item.sideWall}
        </p>
      </div>
    </div>
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <button onClick={() => onQuantityChange(item.id, -1)} className="text-gray-500">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => onQuantityChange(item.id, 1)} className="text-gray-500">+</button>
      </div>
      <button onClick={() => onRemove(item.id)} className="text-red-500">
        <Trash2 size={20} />
      </button>
    </div>
  </div>
);

const Cart = ({ cart, setCart }) => {
  const removeItem = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const changeQuantity = (id, change) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    ));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalShades = cart.reduce((sum, item) => sum + (item.mainWall !== 'None' ? 1 : 0) + (item.sideWall !== 'None' ? 1 : 0), 0);

  const downloadPDF = () => {
    const doc = new jsPDF();
    let yOffset = 20;

    doc.setFontSize(20);
    doc.text("Asian Paints - Color Selection", 20, yOffset);
    yOffset += 20;

    cart.forEach((item, index) => {
      doc.setFontSize(14);
      doc.text(`${index + 1}. ${item.name}`, 20, yOffset);
      yOffset += 10;
      doc.setFontSize(12);
      doc.text(`Primary shade: ${item.mainWall}`, 30, yOffset);
      yOffset += 10;
      doc.text(`Secondary shade: ${item.sideWall}`, 30, yOffset);
      yOffset += 10;
      doc.text(`Quantity: ${item.quantity}`, 30, yOffset);
      yOffset += 20;
    });

    doc.save("asian-paints-selection.pdf");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <div className="flex items-center mb-6">
        <Link to="/" className="text-gray-600">
          <ChevronLeft size={24} />
        </Link>
        <h1 className="text-2xl font-bold ml-4">Gallery</h1>
        <div className="ml-auto">
          <span className="bg-red-500 text-white rounded-full px-2 py-1 text-xs">
            {cart.length}
          </span>
        </div>
      </div>

      <div className="flex-grow">
        {cart.map(item => (
          <CartItem 
            key={item.id} 
            item={item} 
            onRemove={removeItem} 
            onQuantityChange={changeQuantity}
          />
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mt-4">
        <div className="flex justify-between mb-2">
          <span>Selected items</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Total shades</span>
          <span>{totalShades}</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Subtotal</span>
          <span>{totalItems}</span>
        </div>
      </div>

      <button 
        className="mt-4 bg-indigo-600 text-white py-3 rounded-lg font-semibold"
        onClick={downloadPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default Cart;