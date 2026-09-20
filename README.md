📚 Chapters UI

🎯 Purpose

This is the frontend of Chapters, an online bookstore. It provides browsing,
a personal reading list, and a full checkout/payments flow backed by
Hellgate's hosted card fields.

🧰 Technologies Used

    React – UI
    React Router – client-side navigation
    Fetch API – communicating with the backend
    Hellgate Web SDK – loaded via <script> in public/index.html, provides
      the hosted card-tokenization fields used at checkout

🏗️ Architecture

    App.js holds top-level state (cart, logged-in userId) and passes it
      down as props to child components — there's no global state
      management library in use
    Cart.js owns the whole checkout flow:
      1. Requests a session from the backend (/api/checkout/session),
         with prices derived server-side from the real catalogue, not
         from whatever the cart happens to hold
      2. Mounts Hellgate's hosted card fields using that session
      3. On submission, tokenizes the card via the Hellgate SDK
         (cardHandler.process()) — this step only exchanges card data
         for a token, it does not charge anything
      4. Sends that token to the backend (/api/checkout/charge), which
         does the actual charging and persistence
      5. Shows the real outcome (order number or error) based on the
         backend's actual response — not a hardcoded message

🛠️ Environment Setup

📦 Prerequisites

    Node.js 18+
    npm 9+

🚀 Setup Steps

1. Install dependencies
   npm install

2. Start the development server
   npm start

3. Open http://localhost:3000
   Requires the Phoenix backend running at http://localhost:4000, with
   its own Hellgate environment variables configured — see books_api's
   README for details. Checkout will fail without them.
