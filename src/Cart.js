import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Trash2 } from 'lucide-react';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

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
    
    // Set document properties
    doc.setProperties({
      title: 'Asian Paints - Color Selection',
      subject: 'Cart Summary',
      author: 'Asian Paints',
      keywords: 'paint, colors, selection',
      creator: 'Asian Paints Web Application'
    });
  
    // Add header
    doc.setFontSize(24);
    doc.setTextColor(41, 128, 185); // Professional blue color
    doc.setFont("helvetica", "bold");
    doc.text("Asian Paints", 20, 20);
    doc.setFontSize(18);
    doc.setTextColor(70, 70, 70); // Dark gray
    doc.setFont("helvetica", "normal");
    doc.text("Color Selection", 20, 30);
  
    // Add horizontal line
    doc.setDrawColor(200, 200, 200); // Light gray
    doc.line(20, 35, 190, 35);
  
    // Add date and reference number
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Medium gray
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 45);
    doc.text(`Ref: AP${Math.random().toString(36).substr(2, 9).toUpperCase()}`, 20, 51);
  
    // Add summary
    doc.setFontSize(12);
    doc.setTextColor(70, 70, 70); // Dark gray
    doc.setFont("helvetica", "bold");
    doc.text("Order Summary", 20, 65);
    doc.setFont("helvetica", "normal");
    doc.text(`Total Items: ${totalItems}`, 20, 75);
    doc.text(`Total Shades: ${totalShades}`, 20, 82);
  
    // Prepare data for the table
    const tableData = cart.map(item => [
      item.name,
      item.mainWall,
      item.sideWall,
      item.quantity.toString()
    ]);
    
    // Add table
    doc.autoTable({
      startY: 90,
      head: [['Flower', 'Primary Shade', 'Secondary Shade', 'Quantity']],
      body: tableData,
      theme: 'grid',
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: 70,
        fontSize: 10
      },
      alternateRowStyles: { fillColor: [245, 250, 254] },
      columnStyles: {
        0: { cellWidth: 50 },
        1: { cellWidth: 50 },
        2: { cellWidth: 50 },
        3: { cellWidth: 'auto', halign: 'center' }
      },
      margin: { top: 20, bottom: 20 },
      didDrawPage: function(data) {
        // Header
        doc.setFontSize(10);
        doc.setTextColor(100, 100, 100);
        doc.text("Asian Paints - Color Selection", data.settings.margin.left, 10);
  
        // Footer
        const pageCount = doc.internal.getNumberOfPages();
        doc.setFontSize(10);
        doc.text(`Page ${data.pageNumber} of ${pageCount}`, data.settings.margin.left, doc.internal.pageSize.height - 10);
      }
    });
    
    // Add images in a single line
    let yOffset = doc.lastAutoTable.finalY + 20;
    const imageSize = 30; // Reduced image size
    const imagesPerRow = 5; // Number of images per row
    const spacing = 10; // Spacing between images
  
    for (let i = 0; i < cart.length; i += imagesPerRow) {
      if (yOffset > 250) {
        doc.addPage();
        yOffset = 20;
      }
  
      const rowItems = cart.slice(i, i + imagesPerRow);
      let xOffset = 20;
  
      rowItems.forEach((item) => {
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(70, 70, 70);
        doc.text(item.name, xOffset, yOffset, { maxWidth: imageSize + spacing });
        
        doc.setFontSize(6);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text(`P: ${item.mainWall}`, xOffset, yOffset + 8, { maxWidth: imageSize + spacing });
        doc.text(`S: ${item.sideWall}`, xOffset, yOffset + 12, { maxWidth: imageSize + spacing });
  
        try {
          doc.addImage(item.image, 'JPEG', xOffset, yOffset + 16, imageSize, imageSize);
        } catch (error) {
          console.error(`Failed to add image for ${item.name}:`, error);
          doc.setFontSize(6);
          doc.setTextColor(150, 150, 150);
          doc.text('Image not available', xOffset, yOffset + 26, { maxWidth: imageSize });
        }
  
        xOffset += imageSize + spacing;
      });
  
      yOffset += imageSize + 40; // Move to the next row
    }
    
    // Add a thank you note
    doc.addPage();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(41, 128, 185);
    doc.text("Thank You for Your Selection!", 105, 20, null, null, "center");
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(70, 70, 70);
    const thankYouText = "We appreciate your trust in Asian Paints. Our team is dedicated to bringing your color vision to life. If you have any questions about your selection or need further assistance, please don't hesitate to contact our customer service.";
    doc.text(thankYouText, 20, 40, { maxWidth: 170, align: "justify" });
    
    doc.save("asian-paints-color-selection.pdf");
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