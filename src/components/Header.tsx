import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="container header-links">
        <Link to="/" className="h4 text-white text-decoration-none mb-0">
          Banco Fictício
        </Link>
       
      </div>
    </header>
  );
}
