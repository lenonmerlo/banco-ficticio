import { useState } from "react";
import { useBank } from "../context/BankContext";
import { paginate } from "../utils/pagination";
import { filterClientes } from "../utils/filtro";

export default function ClienteList() {
  const { clientes, carregando } = useBank();
  const [termoBusca, setTermoBusca] = useState("");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const itemsPorPagina = 10;

  if (carregando) return <div className="container py-4">Carregando clientes...</div>;

  const clientesFiltrados = filterClientes(clientes, termoBusca);
  const clientesPaginados = paginate(clientesFiltrados, paginaAtual, itemsPorPagina);
  const totalPaginas = Math.ceil(clientesFiltrados.length / itemsPorPagina);

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-primary">Lista de Clientes</h1>

      <input
        type="text"
        className="form-control mb-4 shadow-sm"
        placeholder="Buscar por nome ou CPF/CNPJ..."
        value={termoBusca}
        onChange={(e) => {
          setTermoBusca(e.target.value);
          setPaginaAtual(1);
        }}
      />

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>Nome</th>
            <th>CPF/CNPJ</th>
            <th>Email</th>
            <th>Renda Anual</th>
          </tr>
        </thead>
        <tbody>
          {clientesPaginados.map((cliente) => (
            <tr key={cliente.id}>
              <td>
                <a
                  href={`/cliente/${cliente.cpfCnpj}`}
                  className="text-decoration-none fw-bold text-primary"
                >
                  {cliente.nome}
                </a>
              </td>
              <td>{cliente.cpfCnpj}</td>
              <td>{cliente.email}</td>
              <td>R$ {cliente.rendaAnual.toLocaleString("pt-BR")}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-primary btn-sm"
          disabled={paginaAtual === 1}
          onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
        >
          Anterior
        </button>
        <span className="text-muted">Página {paginaAtual} de {totalPaginas}</span>
        <button
          className="btn btn-primary btn-sm"
          disabled={paginaAtual === totalPaginas}
          onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
        >
          Próxima
        </button>
      </div>

    </div>
  );
}
