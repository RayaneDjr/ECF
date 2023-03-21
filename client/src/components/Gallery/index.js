import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/Gallery.css";
import BtnSlider from "./BtnSlider";

function Gallery({ reload }) {
  const [galleryItems, setGalleryItems] = useState([]);
  const [slideIndex, setSlideIndex] = useState(1);

  useEffect(() => {
    const fetchGalleryItems = async () => {
      try {
        const response = await axios.get("http://localhost:3001/images");
        setSlideIndex(1);
        setGalleryItems(response.data);
      } catch (error) {
        console.error("Unable to fetch gallery items:", error);
      }
    };

    fetchGalleryItems();
  }, [reload]);

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

      {galleryItems.length === 0 && (
        <>
          <div className={slideIndex === 0 + 1 ? "slide active-anim" : "slide"}>
            <img
              src='https://cdn.signitic.fr/6267b6cdb7325944795758.png'
              alt='imageDefault'
            />
          </div>
          <BtnSlider moveSlide={() => setSlideIndex(1)} direction={"next"} />
          <BtnSlider moveSlide={() => setSlideIndex(1)} direction={"prev"} />

          <div className='container-dots'>
            <div
              onClick={() => moveDot(0 + 1)}
              className={slideIndex === 0 + 1 ? "dot active" : "dot"}></div>
          </div>
        </>
      )}
    </div>
  );
}

export default Gallery;
