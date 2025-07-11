📚 Chapters UI

🎯 Purpose

This is the frontend of the Chapters book tracking app. It provides a user-friendly interface for:

    Browsing available books

    Managing a personal reading list

    Handling user signup and login

🧰 Technologies Used

    React – for building the UI

    React Router – for client-side navigation

    Fetch API – for communicating with the backend

    CSS – for styling and layout

🧠 Responsibilities

    Renders book listings, readlist view, and authentication forms

    Handles user interactions:

        Signing up & logging in

        Adding/removing books from the readlist

    Manages application state for:

        Logged-in user

        Book catalog

        User’s readlist

    Connects to the books_api (Elixir/Phoenix) backend via HTTP requests

🛠️ Environment Setup

To run the React frontend locally, make sure you have the following installed:
📦 Prerequisites
Tool Version (Recommended)
Node.js 18+
npm 9+ (comes with Node)
Git Any recent version

    ✅ This project was created with create-react-app (or similar tooling) and uses fetch() to communicate with the Elixir API backend.

🚀 Setup Steps

1. Install dependencies
   npm install

2. Start the development server
   npm start

3. Open your browser and go to http://localhost:3000
   ⚠️ Make sure your Phoenix backend is running at http://localhost:4000 so the frontend can access the API.
