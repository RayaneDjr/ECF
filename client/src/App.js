import "./App.css";
import Home from "./pages/Home";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Reservation from "./pages/Reservation";

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/reservation' element={<Reservation />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
