import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from "recharts";

interface Props {
  dados: { nome: string; renda: number }[];
}

export default function RendaChart({ dados }: Props) {
  return (
    <div className="card p-3 shadow-sm">
      <h5 className="mb-3">Renda Anual por Cliente</h5>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dados} margin={{ top: 10, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="nome" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="renda" fill="#007bff" name="Renda" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
