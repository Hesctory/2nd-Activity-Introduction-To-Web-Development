import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        <img src="/logo.png" alt="Poções & Soluções" className="navbar__logo" />
        <span className="navbar__title">Poções &amp; Soluções</span>
      </Link>
      <nav className="navbar__links">
        <NavLink to="/" end className="navbar__link">
          Loja
        </NavLink>
        <a href="/#historia" className="navbar__link">
          História
        </a>
        <a href="/#contato" className="navbar__link">
          Contato
        </a>
        <NavLink to="/admin" className="navbar__link navbar__link--admin">
          Administração
        </NavLink>
      </nav>
    </header>
  );
}
