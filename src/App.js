import "./App.css";
import "./styles.css"; // Importing the styles.css file
import Header from "./components/Header";
import Footer from "./components/Footer";
import BooksGrid from "./components/BooksGrid";
import Readlist from "./components/Readlist";
import LoginModal from "./components/LoginModal"; // adjust the path if needed

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:4000/api/";

function App() {
  const [books, setBooks] = useState([]);
  const [readlist, setReadlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");

  const handleLogin = (inputUsername, password) => {
    fetch(`${baseURL}users?name=${inputUsername}&password=${password}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.user_id) {
          setUserId(data.user_id);
          setUsername(inputUsername); // ✅ correctly stores the name
          setShowLogin(false);
        } else {
          alert("Invalid credentials");
        }
      })
      .catch((error) => console.error("Fetch error: ", error));
  };
  // Get reading list for user
  useEffect(() => {
    if (!userId) return; // If userId is null, undefined, 0, '', stop here

    fetch(`${baseURL}users/${userId}/reading_list/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data.data)) {
          const ids = data.data.map((book) => book.id); // only store IDs
          setReadlist(ids);
          console.log("Readlist (IDs):", ids);
        } else {
          console.error("Fetched reading list is not an array:", data);
        }
      })
      .catch((error) => console.error("Fetch error: ", error));
  }, [userId]);

  // Get books from database
  useEffect(() => {
    fetch(`${baseURL}books`)
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

  // Toggle the readlist state (add/remove books)
  const toggleReadlist = (bookId) => {
    const isInList = readlist.includes(bookId);
    // Determine the method based on whether the book is already in the list
    // If the book is in the list, we want to remove it (DELETE)
    // If the book is not in the list, we want to add it (POST)
    const method = isInList ? "DELETE" : "POST";

    // Optimistically update state
    setReadlist((prev) =>
      isInList ? prev.filter((id) => id !== bookId) : [...prev, bookId]
    );

    // Send the API call
    fetch(
      // For DELETE requests, the book ID is in the URL
      `${baseURL}users/${userId}/reading_list${isInList ? `/${bookId}` : ""}`,
      {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        // For POST requests, we need to send the book ID in the body
        ...(method === "POST"
          ? { body: JSON.stringify({ book_id: bookId }) }
          : {}),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the readlist on the server.");
        }
      })
      .catch((error) => {
        console.error("Error updating readlist:", error);
      });
  };
  return (
    <div className="App">
      <div className="container">
        <Header></Header>
        <div className="login-container">
          {userId ? (
            <span className="user-greeting">Welcome, {username}</span>
          ) : (
            <button className="login-button" onClick={() => setShowLogin(true)}>
              Login
            </button>
          )}
        </div>
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLogin={handleLogin}
          />
        )}
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
