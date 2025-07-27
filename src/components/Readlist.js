import React from "react";
import "../styles.css"; // Importing the styles.css file
import BookCard from "./BookCard";

export default function Readlist({
  books,
  readlist,
  toggleReadlist,
  addToCart,
  removeFromCart,
  cart,
}) {
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
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                isInCart={cart.some((b) => b.id === book.id)}
                showAddToCart={true}
              />
            ) : null;
          })
        )}
      </div>
    </div>
  );
}
