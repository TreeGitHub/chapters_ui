import React from "react";
import "../styles.css"; // Importing the styles.css file

export default function BookCard({ book, isReadlisted, toggleReadlist }) {
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
        <div className="book-card-price">
          {book.price
            ? (() => {
                // Remove $ if present and parse as float
                const num = parseFloat(
                  typeof book.price === "string"
                    ? book.price.replace(/^\$/, "")
                    : book.price
                );
                return Number.isFinite(num) ? `$${num.toFixed(2)}` : "$0.00";
              })()
            : "$0.00"}
        </div>
        <div>
          <span className="book-card-genre">{book.genre}</span>
          <span className={`book-card-rating ${getRatingClass(book.rating)}`}>
            {book.rating}
          </span>
        </div>
        <label className="switch">
          <input
            type="checkbox"
            checked={isReadlisted}
            onChange={() => toggleReadlist(book.id)}
          ></input>

          <span className="slider">
            <span className="slider-label">
              {isReadlisted ? "In Readlist" : "Add to Readlist"}
            </span>
          </span>
        </label>
      </div>
    </div>
  );
}
