import { Link } from "react-router-dom";

export default function PaginaNaoEncontrada() {
  return (
    <div className="container text-center py-5">
      <h1 className="display-4 text-danger">404</h1>
      <p className="lead">Página não encontrada</p>
      <p>A URL que você tentou acessar não existe.</p>
      <Link to="/" className="btn btn-primary mt-3">
        Voltar para a Home
      </Link>
    </div>
  );
}
