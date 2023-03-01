import React from "react";
import "../../styles/Header.css";

const Header = () => {
  return (
    <header>
      <img src={require("./logo.png")} alt='logo' className='logo' />
      <div className='right'>
        <span>connexion</span>
        <span>créer un compte</span>
      </div>
    </header>
  );
};

export default Header;
