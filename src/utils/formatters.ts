export function formatarCpfCnpj(valor: string): string {
  const numeros = valor.replace(/\D/g, "");

  if (numeros.length <= 11) {
    const cpf = numeros.slice(0, 11);
    return cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    const cnpj = numeros.slice(0, 14);
    return cnpj
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{4})(\d{1,2})$/, "$1/$2-$3");
  }
}
