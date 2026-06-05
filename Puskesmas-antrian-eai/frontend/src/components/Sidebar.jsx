import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar({ role }) {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const menuItems =
        role === "admin"
            ? [
                { path: "/admin", label: "Dashboard", icon: "📊" },
                { path: "/admin/doctors", label: "Kelola Dokter", icon: "👨‍⚕️" },
            ]
            : [
                { path: "/patient", label: "Dashboard", icon: "🏠" },
                { path: "/patient/daftar", label: "Daftar Antrian", icon: "📝" },
                { path: "/patient/antrian", label: "Cek Antrian", icon: "🔍" },
            ];

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <h2>Klinik EAI</h2>
            </div>

            <div className="sidebar-menu">
                {menuItems.map((item) => (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`sidebar-link ${location.pathname === item.path ? "active" : ""}`}
                        style={{ fontWeight: location.pathname === item.path ? "bold" : "normal" }}
                    >
                        <i>{item.icon}</i>
                        {item.label}
                    </Link>
                ))}
            </div>

            <div className="sidebar-footer">
                <button onClick={handleLogout} className="logout-btn">
                    Sign Out
                </button>
            </div>
        </div>
    );
}
