import React, { useState, useEffect } from "react";
import axios from "axios";

function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/images");
        console.log("response.data");
        setGalleryItems(response.data);
      } catch (error) {
        console.error("Unable to fetch gallery items:", error);
      }
    };

    fetchGalleryItems();
  }, []);

  return (
    <div>
      {galleryItems.map((galleryItem) => (
        <div key={galleryItem.id}>
          <h3>{galleryItem.name}</h3>
          <img
            src={`http://localhost:3001/images/${galleryItem.id}`}
            alt={galleryItem.name}
          />
        </div>
      ))}
    </div>
  );
}

export default Gallery;
