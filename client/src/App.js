import "./App.css";
import Carte from "./components/Carte";
import Gallery from "./components/Gallery";
import Header from "./layout/Header";

function App() {
  return (
    <div className='App'>
      <img
        className='bg'
        src='https://www.sushitimes.fr/wp-content/uploads/2020/04/italian-food-background-1.jpg'
        alt='bg'
      />
      <Header />
      <Gallery />
      <Carte />
    </div>
  );
}

export default App;
