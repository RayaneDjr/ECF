import "./App.css";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Reservation from "./pages/Reservation";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import { AuthContext } from "./helpers/AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./pages/Profile";

function App() {
  const [authState, setAuthState] = useState({
    id: undefined,
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    guests: undefined,
    allergies: undefined,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/users/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
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
        }
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className='App'>
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div>
            <Header />
          </div>
          <main>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/reservation' element={<Reservation />} />
              <Route path='/inscription' element={<Inscription />} />
              <Route path='/connexion' element={<Connexion />} />
              <Route path='/profile/:id' element={<Profile />} />
            </Routes>
          </main>
          <div>
            <Footer />
          </div>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
