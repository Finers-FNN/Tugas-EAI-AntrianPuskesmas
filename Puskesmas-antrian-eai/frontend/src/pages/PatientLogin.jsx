import { useState } from "react";
import { patientAPI } from "../services/api";
import "../components/Auth.css";

export default function PatientLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = async () => {
        try {
            const res = await patientAPI.post("/login", { email, password });
            localStorage.setItem("token", res.data.token);
            window.location = "/patient";
        } catch (err) {
            setError(err.response?.data?.msg || "Login gagal. Cek email / password");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-header">
                    <h2>Login Pasien</h2>
                    <p>Masuk ke akun pasien Anda</p>
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
                    Belum punya akun?
                    <a href="/register" className="auth-link">Daftar</a>
                </div>
                <div className="auth-footer" style={{ marginTop: "10px" }}>
                    <a href="/" className="auth-link">← Login sebagai Admin</a>
                </div>
            </div>
        </div>
    );
}
