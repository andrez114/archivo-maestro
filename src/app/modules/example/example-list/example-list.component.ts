import { ICiudad } from './../models/ciudad';
import { CiudadService } from './../services/ciudad.service';
import { HuellaOpciones, HuellaService } from '@oc/ngx-huella';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ICentro } from '../models/centro';
import { Mensaje } from '../../../models';
import { ToasterService, Toast } from 'angular2-toaster';
import { CentroService } from '../services/centro.service';

import swal from 'sweetalert2';
import { IEstatus } from '../models/estatus';

@Component({
  selector: 'app-example-list',
  templateUrl: './example-list.component.html',
  styles: [
    `
      .tab-width-5: {
        width: 5%;
      }
      .tab-width-10: {
        width: 10%;
      }
      .tab-width-15: {
        width: 15%;
      }
      .tab-width-40: {
        width: 40%;
      }
    `,
  ],
})
export class ExampleListComponent implements OnInit {
  @BlockUI('taller-list') blockUI: NgBlockUI;
  bsModalRef: BsModalRef;
  subscriptions: Subscription[] = [];

  public openPdf = new EventEmitter();
  public opcion: string;
  public cols: any[];
  public centros: ICentro[];
  public estatus: IEstatus[];
  public opciones: HuellaOpciones;

  public page: number;
  public itemsPerPage: number;
  public maxSize: number;
  public numPages: number;
  public length: number;
  public config: any;
  public mensaje: Mensaje;
  public key: string;
  public reverse: boolean;
  public currentPage: number;
  public ciudades: ICiudad[];

  constructor(
    private centrosService: CentroService,
    private toasterService: ToasterService,
    private modalService: BsModalService,
    private huellaService: HuellaService,
    private ciudadService: CiudadService
  ) {
    this.page = 1;
    this.itemsPerPage = 5;
    this.maxSize = 5;
    this.numPages = 1;
    this.length = 0;
    this.key = 'id';
    this.reverse = false;
    this.currentPage = 1;
    this.mensaje = new Mensaje(toasterService);
    this.opciones = new HuellaOpciones();
    this.opciones = {
      caption: '',
      style: 'secondary',
      size: 'sm',
      icon: 'fa fa-lock',
      maxTextLen: 8,
    };
  }

  ngOnInit() {
    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'nomCentro', header: 'Nombre' },
      { field: 'opcEstatus', header: 'Estatus' },
      { field: 'fecActualiza', header: 'Fecha' },
      { field: 'ciudad', header: 'Ciudad', subField: 'nombre' },
    ];

    this.estatus = [
      { value: null, label: 'Todos los Estatus' },
      { value: 0, label: 'Nuevo' },
      { value: 1, label: 'Activo' },
      { value: 2, label: 'Inactivo' },
      { value: 3, label: 'Desconocido' },
    ];
    this.cargarDatos();
  }

  public cargarDatos() {
    this.blockUI.start('Cargando...');
    this.centrosService.obtener({ _expand: 'ciudad' }).subscribe((result) => {
      this.centros = result;
      this.length = this.centros.length;
      this.blockUI.stop();
    });

    this.ciudadService.obtener().subscribe((resp) => {
      this.ciudades = resp;
      this.ciudades.unshift({ id: null, nombre: 'Todas las Ciudades', estadoId: null });
    });
  }

  public eliminar(iduCentro: number) {
    swal({
      buttonsStyling: false,
      title: 'Seguro que deseas Eliminar El Centro?',
      text: 'No se podra Revertir',
      type: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      cancelButtonClass: 'btn btn-link btn-lg',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si, Eliminar!',
      confirmButtonClass: 'btn btn-danger btn-lg',
      reverseButtons: true,
    }).then((result) => {
      if (result.value) {
        this.centrosService.eliminar(iduCentro).subscribe(
          (resp) => {
            const toaster: Toast = { type: 'success', title: 'Mensaje', body: 'Registro Eliminado Correctamente' };
            this.mensaje.onMessage(toaster);
            this.cargarDatos();
          },
          (error) => {
            const toaster: Toast = { type: 'success', title: 'Mensaje', body: error };
            this.mensaje.onMessage(toaster);
          }
        );
      }
    });
  }
  public eliminarHuella(data, centro) {}

  public eliminarHuellaServicio(iduCentro) {
    this.huellaService.getHuella().subscribe(
      (resp) => {
        if (resp.error !== '') {
          this.mensaje.messageWarning(resp.error);
        } else {
          // Llamar api de eliminacion pasandoles los argumentos de template y empleado.
        }
      },
      (error) => {
        this.mensaje.messageError(error.data.userMessage);
      }
    );
  }

  public consultarPdf() {
    this.centrosService.obtenerPdf().subscribe((dataFile) => {
      this.opcion = 'modal';
      this.openPdf.emit(dataFile);
    });
  }

  public info($event, col) {
    // console.log($event, col);
  }
}
