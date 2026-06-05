import { useState } from "react";
import { authAPI } from "../services/api";
import "../components/Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await authAPI.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location = "/admin";
    } catch (err) {
      setError("Login gagal. Cek email / password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Admin Login</h2>
          <p>Masuk ke panel administrator</p>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="auth-form">
          <div className="input-group">
            <input
              onChange={e => setEmail(e.target.value)}
              placeholder="Email Address"
              type="email"
              autoFocus
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
          </div>
          <button className="auth-button" onClick={submit}>
            Sign In
          </button>
        </div>

        <div className="auth-footer">
          Anda pasien?
          <a href="/patient-login" className="auth-link">Login sebagai Pasien</a>
        </div>
      </div>
    </div>
  );
}

