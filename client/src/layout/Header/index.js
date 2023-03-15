import React, { useContext } from "react";
import "../../styles/Header.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../helpers/AuthContext";

const Header = () => {
  const { authState, setAuthState } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      id: undefined,
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      guests: undefined,
      allergies: undefined,
      status: false,
    });
  };

  return (
    <header>
      <Link to='/'>
        <img src={require("./logo.png")} alt='logo' className='logo' />
      </Link>
      <div className='right'>
        {!authState.status ? (
          <>
            <Link to='/connexion' className='link'>
              Se connecter
            </Link>
            <Link to='/inscription' className='link'>
              Créer un compte
            </Link>
          </>
        ) : (
          <>
            <Link to='/' onClick={logout} className='link'>
              Se déconnecter
            </Link>
            <Link className='link'>{authState.email}</Link>
            {authState.role === "admin" && (
              <Link className='link'>Administration</Link>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
