import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Cliente, Conta, Agencia } from "../types";
import { fetchCSV } from "../services/fetchCSV";

const URL_CLIENTES =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";
const URL_CONTAS =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";
const URL_AGENCIAS =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

interface BankContextType {
  clientes: Cliente[];
  contas: Conta[];
  agencias: Agencia[];
  carregando: boolean;
}

const BankContext = createContext<BankContextType>({
  clientes: [],
  contas: [],
  agencias: [],
  carregando: true,
});

export const useBank = () => useContext(BankContext);

export function BankProvider({ children }: { children: ReactNode }) {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [contas, setContas] = useState<Conta[]>([]);
  const [agencias, setAgencias] = useState<Agencia[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregarTudo = async () => {
      const [clientesCSV, contasCSV, agenciasCSV] = await Promise.all([
        fetchCSV<Cliente>(URL_CLIENTES),
        fetchCSV<Conta>(URL_CONTAS),
        fetchCSV<Agencia>(URL_AGENCIAS),
      ]);

      const normalizados = clientesCSV.map((c) => ({
        ...c,
        dataNascimento: new Date(c.dataNascimento),
        rendaAnual: Number(c.rendaAnual),
        patrimonio: Number(c.patrimonio),
        codigoAgencia: Number(c.codigoAgencia),
      }));

      const contasNormalizadas = contasCSV.map((c) => ({
        ...c,
        saldo: Number(c.saldo),
        limiteCredito: Number(c.limiteCredito),
        creditoDisponivel: Number(c.creditoDisponivel),
      }));

      const agenciasNormalizadas = agenciasCSV.map((a) => ({
        ...a,
        codigo: Number(a.codigo),
      }));

      setClientes(normalizados);
      setContas(contasNormalizadas);
      setAgencias(agenciasNormalizadas);
      setCarregando(false);
    };

    carregarTudo();
  }, []);

  return (
    <BankContext.Provider value={{ clientes, contas, agencias, carregando }}>
      {children}
    </BankContext.Provider>
  );
}
