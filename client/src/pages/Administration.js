import React from "react";
import { Link } from "react-router-dom";
import "../styles/Administration.css";

const Administration = () => {
  return (
    <div className='administration'>
      <div className='box'>
        <Link to='/galerie' className='adminLink'>
          <h2>Galerie</h2>
        </Link>
      </div>
      <div className='box'>
        <Link to='/carte' className='adminLink'>
          <h2>Carte</h2>
        </Link>
      </div>
      <div className='box'>
        <Link to='/horaires' className='adminLink'>
          <h2>Horaires</h2>
        </Link>
      </div>
      <div className='box'>
        <Link to='/parametres' className='adminLink'>
          <h2>Paramètres</h2>
        </Link>
      </div>

      <div className='box'>
        <Link to='/reservationlist' className='adminLink'>
          <h2>Réservations</h2>
        </Link>
      </div>
    </div>
  );
};

export default Administration;
