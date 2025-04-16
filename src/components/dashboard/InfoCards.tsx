interface Props {
  data: { name: string; income: number }[];
}

export default function InfoCards({ data }: Props) {
  const totalIncome = data.reduce((acc, cur) => acc + cur.income, 0);

  return (
    <div className="row mb-4">
      <div className="col">
        <div className="card bg-light shadow-sm p-3">
          <h6>Total Renda dos Clientes</h6>
          <h4>R$ {totalIncome.toLocaleString()}</h4>
        </div>
      </div>
    </div>
  );
}
