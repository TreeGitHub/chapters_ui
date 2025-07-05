import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function SignUp({ setUserId, setName }) {
  const [name, setNameInput] = useState(""); // actual name
  const [username, setUsername] = useState(""); // login username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const baseURL = "http://localhost:4000/api/";
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Info:", { name, username, email, password });

    fetch(`${baseURL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.id) {
          setUserId(data.id);
          setName(data.name); // update the parent App state
          navigate("/"); // return to home
        } else {
          alert("Invalid response from server.");
        }
      })
      .catch((error) => console.error("Fetch error: ", error));
  };

  return (
    <div className="signup-page">
      <div className="signup-form">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setNameInput(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Profile Image:
            <input
              type="file"
              disabled
              title="Coming soon!"
              style={{ opacity: 0.5, cursor: "not-allowed" }}
            />
            <small style={{ display: "block", color: "#aaa" }}>
              (Image upload coming soon)
            </small>
          </label>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
