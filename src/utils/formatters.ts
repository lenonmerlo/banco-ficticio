export function formatCpfCnpj(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length <= 11) {
    const cpf = digits.slice(0, 11);
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    const cnpj = digits.slice(0, 14);
    return cnpj
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{4})(\d{1,2})$/, "$1/$2-$3");
  }
}
