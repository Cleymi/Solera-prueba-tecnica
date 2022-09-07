import Swal from 'sweetalert2';

const showAlert = async (execAction) => {
  Swal.fire({
    title: '¿Esta seguro de eliminar?',
    text: 'No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, eliminar!',
    cancelButtonText: 'Cancelar',
  }).then((result) => {
    if (result.isConfirmed) execAction();
  });
};

export { showAlert };
