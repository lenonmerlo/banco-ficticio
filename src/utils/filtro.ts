import { Cliente } from "../types";

export function filterClientes(clientes: Cliente[], termo: string): Cliente[] {
  const lowerTermo = termo.toLowerCase();
  return clientes.filter(
    (c) =>
      c.nome.toLowerCase().includes(lowerTermo) ||
      c.cpfCnpj.includes(termo)
  );
}
