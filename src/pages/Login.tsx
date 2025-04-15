import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("demo@banestes.com.br");
  const [senha, setSenha] = useState("123456");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "demo@banestes.com.br" && senha === "123456") {
      localStorage.setItem("logado", "true");
      localStorage.setItem("usuario", JSON.stringify({ nome: "Usuário de Teste", email }));
      navigate("/", { replace: true });
    } else {
      alert("Credenciais inválidas.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-4">Banco Fictício</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Entrar</button>
        </form>
      </div>
    </div>
  );
}
