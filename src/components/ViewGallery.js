import React from 'react';

const GalleryView = ({ gallery, onRemove }) => {
  console.log('GalleryView rendered, onRemove:', onRemove);

  if (!Array.isArray(gallery) || gallery.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Gallery</h2>
        <p>No items in the gallery.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Gallery</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {gallery.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-2" />
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Main Wall:</strong> {item.mainWall}</p>
            <p><strong>Side Wall:</strong> {item.sideWall}</p>
            <button 
              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                console.log('Remove button clicked for item:', item.id);
                if (typeof onRemove === 'function') {
                  try {
                    onRemove(item.id);
                    console.log('onRemove called successfully for item:', item.id);
                  } catch (error) {
                    console.error('Error calling onRemove:', error);
                  }
                } else {
                  console.error('onRemove is not a function:', onRemove);
                }
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryView;