import { Link, useLocation } from 'react-router-dom';
import './navbar.css';

export default function Navbar() {
  const { hash } = useLocation();

  //cambiar la clase a activa cuando le corresponda
  const activePath = (link) => `nav-link ${hash === link ? 'active' : ''}`;

  return (
    <nav className="navbar navbar-expand-lg bg-light mt-4 mb-3">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className={activePath('#todos')} to="#todos">
                Todos
              </Link>
            </li>
            <li className="nav-item">
              <Link className={activePath('#autos')} to="#autos">
                Autos
              </Link>
            </li>
            <li className="nav-item">
              <Link className={activePath('#salud')} to="#salud">
                Salud
              </Link>
            </li>
            <li className="nav-item">
              <Link className={activePath('#hogar')} to="#hogar">
                Hogar
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
