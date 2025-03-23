import "./App.css";
import "./styles.css"; // Importing the styles.css file
import Header from "./components/Header";
import Footer from "./components/Footer";
import BooksGrid from "./components/BooksGrid";
import Readlist from "./components/Readlist";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [books, setBooks] = useState([]);
  const [readlist, setReadlist] = useState([]);

  // Get data from file
  /* useEffect(() => {
    fetch("books.json")
      .then((Response) => Response.json())
      .then((data) => setBooks(data));
  }, []);
*/

  // Get data from database
  useEffect(() => {
    fetch("http://localhost:4000/api/books")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        // Extract the books array from the 'data' property
        if (Array.isArray(data.data)) {
          setBooks(data.data); // Assuming the books are in the 'data' property
        } else {
          console.error("Fetched data is not an array:", data);
        }
      })
      .catch((error) => console.error("Fetch error: ", error));
  }, []);

  const toggleReadlist = (bookId) => {
    setReadlist((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };
  return (
    <div className="App">
      <div className="container">
        <Header></Header>

        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Readlist">Readlist</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route
              path="/"
              element={
                <BooksGrid
                  books={books}
                  readlist={readlist}
                  toggleReadlist={toggleReadlist}
                />
              }
            ></Route>
            <Route
              path="/readlist"
              element={
                <Readlist
                  readlist={readlist}
                  books={books}
                  toggleReadlist={toggleReadlist}
                />
              }
            ></Route>
          </Routes>
        </Router>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App;
