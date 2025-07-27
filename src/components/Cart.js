import React, { useState } from "react";
import "../styles.css";
import BookCard from "./BookCard";

function Cart({ cart, removeFromCart }) {
  const [showSummary, setShowSummary] = useState(false);

  // Calculate total price (handles string prices like "$16.25")
  const total = cart.reduce((sum, book) => {
    let price = 0;
    if (typeof book.price === "string") {
      price = parseFloat(book.price.replace(/^\$/, ""));
    } else if (typeof book.price === "number") {
      price = book.price;
    }
    return sum + (Number.isFinite(price) ? price : 0);
  }, 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((book) => (
              <li
                key={book.id}
                style={{ listStyle: "none", marginBottom: "1rem" }}
              >
                <BookCard
                  book={book}
                  isReadlisted={false} // or pass actual readlist state if you want
                  toggleReadlist={() => {}} // or pass actual function if needed
                />
                <button onClick={() => removeFromCart(book.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button
            className="checkout-button"
            onClick={() => setShowSummary(true)}
          >
            Checkout
          </button>
        </>
      )}

      {showSummary && (
        <div className="order-summary-popup">
          <div className="order-summary-content">
            <button
              className="close-popup"
              onClick={() => setShowSummary(false)}
            >
              &times;
            </button>
            <h3>Order Summary</h3>
            <ul>
              {cart.map((book) => (
                <li key={book.id}>
                  {book.title} — $
                  {typeof book.price === "string"
                    ? book.price.replace(/^\$/, "")
                    : (book.price || 0).toFixed(2)}
                </li>
              ))}
            </ul>
            <div className="order-total">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>
            <button className="pay-button" disabled>
              Pay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
