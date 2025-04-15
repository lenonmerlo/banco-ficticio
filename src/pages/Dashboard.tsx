import { useState } from "react";
import { useBank } from "../context/BankContext";
import { Link } from "react-router-dom";
import FiltroForm from "../components/dashboard/FiltroForm";
import InfoCards from "../components/dashboard/InfoCards";
import RendaChart from "../components/dashboard/RendaChart";

export default function Dashboard() {
  const { clientes } = useBank();
  const [filtros, setFiltros] = useState({ nome: "", rendaMin: 0, rendaMax: Infinity });

  const dadosFiltrados = clientes
    .filter(c =>
      c.nome.toLowerCase().includes(filtros.nome.toLowerCase()) &&
      c.rendaAnual >= filtros.rendaMin &&
      c.rendaAnual <= filtros.rendaMax
    )
    .map(c => ({
      nome: c.nome.split(" ")[0],
      renda: c.rendaAnual,
    }));

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
          <FiltroForm setFiltros={setFiltros} />
        </div>
        <div className="col-md-9">
          {dadosFiltrados.length > 0 && (
            <>
              <InfoCards dados={dadosFiltrados} />
              <RendaChart dados={dadosFiltrados} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
