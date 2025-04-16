export interface Client {
  id: string;
  cpfCnpj: string;
  rg?: string;
  birthDate: Date;
  name: string;
  socialName?: string;
  email: string;
  address: string;
  annualIncome: number;
  assets: number;
  maritalStatus: "Solteiro" | "Casado" | "Viúvo" | "Divorciado";
  agencyCode: number;
}

export interface Account {
  id: string;
  clientCpfCnpj: string;
  type: "corrente" | "poupanca";
  balance: number;
  creditLimit: number;
  availableCredit: number;
}

export interface Agency {
  id: string;
  code: number;
  name: string;
  address: string;
}
