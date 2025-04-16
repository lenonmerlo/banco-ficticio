import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

interface Props {
  data: { name: string; income: number }[];
}

export default function IncomeChart({ data }: Props) {
  return (
    <div className="card p-3 shadow-sm">
      <h5 className="mb-3">Renda Anual por Cliente</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="income" fill="#007bff" name="Renda" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
