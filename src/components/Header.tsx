import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const [tema, setTema] = useState("light");
  const [usuario, setUsuario] = useState<{ nome: string } | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo) {
      setTema(temaSalvo);
      document.documentElement.classList.toggle("dark", temaSalvo === "dark");
    } else {
      const sistemaPrefereDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const temaInicial = sistemaPrefereDark ? "dark" : "light";
      setTema(temaInicial);
      document.documentElement.classList.toggle("dark", sistemaPrefereDark);
    }

    const dados = localStorage.getItem("usuario");
    if (dados) {
      setUsuario(JSON.parse(dados));
    }
  }, []);

  const alternarTema = () => {
    const novoTema = tema === "dark" ? "light" : "dark";
    setTema(novoTema);
    document.documentElement.classList.toggle("dark", novoTema === "dark");
    localStorage.setItem("tema", novoTema);
  };

  const sair = () => {
    localStorage.removeItem("logado");
    localStorage.removeItem("usuario");
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
        {usuario && location.pathname !== "/login" && (
          <span className="text-white me-2">
            Sessão ativa: {usuario.nome}
          </span>
        )}
        <button onClick={alternarTema} className="btn btn-outline-light btn-sm">
          {tema === "dark" ? "☀️ Claro" : "🌙 Escuro"}
        </button>
        <Link to="/dashboard" className="btn btn-outline-light btn-sm">
          📊 Dashboard
        </Link>
        <button onClick={sair} className="btn btn-outline-light btn-sm">
          🚪 Sair
        </button>
      </div>
    </header>
  );
}
