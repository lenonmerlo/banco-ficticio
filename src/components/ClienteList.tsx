import { useState } from "react";
import { useBank } from "../context/BankContext";
import { paginate } from "../utils/pagination";
import { filterClientes } from "../utils/filtro";
import { useSearchParams } from "react-router-dom";

type ColunaOrdenavel = "nome" | "cpfCnpj" | "email" | "rendaAnual";

export default function ClienteList() {
  const { clientes, carregando } = useBank();
  const [termoBusca, setTermoBusca] = useState("");
  const [ordenarPor, setOrdenarPor] = useState<ColunaOrdenavel | "">("");
  const [ordemAscendente, setOrdemAscendente] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const paginaAtual = Number(searchParams.get("page")) || 1;
  const itemsPorPagina = 10;

  if (carregando) return <div className="container py-4">Carregando clientes...</div>;

  const ordenar = (data: typeof clientes) => {
    if (!ordenarPor) return data;
    return [...data].sort((a, b) => {
      const valorA = a[ordenarPor];
      const valorB = b[ordenarPor];

      if (typeof valorA === "number" && typeof valorB === "number") {
        return ordemAscendente ? valorA - valorB : valorB - valorA;
      }

      return ordemAscendente
        ? String(valorA).localeCompare(String(valorB))
        : String(valorB).localeCompare(String(valorA));
    });
  };

  const clientesFiltrados = filterClientes(clientes, termoBusca);
  const clientesOrdenados = ordenar(clientesFiltrados);
  const clientesPaginados = paginate(clientesOrdenados, paginaAtual, itemsPorPagina);
  const totalPaginas = Math.ceil(clientesFiltrados.length / itemsPorPagina);

  const aplicarMascaraCpfCnpj = (valor: string): string => {
    const numeros = valor.replace(/\D/g, "");
  
    if (numeros.length <= 11) {
      const cpf = numeros.slice(0, 11);
      return cpf
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      const cnpj = numeros.slice(0, 14);
      return cnpj
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };
  

  const formatCpfCnpj = aplicarMascaraCpfCnpj;

  const aoClicarColuna = (coluna: ColunaOrdenavel) => {
    if (ordenarPor === coluna) {
      setOrdemAscendente(!ordemAscendente);
    } else {
      setOrdenarPor(coluna);
      setOrdemAscendente(true);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-primary">Lista de Clientes</h1>

      <input
        type="text"
        className="form-control mb-4 shadow-sm"
        placeholder="Buscar por nome ou CPF/CNPJ..."
        value={termoBusca}
        onChange={(e) => {
          const valor = aplicarMascaraCpfCnpj(e.target.value);
          setTermoBusca(valor);
          setSearchParams({ page: "1" });
        }}
      />

      <table className="table table-bordered table-hover">
        <thead className="table-primary text-white">
          <tr>
            <th style={{ cursor: "pointer" }} onClick={() => aoClicarColuna("nome")}>
              Nome {ordenarPor === "nome" && (ordemAscendente ? "▲" : "▼")}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => aoClicarColuna("cpfCnpj")}>
              CPF/CNPJ {ordenarPor === "cpfCnpj" && (ordemAscendente ? "▲" : "▼")}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => aoClicarColuna("email")}>
              Email {ordenarPor === "email" && (ordemAscendente ? "▲" : "▼")}
            </th>
            <th style={{ cursor: "pointer" }} onClick={() => aoClicarColuna("rendaAnual")}>
              Renda Anual {ordenarPor === "rendaAnual" && (ordemAscendente ? "▲" : "▼")}
            </th>
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
              <td>{formatCpfCnpj(cliente.cpfCnpj)}</td>
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
          onClick={() => setSearchParams({ page: String(Math.max(paginaAtual - 1, 1)) })}
        >
          Anterior
        </button>
        <span className="text-muted">Página {paginaAtual} de {totalPaginas}</span>
        <button
          className="btn btn-primary btn-sm"
          disabled={paginaAtual === totalPaginas}
          onClick={() => setSearchParams({ page: String(Math.min(paginaAtual + 1, totalPaginas)) })}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}