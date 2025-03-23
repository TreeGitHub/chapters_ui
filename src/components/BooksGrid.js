import React, { useState } from "react";
import "../styles.css"; // Importing the styles.css file
import BookCard from "./BookCard";

export default function BooksGrid({ books, readlist, toggleReadlist }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("All");
  const [rating, setRating] = useState("All");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const handleRatingChange = (e) => {
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

  // Ensure books is always an array before calling filter
  const filteredBooks = Array.isArray(books)
    ? books.filter(
        (book) =>
          matchesCategories(book, genre) &&
          matchesRating(book, rating) &&
          matchesSearchTerm(book, searchTerm)
      )
    : [];

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search books..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <div className="filter-bar">
        <div className="filter-slot">
          <label>Genre</label>
          <select
            className="filter-dropdown"
            value={genre}
            onChange={handleGenreChange}
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
            onChange={handleRatingChange}
          >
            <option>All</option>
            <option>Good</option>
            <option>Average</option>
            <option>Bad</option>
          </select>
        </div>
      </div>
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              book={book}
              key={book.id}
              toggleReadlist={toggleReadlist}
              isReadlisted={readlist.includes(book.id)}
            ></BookCard>
          ))
        ) : (
          <p>No books available.</p>
        )}
      </div>
    </div>
  );
}
