import "./App.css";
import Home from "./pages/Home";
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Reservation from "./pages/Reservation";
import Inscription from "./pages/Inscription";
import Connexion from "./pages/Connexion";
import { AuthContext } from "./helpers/AuthContext";
import { Reload } from "./helpers/Reload";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./pages/Profile";
import Administration from "./pages/Administration";
import PageNotFound from "./pages/PageNotFound";
import GererCarte from "./pages/GererCarte";
import GererGalerie from "./pages/GererGalerie";
import Schedule from "./pages/Schedule";
import Settings from "./pages/Settings";
import BookList from "./pages/BookList";
import ChangeBooking from "./pages/ChangeBooking";
import MyBookings from "./pages/MyBookings";

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

  const [reload, setReload] = useState(false);

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
        <Reload.Provider value={{ reload, setReload }}>
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
                {authState.status && (
                  <Route path='/profile' element={<Profile />} />
                )}
                {authState.status && authState.role === "admin" && (
                  <Route path='/administration' element={<Administration />} />
                )}
                <Route path='/profile' element={<Profile />} />
                {authState.status && authState.role === "admin" && (
                  <Route path='/carte' element={<GererCarte />} />
                )}
                {authState.status && authState.role === "admin" && (
                  <Route path='/galerie' element={<GererGalerie />} />
                )}
                {authState.status && authState.role === "admin" && (
                  <Route path='/horaires' element={<Schedule />} />
                )}
                {authState.status && authState.role === "admin" && (
                  <Route path='/parametres' element={<Settings />} />
                )}
                {authState.status && authState.role === "admin" && (
                  <Route path='/reservationlist' element={<BookList />} />
                )}
                {authState.status && (
                  <Route
                    path='/changeBooking/:id'
                    element={<ChangeBooking />}
                  />
                )}
                {authState.status && (
                  <Route
                    path='/myreservations/:UserId'
                    element={<MyBookings />}
                  />
                )}
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </main>
            <div>
              <Footer reload={reload} />
            </div>
          </Router>
        </Reload.Provider>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
