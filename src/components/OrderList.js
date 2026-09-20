import React from "react";
import "../styles.css"; // Importing the styles.css file

export default function OrderList({ orders }) {
  return (
    <div>
      <h1 className="title">Your Order History</h1>
      <div className="orders-list">
        {orders.length === 0 ? (
          <p>Your order history is empty.</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-card-header">
                <span className="order-id">Order #{order.id}</span>
                <span className={`order-status ${order.status}`}>
                  {order.status}
                </span>
              </div>
              <p className="order-total">${order.total_price}</p>
              <p className="order-meta">{order.inserted_at}</p>
              <p className="order-meta">Ref: {order.reference}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
