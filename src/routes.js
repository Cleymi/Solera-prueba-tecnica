import { Navigate } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Servicios from './components/Servicios/Servicios';

const routes = [
  { path: '/', element: <Navigate to="servicios#todos" replace /> },
  { path: 'servicios', element: <Servicios /> },
  { path: '*', element: <NotFound /> },
];

export { routes };
