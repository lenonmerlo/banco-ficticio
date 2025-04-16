import { Client } from "../types";
import { formatCpfCnpj } from "../utils/formatters";

export default function ClientTableBody({ clients }: { clients: Client[] }) {
  return (
    <tbody>
      {clients.map((client) => (
        <tr key={client.id}>
          <td>
            <a
              href={`/cliente/${client.cpfCnpj}`}
              className="text-decoration-none fw-bold text-primary"
            >
              {client.name}
            </a>
          </td>
          <td>{formatCpfCnpj(client.cpfCnpj)}</td>
          <td>{client.email}</td>
          <td>R$ {client.annualIncome.toLocaleString("pt-BR")}</td>
        </tr>
      ))}
    </tbody>
  );
}
