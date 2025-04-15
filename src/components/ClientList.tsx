import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBank } from "../context/BankContext";
import { paginate } from "../utils/pagination";
import { filterClientes } from "../utils/filter";
import ClientSearch from "../components/ClientSearch";
import ClientTableHeader from "../components/ClientTableHeader";
import ClientTableBody from "../components/ClientTableBody";
import ExportarCsv from "../components/ExportCsv";

export default function ClientList() {
  const { clientes } = useBank();
  const [searchParams, setSearchParams] = useSearchParams();
  const [termoBusca, setTermoBusca] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("nome");
  const [ordemAscendente, setOrdemAscendente] = useState(true);

  const paginaAtual = Number(searchParams.get("page")) || 1;
  const itemsPorPagina = 10;

  const clientesFiltrados = filterClientes(clientes, termoBusca);
  const clientesOrdenados = [...clientesFiltrados].sort((a, b) => {
    const valorA = a[ordenarPor as keyof typeof a];
    const valorB = b[ordenarPor as keyof typeof b];

    if (typeof valorA === "number" && typeof valorB === "number") {
      return ordemAscendente ? valorA - valorB : valorB - valorA;
    }

    return ordemAscendente
      ? String(valorA).localeCompare(String(valorB))
      : String(valorB).localeCompare(String(valorA));
  });

  const clientesPaginados = paginate(clientesOrdenados, paginaAtual, itemsPorPagina);
  const totalPaginas = Math.ceil(clientesOrdenados.length / itemsPorPagina);

  const aoClicarColuna = (coluna: string) => {
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

      <div className="d-flex justify-content-between align-items-start gap-3 mb-3 flex-wrap">
        <ExportarCsv clientes={clientesPaginados} />
        <ClientSearch
          valor={termoBusca}
          onChange={(valor) => {
            setTermoBusca(valor);
            setSearchParams({ page: "1" });
          }}
        />
      </div>

      <table className="table table-bordered table-hover">
        <ClientTableHeader
          ordenarPor={ordenarPor}
          ordemAscendente={ordemAscendente}
          aoClicar={aoClicarColuna}
        />
        <ClientTableBody clientes={clientesPaginados} />
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
