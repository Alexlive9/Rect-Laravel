import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [token, setToken] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/login", {
        email,
        password,
      })
      .then((response) => {
        console.log("Login successful", response.data);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        alert("Login successful!");
      })
      .catch((error) => {
        console.error("There was an error logging in:", error);
        setError("Login failed!");
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
      {token && <p>JWT Token: {token}</p>}
    </div>
  );
};

export default Login;
