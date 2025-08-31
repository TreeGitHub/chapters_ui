import React, { useState } from "react";
import "../styles.css";
import BooksGrid from "./BooksGrid";

function Cart({ cart, removeFromCart }) {
  const [showSummary, setShowSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [cardHandler, setCardHandler] = useState(null);

  const total = cart.reduce((sum, book) => {
    let price =
      typeof book.price === "string"
        ? parseFloat(book.price.replace(/^\$/, ""))
        : book.price || 0;
    return sum + (Number.isFinite(price) ? price : 0);
  }, 0);

  // Step 1: fetch session and mount payment fields
  async function handlePay() {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:4000/api/checkout/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart }),
      });
      const data = await res.json();
      if (!data.session_id) throw new Error("No session ID returned");
      setSessionId(data.session_id);

      const { Hellgate } = window;
      if (!Hellgate) throw new Error("Hellgate SDK not loaded");

      const client = await Hellgate.init(data.session_id, {
        base_url: "https://sandbox.hellgate.io",
      });

      const handler = await client.use("CARD");

      const { cardNumber, expiryDate, securityCode } = handler.createFormFields(
        {
          style: {
            base: { fontSize: "16px", color: "#111", lineHeight: "1.5em" },
          },
        }
      );

      await Promise.all([
        cardNumber.mount("#card-number"),
        expiryDate.mount("#expiry-date"),
        securityCode.mount("#security-code"),
      ]);

      setCardHandler(handler);
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to start payment. See console.");
    } finally {
      setLoading(false);
    }
  }

  // Step 2: confirm payment
  async function confirmPayment() {
    if (!cardHandler) return alert("Card form not initialized.");
    try {
      const result = await cardHandler.process({
        cardholder_name: "Cardholder Name",
      });
      if (result.status === "success" || result.status === "pending") {
        alert("Payment processed successfully!");
      } else {
        alert("Payment failed: " + result.data.reason);
      }
    } catch (err) {
      console.error("Payment processing error:", err);
      alert("Payment failed. Check console.");
    }
  }

  return (
    <div>
      <h1 className="title">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <BooksGrid
            books={cart}
            readlist={[]}
            toggleReadlist={() => {}}
            addToCart={() => {}}
            removeFromCart={removeFromCart}
            cart={cart}
            showReadlistToggle={false}
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
                  {book.title} — ${book.price.replace(/^\$/, "")}
                </li>
              ))}
            </ul>
            <div className="order-total">
              <strong>Total: ${total.toFixed(2)}</strong>
            </div>

            {/* Start payment button */}
            <button
              className="pay-button"
              onClick={handlePay}
              disabled={loading}
            >
              {loading ? "Processing..." : "Start Payment"}
            </button>

            {/* Payment form fields */}
            {sessionId && (
              <div className="payment-fields" style={{ marginTop: "20px" }}>
                <div className="payment-field">
                  <label>Card Number</label>
                  <div id="card-number"></div>
                </div>
                <div className="payment-field">
                  <label>Expiry Date</label>
                  <div id="expiry-date"></div>
                </div>
                <div className="payment-field">
                  <label>CVC</label>
                  <div id="security-code"></div>
                </div>
              </div>
            )}

            {/* Confirm payment button */}
            {cardHandler && (
              <button className="pay-button" onClick={confirmPayment}>
                Confirm Payment
              </button>
            )}

            {sessionId && (
              <p>
                <strong>Session ID:</strong> {sessionId}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
