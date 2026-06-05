import "../components/Auth.css";
import { useState } from "react";
import { patientAPI } from "../services/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const submit = async () => {
    try {
      const res = await patientAPI.post("/patients/register", form);

      // 🔐 simpan token
      localStorage.setItem("token", res.data.token);

      // 🚀 langsung ke dashboard pasien
      window.location.href = "/patient";
    } catch (err) {
      alert(err.response?.data?.msg || "Register gagal");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Create Account</h2>
          <p>Join us for better healthcare management</p>
        </div>

        <div className="auth-form">
          <div className="input-group">
            <input
              placeholder="Full Name"
              onChange={e => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="input-group">
            <input
              placeholder="Email Address"
              type="email"
              onChange={e => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="input-group">
            <input
              placeholder="Phone Number"
              type="tel"
              onChange={e => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              onChange={e => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <button className="auth-button" onClick={submit}>
            Create Account
          </button>
        </div>

        <div className="auth-footer">
          Already have an account?
          <a href="/login" className="auth-link">Sign In</a>
        </div>
      </div>
    </div>
  );
}
