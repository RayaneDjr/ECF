import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Gallery.css";
import BtnSlider from "./BtnSlider";

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

  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== galleryItems.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === galleryItems.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(galleryItems.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className='container-slider'>
      {galleryItems.map((galleryItem, index) => {
        return (
          <div
            key={galleryItem.id}
            className={
              slideIndex === index + 1 ? "slide active-anim" : "slide"
            }>
            <img
              src={`http://localhost:3001/images/${galleryItem.id}`}
              alt={galleryItem.name}
            />
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction={"next"} />
      <BtnSlider moveSlide={prevSlide} direction={"prev"} />

      <div className='container-dots'>
        {galleryItems.map((item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? "dot active" : "dot"}></div>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
