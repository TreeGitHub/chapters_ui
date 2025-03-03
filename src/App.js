import "./App.css";
import "./styles.css"; // Importing the styles.css file
import Header from "./components/Header";
import Footer from "./components/Footer";
import BooksGrid from "./components/BooksGrid";
import Wishlist from "./components/Wishlist";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <div className="containr">
        <Header></Header>

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Wishlist">Wish List</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<BooksGrid />}></Route>
            <Route path="/watchlist" element={<Wishlist />}></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
