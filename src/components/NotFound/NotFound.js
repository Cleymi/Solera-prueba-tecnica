import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="d-flex flex-column align-items-center">
      <h3 className="text-light">No existe la ruta</h3>
      <Link to="servicios#todos" className="link-warning">
        <strong>Regresar</strong>
      </Link>
    </div>
  );
}
