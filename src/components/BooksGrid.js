import React, { useState, useEffect } from "react";
import "../styles.css"; // Importing the styles.css file
import BookCard from "./BookCard";

export default function BooksGrid() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setgenre] = useState("All");
  const [rating, setRating] = useState("All");

  useEffect(() => {
    fetch("books.json")
      .then((Response) => Response.json())
      .then((data) => setBooks(data));
  }, []);

  const hanleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const hanlegenreChange = (e) => {
    setgenre(e.target.value);
  };

  const hanleRatingChange = (e) => {
    setRating(e.target.value);
  };

  const matchesCategories = (book, genre) => {
    return genre === "All" || book.genre.toLowerCase() === genre.toLowerCase();
  };

  const matchesSearchTerm = (book, searchTerm) => {
    return book.title.toLowerCase().includes(searchTerm.toLowerCase());
  };

  const matchesRating = (book, rating) => {
    switch (rating) {
      case "All":
        return true;
      case "Good":
        return book.rating >= 8;
      case "Average":
        return book.rating >= 5 && book.rating < 8;
      case "Bad":
        return book.rating < 5;
      default:
        return false;
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      matchesCategories(book, genre) &&
      matchesRating(book, rating) &&
      matchesSearchTerm(book, searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search books..."
        value={searchTerm}
        onChange={hanleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={hanlegenreChange}
          >
            <option>All</option>
            <option>Sci-Fi</option>
            <option>Romance</option>
            <option>Crime</option>
            <option>Biography</option>
          </select>
        </div>
        <div className="filter-slot">
          <label>Rating</label>
          <select
            className="filter-dropdown"
            value={rating}
            onChange={hanleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Average</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="books-grid">
        {filteredBooks.map((book) => (
          <BookCard book={book} key={book.id}></BookCard>
        ))}
      </div>
    </div>
  );
}
