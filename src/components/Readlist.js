import React from "react";
import "../styles.css"; // Importing the styles.css file
import BookCard from "./BookCard";

export default function Readlist({ books, readlist, toggleReadlist }) {
  return (
    <div>
      <h1 className="title">Your Read List</h1>
      <div className="readlist">
        {readlist.map((id) => {
          const book = books.find((book) => book.id === id);
          return (
            <BookCard
              key={id}
              book={book}
              toggleReadlist={toggleReadlist}
              isReadlisted={true}
            ></BookCard>
          );
        })}
      </div>
    </div>
  );
}
