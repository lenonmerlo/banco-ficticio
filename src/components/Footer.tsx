export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container text-center">
        <small>&copy; {currentYear} Banco Fictício. Todos os direitos reservados.</small>
        <p>Desenvolvido por Lenon Merlo</p>
      </div>
    </footer>
  );
}
