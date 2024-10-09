import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import Logo1 from './assets/logo1.png';
import Logo2 from './assets/logo2.png';

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
        <span>{item.quantity || 1}</span>
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
      item.id === id ? { ...item, quantity: Math.max(1, (item.quantity || 1) + change) } : item
    ));
  };

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalShades = cart.reduce((sum, item) => sum + (item.mainWall !== 'None' ? 1 : 0) + (item.sideWall !== 'None' ? 1 : 0), 0);

  const downloadPDF = async () => {
    const doc = new jsPDF();
  
    doc.setProperties({
      title: 'Asian Paints - Cart Summary',
      subject: 'Cart Summary',
      author: 'Asian Paints',
      keywords: 'paint, colors, selection',
    });
  
    const addImageToPDF = async (imageUrl, x, y, width, height) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL('image/jpeg');
          doc.addImage(dataURL, 'JPEG', x, y, width, height);
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load image: ${imageUrl}`);
          reject();
        };
        img.src = imageUrl;
      });
    };
  
    doc.setFontSize(24);
    doc.setTextColor(41, 128, 185);
    doc.setFont("helvetica", "bold");
    doc.text("Asian Paints", 20, 20);
  
    doc.setDrawColor(200, 200, 200);
    doc.line(20, 25, 190, 25);
  
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 35);
  
    let yOffset = 45;
    const imageSize = 30;
    const cornerRadius = 5;
  
    for (const item of cart) {
      if (yOffset > 250) {
        doc.addPage();
        yOffset = 20;
      }
  
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(245, 245, 245);
      doc.roundedRect(20, yOffset, imageSize, imageSize, cornerRadius, cornerRadius, 'FD');
  
      try {
        await addImageToPDF(item.image, 20, yOffset, imageSize, imageSize);
      } catch (error) {
        doc.setFillColor(200, 200, 200);
        doc.rect(20, yOffset, imageSize, imageSize, 'F');
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text('Image', 20 + imageSize / 2, yOffset + imageSize / 2, { align: 'center', baseline: 'middle' });
      }
  
      doc.setFontSize(12);
      doc.setTextColor(70, 70, 70);
      doc.setFont("helvetica", "bold");
      doc.text(item.name, 60, yOffset + 8);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(`Primary: ${item.mainWall}`, 60, yOffset + 16);
      doc.text(`Secondary: ${item.sideWall}`, 60, yOffset + 24);
      doc.text(`Quantity: ${item.quantity || 1}`, 60, yOffset + 32);
  
      yOffset += imageSize + 10;
    }
  
    const logoSize = 60;
    const logoSpacing = 40;
    const totalLogoWidth = logoSize * 2 + logoSpacing;
    const startX = (doc.internal.pageSize.width - totalLogoWidth) / 2;
    const startY = doc.internal.pageSize.height - 50;

    const addLogo = async (logoSrc, x, y) => {
      try {
        await addImageToPDF(logoSrc, x, y, logoSize, logoSize);
      } catch (error) {
        console.error('Failed to add logo:', error);
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.text(logoSrc === Logo1 ? 'Logo1' : 'Logo2', x + logoSize / 2, y + logoSize / 2, { align: 'center', baseline: 'middle' });
      }
    };

    await addLogo(Logo1, startX, startY);
    await addLogo(Logo2, startX + logoSize + logoSpacing, startY);

    doc.save("asian-paints-cart-summary.pdf");
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
        <div className="flex justify-between font-semibold mb-2 text-xs">
          <span>Selected items</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between font-semibold mb-4 text-xs">
          <span>Total shades</span>
          <span>{totalShades}</span>
        </div>
        <div className="flex justify-between text-xl">
          <span>Subtotal</span>
          <span>{totalItems}</span>
        </div>
      </div>

      <button
        className="mt-4 bg-indigo-600 text-white py-3 px-5 rounded-xl font-semibold"
        onClick={downloadPDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default Cart;