import React from "react";
import Header from "../layout/Header";
import Gallery from "../components/Gallery";
import Carte from "../components/Carte";
import "../styles/Home.css";

const Home = () => {
  return (
    <>
      <Header />
      <div className='container'>
        <div className='reservationContainer'>
          <button type='button' className='reservation'>
            Réserver
          </button>
        </div>
        <div className='gallery'>
          <Gallery />
        </div>
      </div>
      <Carte />
    </>
  );
};

export default Home;
