import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './assets/app.css';

import Navbar from './layouts/Navbar';
import { routes } from './routes';

function App() {
  const elements = useRoutes(routes);

  return (
    <div className="container">
      <ToastContainer />
      <h3 className="text-light text-center mt-4">Servicios</h3>
      <Navbar />
      {elements}
    </div>
  );
}

export default App;
