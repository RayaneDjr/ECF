import React from "react";

const Header = () => {
  return (
    <header>
      <img src={require("../logo.png")} alt='logo' className='logo' />
      <div className='right'>
        <span>connexion</span>
        <span>créer un compte</span>
      </div>
    </header>
  );
};

export default Header;
