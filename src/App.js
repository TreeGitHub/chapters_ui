import "./App.css";
import "./styles.css"; // Importing the styles.css file
import Header from "./components/Header";
import Footer from "./components/Footer";
import BooksGrid from "./components/BooksGrid";
import Readlist from "./components/Readlist";
import LoginModal from "./components/LoginModal";
import SignUp from "./components/SignUp";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";

const baseURL = "http://localhost:4000/api/";

function App() {
  const [books, setBooks] = useState([]);
  const [readlist, setReadlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = (inputUsername, password) => {
    fetch(`${baseURL}users?username=${inputUsername}&password=${password}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.user_id) {
          setUserId(data.user_id);
          setName(data.name);
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
        if (Array.isArray(data)) {
          const ids = data.map((book) => book.id); // only store IDs
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
        if (Array.isArray(data)) {
          setBooks(data); // Assuming the response is an array of book objects
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
    <Router>
      <div className="App">
        <div className="container">
          <Header />
          <div className="login-container">
            {userId ? (
              <span className="user-greeting">Welcome, {name}</span>
            ) : (
              <>
                <button
                  className="login-button"
                  onClick={() => setShowLogin(true)}
                >
                  Login
                </button>
                <Link to="/signup" className="signup-button">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {showLogin && (
            <LoginModal
              onClose={() => setShowLogin(false)}
              onLogin={handleLogin}
            />
          )}

          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/readlist">Readlist</Link>
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
            />
            <Route
              path="/readlist"
              element={
                <Readlist
                  books={books}
                  readlist={readlist}
                  toggleReadlist={toggleReadlist}
                />
              }
            />
            <Route
              path="/signup"
              element={<SignUp setUserId={setUserId} setName={setName} />}
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
