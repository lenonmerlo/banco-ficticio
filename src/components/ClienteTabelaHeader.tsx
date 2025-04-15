interface Props {
    ordenarPor: string;
    ordemAscendente: boolean;
    aoClicar: (coluna: string) => void;
  }
  
  export default function ClienteTabelaHeader({ ordenarPor, ordemAscendente, aoClicar }: Props) {
    const seta = (coluna: string) =>
      ordenarPor === coluna ? (ordemAscendente ? "▲" : "▼") : "";
  
    return (
      <thead className="table-primary text-white">
        <tr>
          <th onClick={() => aoClicar("nome")} style={{ cursor: "pointer" }}>
            Nome {seta("nome")}
          </th>
          <th onClick={() => aoClicar("cpfCnpj")} style={{ cursor: "pointer" }}>
            CPF/CNPJ {seta("cpfCnpj")}
          </th>
          <th onClick={() => aoClicar("email")} style={{ cursor: "pointer" }}>
            Email {seta("email")}
          </th>
          <th onClick={() => aoClicar("rendaAnual")} style={{ cursor: "pointer" }}>
            Renda Anual {seta("rendaAnual")}
          </th>
        </tr>
      </thead>
    );
  }
  