import React from "react";
import Header from "../layout/Header";
import Gallery from "../components/Gallery";
import Carte from "../components/Carte";
import "../styles/Home.css";
import Footer from "../layout/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
};

export default Home;
