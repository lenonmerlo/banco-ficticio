interface Props {
  sortBy: string;
  isAscending: boolean;
  onClick: (column: string) => void;
}

export default function ClientTableHeader({ sortBy, isAscending, onClick }: Props) {
  const arrow = (column: string) =>
    sortBy === column ? (isAscending ? "▲" : "▼") : "";

  return (
    <thead className="table-primary text-white">
      <tr>
        <th onClick={() => onClick("name")} style={{ cursor: "pointer" }}>
          Nome {arrow("name")}
        </th>
        <th onClick={() => onClick("cpfCnpj")} style={{ cursor: "pointer" }}>
          CPF/CNPJ {arrow("cpfCnpj")}
        </th>
        <th onClick={() => onClick("email")} style={{ cursor: "pointer" }}>
          Email {arrow("email")}
        </th>
        <th onClick={() => onClick("annualIncome")} style={{ cursor: "pointer" }}>
          Renda Anual {arrow("annualIncome")}
        </th>
      </tr>
    </thead>
  );
}
