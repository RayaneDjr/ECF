import React from "react";
import { Link } from "react-router-dom";
import "../styles/Administration.css";

const Administration = () => {
  return (
    <div className='administration'>
      <div className='box'>
        <Link to='/galerie'>
          <h2>Galerie</h2>
        </Link>
      </div>
      <div className='box'>
        <Link to='/carte'>
          <h2>Carte</h2>
        </Link>
      </div>
      <div className='box'>
        <Link to='/parametres'>
          <h2>Paramètres</h2>
        </Link>
      </div>
    </div>
  );
};

export default Administration;
