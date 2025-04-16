import { useParams, Link } from "react-router-dom";
import { useBank } from "../context/BankContext";

export default function ClientDetails() {
  const { cpfCnpj } = useParams();
  const { clients, accounts, agencies, loading } = useBank();

  if (loading) return <div className="container py-4">Carregando dados...</div>;

  const client = clients.find((c) => c.cpfCnpj === cpfCnpj);
  if (!client) return <div className="container py-4">Cliente não encontrado.</div>;

  const clientAccounts = accounts.filter((acc) => acc.clientCpfCnpj === cpfCnpj);
  const agency = agencies.find((a) => a.code === client.agencyCode);

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-link mb-3">← Voltar</Link>

      <h1 className="text-primary mb-3">{client.name}</h1>

      <ul className="list-group mb-4">
        <li className="list-group-item"><strong>CPF/CNPJ:</strong> {client.cpfCnpj}</li>
        <li className="list-group-item"><strong>RG:</strong> {client.rg || "—"}</li>
        <li className="list-group-item"><strong>Email:</strong> {client.email}</li>
        <li className="list-group-item"><strong>Endereço:</strong> {client.address}</li>
        <li className="list-group-item"><strong>Data de Nascimento:</strong> {client.birthDate.toLocaleDateString()}</li>
        <li className="list-group-item"><strong>Renda Anual:</strong> R$ {client.annualIncome.toLocaleString("pt-BR")}</li>
        <li className="list-group-item"><strong>Patrimônio:</strong> R$ {client.assets.toLocaleString("pt-BR")}</li>
        <li className="list-group-item"><strong>Estado Civil:</strong> {client.maritalStatus}</li>
      </ul>

      <h4 className="text-primary">Contas Bancárias</h4>
      {clientAccounts.length === 0 ? (
        <p className="text-muted">Nenhuma conta encontrada.</p>
      ) : (
        <table className="table table-bordered mt-2">
          <thead className="table-primary">
            <tr>
              <th>Tipo</th>
              <th>Saldo</th>
              <th>Limite</th>
              <th>Crédito Disponível</th>
            </tr>
          </thead>
          <tbody>
            {clientAccounts.map((account) => (
              <tr key={account.id}>
                <td>{account.type}</td>
                <td>R$ {account.balance.toLocaleString("pt-BR")}</td>
                <td>R$ {account.creditLimit.toLocaleString("pt-BR")}</td>
                <td>R$ {account.availableCredit.toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4 className="text-primary mt-5">Agência</h4>
      {agency ? (
        <ul className="list-group">
          <li className="list-group-item"><strong>Nome:</strong> {agency.name}</li>
          <li className="list-group-item"><strong>Código:</strong> {agency.code}</li>
          <li className="list-group-item"><strong>Endereço:</strong> {agency.address}</li>
        </ul>
      ) : (
        <p className="text-muted">Agência não encontrada.</p>
      )}
    </div>
  );
}
