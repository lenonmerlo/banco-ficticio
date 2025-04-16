interface ClientSearchProps {
  value: string;
  onChange: (newValue: string) => void;
}

const applyCpfCnpjMask = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 11) {
    // CPF: 000.000.000-00
    return digits
      .replace(/^(\d{3})(\d)/, "$1.$2")
      .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1-$2")
      .slice(0, 14);
  } else {
    // CNPJ: 00.000.000/0000-00
    return digits
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  }
};

export default function ClientSearch({ value, onChange }: ClientSearchProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = applyCpfCnpjMask(e.target.value);
    onChange(formatted);
  };

  return (
    <input
      type="text"
      className="form-control mb-4 shadow-sm"
      placeholder="Buscar por CPF/CNPJ..."
      value={value}
      onChange={handleInput}
    />
  );
}
