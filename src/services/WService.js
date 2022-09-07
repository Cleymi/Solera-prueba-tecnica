import Axios from 'axios';

const baseUrl = 'https://60d76bd0307c300017a5f86c.mockapi.io/api/vi';

/**
 * * concatenar url con las entidades
 * @param {*string entidad para la url} entity
 * @param {*integer para los casos que lo requieran } id
 * @returns string url concatenada
 */
const mergeUrl = (entity, id) => {
  const urlApi = `${baseUrl}/${entity}`;
  if (id) return `${urlApi}/${id}`;
  return urlApi;
};

// ? el data y success lo estoy agregando manualmente
// ? esto por lo general es devuelto por el backend

async function wsGetAll(entity) {
  try {
    const response = await Axios.get(mergeUrl(entity));
    return { data: response.data, success: true };
  } catch (err) {
    errorHandler(err);
  }
}

async function wsCreate(entity, data) {
  try {
    const response = await Axios.post(mergeUrl(entity), data);
    return { data: response.data, success: true };
  } catch (err) {
    errorHandler(err);
  }
}

async function wsUpdate(entity, id, data) {
  try {
    const response = await Axios.put(mergeUrl(entity, id), data);
    return { data: response.data, success: true };
  } catch (err) {
    errorHandler(err);
  }
}

async function wsDelete(entity, id) {
  try {
    const response = await Axios.delete(mergeUrl(entity, id));
    return { data: response.data, success: true };
  } catch (err) {
    return errorHandler(err);
  }
}

const errorHandler = (err) => {
  // aquí se puede agregar
  // el mensaje personalizado que retorna el servidor
  // para mostrar cuando se use los servicios
  console.error(err);
  return { data: null, success: false };
};

export { wsGetAll, wsCreate, wsUpdate, wsDelete };
