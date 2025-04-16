import { useEffect, useState } from "react";
import { useBank } from "../context/BankContext";
import { Link } from "react-router-dom";
import FilterForm from "../components/dashboard/FilterForm";
import InfoCards from "../components/dashboard/InfoCards";
import IncomeChart from "../components/dashboard/IncomeChart";
import { Spinner } from "../components/Spinner";

export default function Dashboard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const { clients } = useBank();
  const [filters, setFilters] = useState({ name: "", minIncome: 0, maxIncome: Infinity });

  const filteredData = clients
    .filter(client =>
      (client.name ?? "").toLowerCase().includes(filters.name.toLowerCase()) &&
      (client.annualIncome ?? 0) >= filters.minIncome &&
      (client.annualIncome ?? 0) <= filters.maxIncome
    )
    .map(client => ({
      name: client.name?.split(" ")[0] ?? "",
      income: client.annualIncome ?? 0,
    }));


  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <Link to="/" className="btn btn-outline-primary">
          ← Voltar para Lista de Clientes
        </Link>
      </div>

      <h1 className="mb-4 text-primary">Dashboard</h1>

      <div className="row">
        <div className="col-md-3">
          <FilterForm setFilters={setFilters} />
        </div>
        <div className="col-md-9">
          {filteredData.length > 0 ? (
            <>
              <InfoCards data={filteredData} />
              <IncomeChart data={filteredData} />
            </>
          ) : (
            <p className="text-muted">Nenhum dado encontrado com os filtros aplicados.</p>
          )}
        </div>
      </div>
    </div>
  );
}
