interface Client {
  name: string;
  cpfCnpj: string;
  email: string;
  annualIncome: number;
}

interface Props {
  clients: Client[];
}

export default function ExportCsv({ clients }: Props) {
  const handleExport = () => {
    const rows = [
      ["Nome", "CPF/CNPJ", "Email", "Renda Anual"],
      ...clients.map((client) => [
        client.name,
        formatCpfCnpj(client.cpfCnpj),
        client.email,
        `R$ ${client.annualIncome.toLocaleString("pt-BR")}`,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((row) => row.join(";")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "clientes.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCpfCnpj = (value: string) => {
    const digitsOnly = value.replace(/\D/g, "");
    if (digitsOnly.length <= 11) {
      return digitsOnly.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else {
      return digitsOnly.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
  };

  return (
    <button className="btn btn-outline-primary btn-sm" onClick={handleExport}>
      📤 Exportar CSV
    </button>
  );
}
