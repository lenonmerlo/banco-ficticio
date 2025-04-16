import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState<{ name: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initialTheme = prefersDark ? "dark" : "light";
      setTheme(initialTheme);
      document.documentElement.classList.toggle("dark", prefersDark);
    }

    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const logout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <header
      className="d-flex justify-content-between align-items-center px-4 py-3"
      style={{ backgroundColor: "var(--header-bg)", color: "white", fontSize: "20px" }}
    >
      <Link to="/" style={{ fontWeight: "bold", color: "white", textDecoration: "none" }}>
        Banco Fictício
      </Link>

      <div className="d-flex gap-2 align-items-center">
        {user && location.pathname !== "/login" && (
          <span className="text-white me-2">
            Sessão ativa: {user.name}
          </span>
        )}
        <button onClick={toggleTheme} className="btn btn-outline-light btn-sm">
          {theme === "dark" ? "☀️ Claro" : "🌙 Escuro"}
        </button>
        <Link to="/dashboard" className="btn btn-outline-light btn-sm">
          📊 Dashboard
        </Link>
        <button onClick={logout} className="btn btn-outline-light btn-sm">
          🚪 Sair
        </button>
      </div>
    </header>
  );
}
