import swal from 'sweetalert2';

export class Alerta {
  public mensajeCorrecto(info: any) {
    swal({
      type: 'success',
      title: info,
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar',
    });
  }

  public mensajeInfo(info: any) {
    swal({
      type: 'info',
      title: info,
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar',
    });
  }

  public mensajeError(info: any) {
    swal({
      type: 'error',
      title: info,
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar',
    });
  }

  public mensajeWarning(info: any) {
    swal({
      type: 'warning',
      title: info,
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Aceptar',
    });
  }
  s
}
