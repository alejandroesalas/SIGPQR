import Swal from "sweetalert2";

export var global = {
  url :'http://localhost/SIGPQR/SIGPQR-Back-End/public/api/',
  contentType:'application/x-www-form-urlencoded',
  tagProgram:'programs',
  tagAdmin:'admin',
  tagUser:'users',
  tagCoordinator:'coordinators',
  tagFaculty:'faculties',
  tagAdd:'add',
  tagEdit:'edit'
}
export const swal = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})
