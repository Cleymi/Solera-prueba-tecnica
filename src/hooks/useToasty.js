import { toast } from 'react-toastify';

const showNotify = (message, type = 'success') => {
  return toast[type](message, { autoClose: 5000 });
};

export { showNotify };
