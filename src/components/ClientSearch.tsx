interface ClienteBuscaProps {
    valor: string;
    onChange: (novoValor: string) => void;
  }
  
  const aplicarMascaraCpfCnpj = (valor: string): string => {
    const numeros = valor.replace(/\D/g, "");
  
    if (numeros.length <= 11) {
      // CPF: 000.000.000-00
      return numeros
        .replace(/^(\d{3})(\d)/, "$1.$2")
        .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1-$2")
        .slice(0, 14); // 11 dígitos + 3 separadores
    } else {
      // CNPJ: 00.000.000/0000-00
      return numeros
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2")
        .slice(0, 18); // 14 dígitos + 4 separadores
    }
  };
  
  export default function ClientSearch({ valor, onChange }: ClienteBuscaProps) {
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatado = aplicarMascaraCpfCnpj(e.target.value);
      onChange(formatado);
    };
  
    return (
      <input
        type="text"
        className="form-control mb-4 shadow-sm"
        placeholder="Buscar por CPF/CNPJ..."
        value={valor}
        onChange={handleInput}
      />
    );
  }
  