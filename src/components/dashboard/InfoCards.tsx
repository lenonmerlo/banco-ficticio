interface Props {
  dados: { nome: string; renda: number }[];
}

export default function InfoCards({ dados }: Props) {
  const total = dados.reduce((acc, cur) => acc + cur.renda, 0);

  return (
    <div className="row mb-4">
      <div className="col">
        <div className="card bg-light shadow-sm p-3">
          <h6>Total Renda dos Clientes</h6>
          <h4>R$ {total.toLocaleString()}</h4>
        </div>
      </div>
    </div>
  );
}
