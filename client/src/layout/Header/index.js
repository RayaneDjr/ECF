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
              se connecter
            </Link>
            <Link to='/inscription' className='link'>
              créer un compte
            </Link>
          </>
        ) : (
          <>
            <Link to='/' onClick={logout} className='link'>
              se déconnecter
            </Link>
            {authState.role === "admin" && (
              <Link to='/administration' className='link'>
                administration
              </Link>
            )}
            <Link to='/profile' className='link'>
              {authState.email}
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
