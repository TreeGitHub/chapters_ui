import React from "react";
import "../styles.css"; // Importing the styles.css file
import BookCard from "./BookCard";

export default function Readlist({ books, readlist, toggleReadlist }) {
  return (
    <div>
      <h1 className="title">Your Read List</h1>
      <div className="readlist">
        {readlist.length === 0 ? (
          <p>Your readlist is empty.</p>
        ) : (
          readlist.map((id) => {
            const book = books.find((book) => book.id === id);
            return book ? (
              <BookCard
                key={id}
                book={book}
                toggleReadlist={toggleReadlist}
                isReadlisted={true}
              ></BookCard>
            ) : null;
          })
        )}
      </div>
    </div>
  );
}
