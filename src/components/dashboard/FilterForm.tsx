interface Props {
  setFilters: (f: { name: string; minIncome: number; maxIncome: number }) => void;
}

export default function FilterForm({ setFilters }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const name = (e.currentTarget.name as unknown as HTMLInputElement).value;
    const minIncome = Number((e.currentTarget.minIncome as HTMLInputElement).value || 0);
    const maxIncome = Number((e.currentTarget.maxIncome as HTMLInputElement).value || Infinity);
    setFilters({ name, minIncome, maxIncome });
  }

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
      <h5 className="mb-3">Filtrar Clientes</h5>
      <input name="name" type="text" className="form-control mb-2" placeholder="Nome do cliente" />
      <input name="minIncome" type="number" className="form-control mb-2" placeholder="Renda mínima" />
      <input name="maxIncome" type="number" className="form-control mb-3" placeholder="Renda máxima" />
      <button type="submit" className="btn btn-primary w-100 gap">Filtrar</button>
    </form>
  );
}
