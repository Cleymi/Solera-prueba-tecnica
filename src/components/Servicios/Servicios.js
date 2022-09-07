import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
  wsGetAll,
  wsCreate,
  wsUpdate,
  wsDelete,
} from '../../services/WService';
import './servicios.css';
import { showNotify } from '../../hooks/useToasty';

export default function Servicios() {
  const location = useLocation();

  const [services, setServices] = useState([]);
  const [types, setTypes] = useState([]);
  const [serviceSelect, setServiceSelect] = useState({});

  /**
   * * obtener los valores de los controles del formulario
   * @param {*evento } e
   */
  const handleChange = (e) => {
    setServiceSelect({ ...serviceSelect, [e.target.name]: e.target.value });
  };

  /**
   * * filtrar en base a los tipos de servicio
   * @param {*servico por el cual filtrar} service
   * @returns true || false
   */
  const filterService = (service) => {
    let typeID;
    switch (location.hash) {
      case '#todos':
        typeID = 0;
        break;
      case '#autos':
        typeID = 1;
        break;
      case '#salud':
        typeID = 2;
        break;
      case '#hogar':
        typeID = 3;
        break;
      default:
        typeID = 0;
    }
    if (typeID === 0) return true;
    return parseInt(service.type_id) === typeID;
  };

  // * listar servicios
  const listServices = async () => {
    const response = await wsGetAll('services');
    if (response.success) setServices(response.data);
  };

  // * listar tipos de servicios
  const listTypes = async () => {
    const response = await wsGetAll('type');
    if (response.success) setTypes(response.data);
  };

  /**
   * * Ejecutar funciones de actualizar o crear servicio
   * @param {*evento del boton} e
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    serviceSelect.id ? updateService() : createService();
  };

  // * Limpiar formulario
  const clearForm = () => setServiceSelect({});

  // * Crear servicio
  const createService = async () => {
    const response = await wsCreate('services', serviceSelect);
    if (response.success) {
      const addServices = [...services, response.data];
      setServices(addServices);
      showNotify('Registro creado exitosamente');
      clearForm();
    } else {
      showNotify('Error al crear registro', 'error');
    }
  };

  /**
   * * Actualizar servicio
   * @returns alerta en caso no exita modificaciones
   */
  const updateService = async () => {
    const serviceId = serviceSelect.id;
    const { id, ...rest } = serviceSelect;
    const dataInitial = services.find((sc) => sc.id === serviceId);

    // verificar que existan modificaciones y enviar solo los que cambien su valor
    let filterKeysUpdate = {};
    for (const key of Object.keys(rest)) {
      if (dataInitial[key] !== rest[key]) {
        filterKeysUpdate[key] = rest[key];
      }
    }

    if (Object.keys(filterKeysUpdate).length === 0) {
      showNotify('No hay modificaciones', 'info');
      return;
    }

    const response = await wsUpdate('services', serviceId, filterKeysUpdate);
    if (response.success) {
      const cloneService = [...services];
      const indexUpdate = cloneService.findIndex((sc) => sc.id === serviceId);
      cloneService[indexUpdate] = serviceSelect;
      setServices(cloneService);
      showNotify('Registro actualizado');
      clearForm();
    } else {
      showNotify('Error al actualizar');
    }
  };

  /**
   * * Eliminar servicio
   * @param {*id del servicio a eliminar} serviceId
   */
  const deleteService = async (serviceId) => {
    const response = await wsDelete('services', serviceId);
    if (response.success) {
      const cloneService = [...services];
      const indexDelete = cloneService.findIndex((sc) => sc.id === serviceId);
      cloneService.splice(indexDelete, 1);
      setServices(cloneService);
      showNotify('Registro eliminado');
      if (serviceSelect.id === serviceId) clearForm();
    } else {
      showNotify('Error al eliminar', 'error');
    }
  };

  useEffect(() => {
    listServices();
    listTypes();

    return () => {
      setServices([]);
      setTypes([]);
    };
  }, []);

  return (
    <div className="row">
      <div className="col-12 col-sm-6 col-md-7">
        <div className="row container-services">
          {services.filter(filterService).map((service) => (
            <div
              key={service.id}
              className="col-12 col-sm-12 col-md-6 col-lg-4 mb-4"
            >
              <div className="card">
                <div className="card-body ">
                  <h5 className="card-title">{service.name}</h5>
                  <p className="card-text description">{service.description}</p>
                </div>
                <div className="card-footer d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-outline-primary btn-sm ms-2"
                    onClick={() => setServiceSelect(service)}
                  >
                    Editar
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger btn-sm ms-2"
                    onClick={() => deleteService(service.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-5 mb-4">
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="card-body">
              <h5>{serviceSelect.id ? 'Editando' : 'Crear'} servicio</h5>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Nombre
                </label>
                <input
                  name="name"
                  value={serviceSelect.name || ''}
                  required
                  type="text"
                  className="form-control"
                  id="name"
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={serviceSelect.description || ''}
                  className="form-control form-control-sm"
                  id="description"
                  rows="2"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="type_id" className="form-label">
                  Tipo
                </label>
                <select
                  name="type_id"
                  id="type_id"
                  className="form-select"
                  value={serviceSelect.type_id || ''}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Elija el tipo de servicio
                  </option>
                  {types.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-end">
              <button type="submit" className="btn btn-success btn-sm ms-2">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-warning btn-sm ms-2"
                onClick={clearForm}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
