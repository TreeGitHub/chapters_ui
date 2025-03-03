import React from "react";
import "../styles.css"; // Importing the styles.css file

export default function BookCard({ book }) {
  const handlerError = (e) => {
    e.target.src = "images/default.jpg";
  };

  const getRatingClass = (rating) => {
    if (rating >= 8) return "rating-good";
    else if (rating >= 5 && rating < 8) return "rating-average";
    else return "rating-bad";
  };

  return (
    <div key={book.id} className="book-card">
      <img
        src={`images/${book.front_cover_image}`}
        alt={book.title}
        onError={handlerError}
      />
      <div className="book-card-info">
        <h3 className="book-card-title">{book.title}</h3>
        <p className="book-card-genre">{book.genre}</p>
        <p className={`book-card-rating ${getRatingClass(book.rating)}`}>
          {book.rating}
        </p>
      </div>
    </div>
  );
}
