import { Component, OnInit, TemplateRef, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { FormacionarchivomaestroService } from './services/formacionarchivomaestro.service';
import swal from 'sweetalert2';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Alerta } from './models/alertas';
import { ToasterService, Toast } from 'angular2-toaster';
import { Mensaje } from './../../models/mensaje';
import { MenuService } from '../../services/menu.service';


@Component({
  selector: 'app-formacionarchivomaestro',
  templateUrl: './formacionarchivomaestro.component.html',
  styleUrls: ['./formacionarchivomaestro.component.scss']
})
export class FormacionarchivomaestroComponent implements OnInit {

  @BlockUI() blockUI: NgBlockUI;
  @Output() consultas = new EventEmitter<Boolean>();

  public alerta: Alerta = new Alerta();
  public modalRef: BsModalRef;
  public opcionTienda: any;
  public tablatiendas: any = '';
  public disaBtnEjecutar: boolean = true;
  public valorTienda: any;
  public valorOpcion: any;
  public flagArchivoMaestro: any = [];
  public disaBtnConsultar: boolean = true;
  public tienda: any;
  public numEmpleado: any;

  public mensaje: Mensaje;
  public openPdf = new EventEmitter();
  public opcion: string;

  constructor(
    private route: ActivatedRoute,
    private service: FormacionarchivomaestroService,
    private modalService: BsModalService,
    private toasterService: ToasterService,
    private Menu: MenuService) {
    this.mensaje = new Mensaje(toasterService);
    this.opcion = 'download';
  }

  public async  ngOnInit() {
    this.numEmpleado = this.Menu.getUser();
    this.opcionTienda = [
      { label: 'Apertura', value: 2 },
      { label: 'Normales', value: 1 }
    ];

    this.cargarTiendas(2);
  }

  public async abirPDFNormal(opcion: string, tienda) {
    this.blockUI.start('Generando Pdf...');
    this.opcion = opcion;
    await this.service.generarPdfNormal(tienda).subscribe((Response: any) => {
      const byteCharacters = atob(Response.data.response.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      this.openPdf.emit(blob);
      this.descargar(Response.data.response.base64, Response.data.response.nombre);
      this.blockUI.stop();
      this.alerta.mensajeCorrecto('Proceso generado correctamente.');
    }, (error) => {
      this.blockUI.stop();
      this.alerta.mensajeError('Error al generar el reporte, intentelo de nuevo más tarde.');
    });
  }

  public async abirPDFNuevo(opcion: string, tienda) {
    this.blockUI.start('Generando Pdf...');
    this.opcion = opcion;
    await this.service.generarPdfNuevo(tienda).subscribe((Response: any) => {
      const byteCharacters = atob(Response.data.response.base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray]);
      this.openPdf.emit(blob);
      this.descargar(Response.data.response.base64, Response.data.response.nombre);
      this.blockUI.stop();
      this.alerta.mensajeCorrecto('Proceso generado correctamente.');
    }, (error) => {
      this.blockUI.stop();
      this.alerta.mensajeError('Error al generar el reporte, intentelo de nuevo más tarde.');
    });
  }

  private descargar(base64: any, nombre: string) {
    const link = 'data:application/pdf;base64,' + base64;
    const descargarLink = document.createElement("a");
    const fileName = nombre;
    descargarLink.href = link;
    descargarLink.download = fileName;
    descargarLink.click();
  }

  public validarEjecutar(tienda, opcion) {
    this.tienda = tienda;
    if (opcion == undefined) {
      opcion = 2
    }

    if (tienda > 0) {
      this.disaBtnEjecutar = false;
      if (opcion == 2) {
        this.disaBtnConsultar = false;
      } else {
        this.disaBtnConsultar = true;
      }
    } else {
      this.disaBtnEjecutar = true;
    }
  }

  public async cargarTiendas(opcion) {
    this.disaBtnEjecutar = true;
    this.disaBtnConsultar = true;
    this.valorTienda = null;
    this.blockUI.start('Cargando...');
    await this.service.consultarTiendas(opcion).toPromise().then((Response: any) => {
      this.tablatiendas = Response.data.response;
      if (this.tablatiendas == null) {
        this.alerta.mensajeInfo('No se encontraron tiendas para mostrar.');
      }
      this.blockUI.stop();
    }, (error) => {
      this.blockUI.stop();
      this.alerta.mensajeError('Error al cargar las tiendas, intentelo de nuevo más tarde.');
    });
    this.blockUI.stop();
  }

