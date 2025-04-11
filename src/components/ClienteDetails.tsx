import { useParams, Link } from "react-router-dom";
import { useBank } from "../context/BankContext";

export default function ClienteDetails() {
  const { cpfCnpj } = useParams();
  const { clientes, contas, agencias, carregando } = useBank();

  if (carregando) return <div className="container py-4">Carregando dados...</div>;

  const cliente = clientes.find((c) => c.cpfCnpj === cpfCnpj);
  if (!cliente) return <div className="container py-4">Cliente não encontrado.</div>;

  const contasDoCliente = contas.filter((c) => c.cpfCnpjCliente === cpfCnpj);
  const agencia = agencias.find((a) => a.codigo === cliente.codigoAgencia);

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-link mb-3">← Voltar</Link>

      <h1 className="text-primary mb-3">{cliente.nome}</h1>

      <ul className="list-group mb-4">
        <li className="list-group-item"><strong>CPF/CNPJ:</strong> {cliente.cpfCnpj}</li>
        <li className="list-group-item"><strong>RG:</strong> {cliente.rg || "—"}</li>
        <li className="list-group-item"><strong>Email:</strong> {cliente.email}</li>
        <li className="list-group-item"><strong>Endereço:</strong> {cliente.endereco}</li>
        <li className="list-group-item"><strong>Data de Nascimento:</strong> {cliente.dataNascimento.toLocaleDateString()}</li>
        <li className="list-group-item"><strong>Renda Anual:</strong> R$ {cliente.rendaAnual.toLocaleString("pt-BR")}</li>
        <li className="list-group-item"><strong>Patrimônio:</strong> R$ {cliente.patrimonio.toLocaleString("pt-BR")}</li>
        <li className="list-group-item"><strong>Estado Civil:</strong> {cliente.estadoCivil}</li>
      </ul>

      <h4 className="text-primary">Contas Bancárias</h4>
      {contasDoCliente.length === 0 ? (
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
            {contasDoCliente.map((conta) => (
              <tr key={conta.id}>
                <td>{conta.tipo}</td>
                <td>R$ {Number(conta.saldo).toLocaleString("pt-BR")}</td>
                <td>R$ {Number(conta.limiteCredito).toLocaleString("pt-BR")}</td>
                <td>R$ {Number(conta.creditoDisponivel).toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h4 className="text-primary mt-5">Agência</h4>
      {agencia ? (
        <ul className="list-group">
          <li className="list-group-item"><strong>Nome:</strong> {agencia.nome}</li>
          <li className="list-group-item"><strong>Código:</strong> {agencia.codigo}</li>
          <li className="list-group-item"><strong>Endereço:</strong> {agencia.endereco}</li>
        </ul>
      ) : (
        <p className="text-muted">Agência não encontrada.</p>
      )}
    </div>
  );
}
