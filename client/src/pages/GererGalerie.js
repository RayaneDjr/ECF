import axios from "axios";
import React, { useState, useEffect } from "react";
import Gallery from "../components/Gallery";
import deleteIcon from "../icons/delete.svg";
import "../styles/GererGallery.css";

const GererGalerie = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [reload, setReload] = useState(false);
  const [galleryItems, setGalleryItems] = useState([]);

  const fetchGalleryItems = async () => {
    try {
      const response = await axios.get("http://localhost:3001/images");
      setGalleryItems(response.data);
    } catch (error) {
      console.error("Unable to fetch gallery items:", error);
    }
  };

  const handleChange = (e) => {
    if (
      e.target.files[0].type === "image/jpeg" ||
      e.target.files[0].type === "image/png"
    ) {
      setError(false);
      setData({ image: e.target.files[0] });
    } else {
      setError(true);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!error) {
      axios
        .post("http://localhost:3001/images", data, {
          headers: {
            "content-type": "multipart/form-data",
            accessToken: localStorage.getItem("accessToken"),
          },
        })
        .then(() => {
          setReload(!reload);
          fetchGalleryItems();
        });
    }
  };

  const deleteImage = (id) => {
    axios
      .delete(`http://localhost:3001/images/${id}`, {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then(() => {
        setReload(!reload);
        fetchGalleryItems();
      });
  };

  useEffect(() => {
    fetchGalleryItems();
  }, []);

  return (
    <div>
      <form className='box manageGalleryContainer' onSubmit={onSubmit}>
        <h2>Ajouter une image</h2>
        <div className='inputContainer'>
          <label>Choisir une image: (.jpg, .jpeg, .png)</label>
          {error && (
            <span className='error'>Sélectionnez une image valide</span>
          )}
          <input type='file' onChange={handleChange} />
        </div>
        <button type='submit' className='submit'>
          Ajouter
        </button>
        <div className='inputContainer'>
          {galleryItems.map((galleryItem) => {
            return (
              <div key={galleryItem.id}>
                {galleryItem.name}
                <img
                  src={deleteIcon}
                  alt='deleteIcon'
                  className='delete'
                  onClick={() => deleteImage(galleryItem.id)}></img>
              </div>
            );
          })}
        </div>
      </form>
      <div className='galleryContainer'>
        <Gallery reload={reload} />
      </div>
    </div>
  );
};

export default GererGalerie;
