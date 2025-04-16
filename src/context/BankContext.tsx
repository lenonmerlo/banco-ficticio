import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Client, Account, Agency } from "../types";
import { fetchCSV } from "../services/fetchCSV";

const URL_CLIENTS =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=clientes";
const URL_ACCOUNTS =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=contas";
const URL_AGENCIES =
  "https://docs.google.com/spreadsheets/d/1PBN_HQOi5ZpKDd63mouxttFvvCwtmY97Tb5if5_cdBA/gviz/tq?tqx=out:csv&sheet=agencias";

interface BankContextType {
  clients: Client[];
  accounts: Account[];
  agencies: Agency[];
  loading: boolean;
}

const BankContext = createContext<BankContextType>({
  clients: [],
  accounts: [],
  agencies: [],
  loading: true,
});

export const useBank = () => useContext(BankContext);

export function BankProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAll = async () => {
      const [clientsCSV, accountsCSV, agenciesCSV] = await Promise.all([
        fetchCSV(URL_CLIENTS),
        fetchCSV(URL_ACCOUNTS),
        fetchCSV(URL_AGENCIES),
      ]);

      const normalizedClients: Client[] = clientsCSV.map((c: any) => ({
        name: c.nome,
        cpfCnpj: c.cpfCnpj,
        email: c.email,
        birthDate: new Date(c.dataNascimento),
        annualIncome: Number(c.rendaAnual),
        assets: Number(c.patrimonio),
        address: c.endereco,
        maritalStatus: c.estadoCivil,
        socialName: c.nomeSocial,
        agencyCode: Number(c.codigoAgencia),
        id: c.id,
        rg: c.rg,
      }));

      const normalizedAccounts: Account[] = accountsCSV.map((c: any) => ({
        id: c.id,
        clientCpfCnpj: c.cpfCnpjCliente,
        type: c.tipo,
        balance: Number(c.saldo),
        creditLimit: Number(c.limiteCredito),
        availableCredit: Number(c.creditoDisponivel),
      }));

      const normalizedAgencies: Agency[] = agenciesCSV.map((a: any) => ({
        id: a.id,
        code: Number(a.codigo),
        name: a.nome,
        address: a.endereco,
      }));

      setClients(normalizedClients);
      setAccounts(normalizedAccounts);
      setAgencies(normalizedAgencies);
      setLoading(false);
    };

    loadAll();
  }, []);

  return (
    <BankContext.Provider value={{ clients, accounts, agencies, loading }}>
      {children}
    </BankContext.Provider>
  );
}
