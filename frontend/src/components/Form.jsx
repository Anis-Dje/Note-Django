import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../constants";
import LoadingIndicator from "./LoadingIndicator";
import "../styles/Form.css";

function Form({ route = "/api/token/", method = "login", registerLink, registerText }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((s) => ({ ...s, [name]: value }));
  };

  const buildUrl = (r) => {
    const base = (API_URL || "").replace(/\/$/, "");
    if (/^https?:\/\//.test(r)) return r;
    if (!base) return r;
    return r.startsWith("/") ? `${base}${r}` : `${base}/${r}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const url = buildUrl(route);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setError(data.detail || data.error || "Request failed");
        return;
      }

      if (method === "login") {
        if (data.access) localStorage.setItem("access", data.access);
        if (data.refresh) localStorage.setItem("refresh", data.refresh);
        setSuccess("Logged in");
        navigate("/home");
        return;
      } else {
        // register
        // backend might return tokens or not; if tokens exist store them
        if (data.access) localStorage.setItem("access", data.access);
        if (data.refresh) localStorage.setItem("refresh", data.refresh);
        setSuccess("Account created");
        navigate("/home");
        return;
      }
    } catch (err) {
      setError(err.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1>{method === "login" ? "Login" : "Register"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="form-input"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          className="form-button"
          type="submit"
          disabled={loading}
          aria-busy={loading}
          aria-live="polite"
        >
          {loading ? <LoadingIndicator /> : method === "login" ? "Login" : "Register"}
        </button>

        {registerLink && (
          <Link to={registerLink} className="form-register-link">
            {registerText || (method === "login" ? "Register a new user" : "Already have an account? Login")}
          </Link>
        )}

        {error && <div className="form-error" style={{ color: "red", marginTop: 8 }}>{error}</div>}
        {success && <div className="form-success" style={{ color: "green", marginTop: 8 }}>{success}</div>}
      </form>
    </div>
  );
}

export default Form;