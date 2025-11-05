import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function NotFound() {
  return (
    <div style={{ padding: 40, textAlign: "center" }}>
      <h1>404 — Page not found</h1>
      <p>The page you requested doesn't exist.</p>
      <p>
        <Link to="/" className="form-register-link" style={{ display: "inline-block", width: 160 }}>
          Back to Login
        </Link>
        <Link to="/home" style={{ marginLeft: 12 }}>
          Go to Home
        </Link>
      </p>
    </div>
  );
}

export default NotFound;