  public async ejecutarFormacion(opcion, tienda, error) {
    this.disaBtnEjecutar = true;
    if (opcion == undefined) {
      opcion = 2;
    }

    await swal({
      title: '¿Está seguro de iniciar la formación del archivo maestro?',
      text: "",
      type: 'question',
      showCancelButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'No',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.value) {
        this.blockUI.start('Generando Archivo Maestro...');
        this.service.formacionArchivoMaestro(opcion, tienda, error, this.numEmpleado).toPromise().then((Response: any) => {
          this.blockUI.stop();
          if (Response.data.response.length > 0) {
            this.flagArchivoMaestro = Response.data.response[0].Salida;
          }
          this.mensajesError(this.flagArchivoMaestro, opcion, tienda);
        }, (error) => {
          this.blockUI.stop();
          this.alerta.mensajeError('Error en la formación del archivo maestro, intentelo de nuevo más tarde.');
        });
      }
    })

  }

  public mensajesError(flag, opcion, tienda) {
    switch (parseInt(flag)) {
      case 1:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'la tienda ' + tienda + ' no existe en el catalogo de tiendas');
        break;
      case 2:
        this.disaBtnEjecutar = false;
        if (opcion == 1)
          this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'la tienda ' + tienda + ' aun no abre.');
        else
          this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'la tienda ' + tienda + ' ya tiene clave de abierta.');
        break;
      case 3:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'la tienda ' + tienda + ' no se encuentra en el maestro de inventarios.');
        break;
      case 4:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'la existencia en unidades de maestro de inventarios no es mayor a cero.');
        break;
      case 5:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'la existencia en pesos de maestro de inventarios no es mayor a cero.');
        break;
      case 6:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'existen diferencias de unidades entre maestro de guías y maestro de inventario.');
        break;
      case 7:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'existen diferencias de pesos entre maestro de guías y maestro de inventario.');
        break;
      case 8:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'se encontraron cambios de precio sin actualizar');
        break;
      case 9:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'el artículo con identificador 800007 aún posee existencia en unidades');
        break;
      case 10:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'el artículo con identificador 800007 aún posee existencia en pesos');
        break;
      case 11:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'la cantidad de información del maestro no es igual al del maestro de artículos y tallas');
        break;
      case 12:
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Estatus ' + flag + ', ' + 'el total de  unidades y pesos no es igual al maestro de tiendas');
        break;
      case 13:
        swal({
          type: 'success',
          title: 'Estatus ' + flag + ', ' + 'Generación de maestro finalizó correctamente.... Continua la transmisión de la información.',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false,
          confirmButtonText: 'Aceptar',
        }).then((result) => {
          if (result.value) {
            this.transmitirArchivoMaestro(opcion, tienda);
          }
        })
        break;
      default:
        break;
    }
  }

  public async transmitirArchivoMaestro(opcion, tienda) {
    this.blockUI.start('Transmitiendo y Actualizando Información...');
    await this.service.procesarTransmisionTablas(opcion, this.numEmpleado, tienda).toPromise().then((Response: any) => {
      this.blockUI.stop();
      if (Response.data.response == true) {
        if (opcion == 1) {
          this.abirPDFNormal('tab', tienda);

          this.disaBtnEjecutar = false;
        } else {
          this.abirPDFNuevo('tab', tienda);
          this.disaBtnEjecutar = false;
        }

      } else {
        this.disaBtnEjecutar = false;
        this.alerta.mensajeInfo('Error con la transmisión, intentelo de nuevo más tarde.');
      }
    }, (error) => {
      this.disaBtnEjecutar = false;
      this.blockUI.stop();
      this.alerta.mensajeError('Error con la transmisión, intentelo de nuevo más tarde.');
    });
  }

  public ProcesarEdicionSolicitud(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,
      { class: 'modal-lg modal-dialog-centered', keyboard: false, backdrop: true, ignoreBackdropClick: true }
    );
  }

  public procesarModal() {
    this.blockUI.start("Cargando...");
    if (!this.modalRef) {
      this.blockUI.stop();
      return;
    }
    this.modalRef.hide();
    this.modalRef = null;
    this.blockUI.stop();
  }

  public regresar() {
    window.location.href = atob(sessionStorage.url);
  }

  public limpiar() {
    this.valorTienda = null;
    this.valorOpcion = null;
    this.disaBtnEjecutar = true;
    this.disaBtnConsultar = true;
    this.cargarTiendas(2);
  }
}
