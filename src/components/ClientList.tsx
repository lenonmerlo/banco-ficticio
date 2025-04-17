import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useBank } from "../context/BankContext";
import { paginate } from "../utils/pagination";
import { filterClients } from "../utils/filter";
import ClientSearch from "../components/ClientSearch";
import ClientTableHeader from "../components/ClientTableHeader";
import ClientTableBody from "../components/ClientTableBody";
import ExportCsv from "../components/ExportCsv";

export default function ClientList() {
  const { clients } = useBank();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [isAscending, setIsAscending] = useState(true);

  const currentPage = Number(searchParams.get("page")) || 1;
  const itemsPerPage = 10;

  const filteredClients = filterClients(clients, searchTerm);
  const sortedClients = [...filteredClients].sort((a, b) => {
    const valueA = a[sortBy as keyof typeof a];
    const valueB = b[sortBy as keyof typeof b];

    if (typeof valueA === "number" && typeof valueB === "number") {
      return isAscending ? valueA - valueB : valueB - valueA;
    }

    return isAscending
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const paginatedClients = paginate(sortedClients, currentPage, itemsPerPage);
  const totalPages = Math.ceil(sortedClients.length / itemsPerPage);

  const handleColumnClick = (column: string) => {
    if (sortBy === column) {
      setIsAscending(!isAscending);
    } else {
      setSortBy(column);
      setIsAscending(true);
    }
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4 text-primary">Lista de Clientes</h1>

      <div className="d-flex justify-content-between align-items-start gap-3 mb-3 flex-wrap">
        <ExportCsv clients={paginatedClients} />
        <ClientSearch
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setSearchParams({ page: "1" });
          }}
        />
      </div>

      <table className="table table-bordered table-hover">
        <ClientTableHeader
          sortBy={sortBy}
          isAscending={isAscending}
          onClick={handleColumnClick}
        />
        <ClientTableBody clients={paginatedClients} />
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-primary btn-sm"
          disabled={currentPage === 1}
          onClick={() => setSearchParams({ page: String(Math.max(currentPage - 1, 1)) })}
        >
          Anterior
        </button>
        <span className="text-muted">Página {currentPage} de {totalPages}</span>
        <button
          className="btn btn-primary btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setSearchParams({ page: String(Math.min(currentPage + 1, totalPages)) })}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
