import React from "react";
import Gallery from "../components/Gallery";
import Carte from "../components/Carte";
import "../styles/Home.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className='container'>
        <Link to='/reservation'>
          <button type='button' className='reservation'>
            Réserver
          </button>
        </Link>
        <div>
          <Gallery />
        </div>
      </div>
      <Carte />
    </div>
  );
};

export default Home;
