import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  const login = () => {
    const data = { email, password };
    axios.post("http://localhost:3001/users/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          id: response.data.id,
          firstname: response.data.firstname,
          lastname: response.data.lastname,
          email: response.data.email,
          role: response.data.role,
          guests: response.data.guests,
          allergies: response.data.allergies,
          status: true,
        });
        navigate("/");
      }
    });
  };
  return (
    <div className='box'>
      <h2>Connexion</h2>

      <div className='inputContainer'>
        <label>Email:</label>
        <input
          type='email'
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className='inputContainer'>
        <label>Password:</label>
        <input
          type='password'
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <button onClick={login} className='submit'>
        Se connecter
      </button>
    </div>
  );
};

export default Login;
