import "./App.css";
import Carte from "./components/Carte";
import Gallery from "./components/Gallery";
import Header from "./layout/Header";

function App() {
  return (
    <div className='App'>
      <Header />
      <Gallery />
      <Carte />
    </div>
  );
}

export default App;
