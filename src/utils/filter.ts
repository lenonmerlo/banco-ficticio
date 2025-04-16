import { Client } from "../types";

export function filterClients(clients: Client[], term: string): Client[] {
  const lowerTerm = term.toLowerCase();
  return clients.filter(
    (c) =>
      (c.name ?? "").toLowerCase().includes(lowerTerm) ||
      (c.cpfCnpj ?? "").includes(term)
  );
}
