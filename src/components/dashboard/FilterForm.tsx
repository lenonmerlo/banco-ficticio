interface Props {
  setFiltros: (f: { nome: string; rendaMin: number; rendaMax: number }) => void;
}

export default function FilterForm({ setFiltros }: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nome = (e.currentTarget.nome as HTMLInputElement).value;
    const rendaMin = Number((e.currentTarget.rendaMin as HTMLInputElement).value || 0);
    const rendaMax = Number((e.currentTarget.rendaMax as HTMLInputElement).value || Infinity);
    setFiltros({ nome, rendaMin, rendaMax });
  }

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
      <h5 className="mb-3">Filtrar Clientes</h5>
      <input name="nome" type="text" className="form-control mb-2" placeholder="Nome do cliente" />
      <input name="rendaMin" type="number" className="form-control mb-2" placeholder="Renda mínima" />
      <input name="rendaMax" type="number" className="form-control mb-3" placeholder="Renda máxima" />
      <button type="submit" className="btn btn-primary w-100">Filtrar</button>
    </form>
  );
}
