interface Cliente {
    nome: string;
    cpfCnpj: string;
    email: string;
    rendaAnual: number;
  }
  
  interface Props {
    clientes: Cliente[];
  }
  
  export default function ExportarCsv({ clientes }: Props) {
    const exportarCsv = () => {
      const linhas = [
        ["Nome", "CPF/CNPJ", "Email", "Renda Anual"],
        ...clientes.map((cliente) => [
          cliente.nome,
          formatarCpfCnpj(cliente.cpfCnpj),
          cliente.email,
          `R$ ${cliente.rendaAnual.toLocaleString("pt-BR")}`,
        ]),
      ];
  
      const csvContent =
        "data:text/csv;charset=utf-8," +
        linhas.map((linha) => linha.join(";")).join("\\n");
  
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "clientes.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    const formatarCpfCnpj = (valor: string) => {
      const apenasNumeros = valor.replace(/\\D/g, "");
      if (apenasNumeros.length <= 11) {
        return apenasNumeros.replace(/(\\d{3})(\\d{3})(\\d{3})(\\d{2})/, "$1.$2.$3-$4");
      } else {
        return apenasNumeros.replace(/(\\d{2})(\\d{3})(\\d{3})(\\d{4})(\\d{2})/, "$1.$2.$3/$4-$5");
      }
    };
  
    return (
      <button className="btn btn-outline-primary btn-sm" onClick={exportarCsv}>
        📤 Exportar CSV
      </button>
    );
  }
  