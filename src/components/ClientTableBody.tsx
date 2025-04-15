import { Cliente } from "../types";
import { formatarCpfCnpj } from "../utils/formatters";

export default function ClientTableBody({ clientes }: { clientes: Cliente[] }) {
  return (
    <tbody>
      {clientes.map((cliente) => (
        <tr key={cliente.id}>
          <td>
            <a
              href={`/cliente/${cliente.cpfCnpj}`}
              className="text-decoration-none fw-bold text-primary"
            >
              {cliente.nome}
            </a>
          </td>
          <td>{formatarCpfCnpj(cliente.cpfCnpj)}</td>
          <td>{cliente.email}</td>
          <td>R$ {cliente.rendaAnual.toLocaleString("pt-BR")}</td>
        </tr>
      ))}
    </tbody>
  );
}
