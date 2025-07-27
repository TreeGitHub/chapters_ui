import React, { useState } from "react";
import "../styles.css";
import BooksGrid from "./BooksGrid";
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
      <h1 className="title">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <BooksGrid
            books={cart}
            readlist={[]} // or pass actual readlist if you want toggling
            toggleReadlist={() => {}} // or actual function if you want toggling
            addToCart={() => {}} // disable add in cart view
            removeFromCart={removeFromCart}
            cart={cart}
            showReadlistToggle={false} // if you want to hide readlist toggle
          />
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
                  {book.title} —{" "}
                  {book.price ? `$${book.price.replace(/^\$/, "")}` : "$0.00"}
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
