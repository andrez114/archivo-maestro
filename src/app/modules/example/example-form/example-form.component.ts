import { CiudadService } from './../services/ciudad.service';
import { IFormulario } from './../../../models/formulario';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { BlockUI, NgBlockUI } from 'ng-block-ui';

import { ToasterService, Toast } from 'angular2-toaster';

import { CentroService } from '../services/centro.service';
import { AuthenticationService } from '../../../services';
import { environment } from '../../../../environments/environment';
import { ICentro } from '../models/centro';
import { Mensaje } from '../../../models';

import * as moment from 'moment';
import { ICiudad } from '../models/ciudad';

@Component({
  selector: 'app-example-form',
  templateUrl: './example-form.component.html',
})
export class ExampleFormComponent implements OnInit, OnDestroy {
  @BlockUI('centro-data')
  blockUI: NgBlockUI;

  public centro: ICentro;
  public title: string;
  public centroForm: FormGroup;
  public mensaje: Mensaje;
  public id: number;
  public ciudades: ICiudad[];
  public ciudad: ICiudad;
  private sub: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private centroService: CentroService,
    private fb: FormBuilder,
    private toasterService: ToasterService,
    private ciudadService: CiudadService
  ) {
    this.mensaje = new Mensaje(toasterService);
  }

  ngOnInit() {
    this.centroForm = this.fb.group({
      id: new FormControl(null),
      nomCentro: new FormControl('', Validators.required),
      opcEstatus: new FormControl('', Validators.required),
      selected: new FormControl(false),
      ciudadId: new FormControl('', Validators.required),
    });

    this.sub = this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.title = this.id ? 'Editar Centro - ' : 'Nuevo Centro';
      if (this.id) {
        this.blockUI.start('Loading...');
        this.centroService.obtenerPorId(this.id, { _expand: 'ciudad' }).subscribe((result) => {
          this.centro = result;
          this.inicializarFormulario(this.centro);
          this.blockUI.stop();
          this.title += this.centro.nomCentro;
        });
      }
    });

    this.ciudadService.obtener().subscribe(
      (resp) => {
        this.ciudades = resp;
      },
      (error) => {
        this.mensaje.messageError(error.error);
      }
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  public inicializarFormulario(data: ICentro) {
    const sel = data.selected ? data.selected : false;

    this.centroForm.setValue({
      id: this.id ? this.id : null,
      nomCentro: data.nomCentro,
      opcEstatus: data.opcEstatus,
      selected: sel,
      ciudadId: data.ciudad.nombre,
    });
    this.ciudad = data.ciudad;
  }
  public enviar() {
    const centro: ICentro = this.centroForm.value;
    centro.fecActualiza = moment().format('YYYY-MM-DD');
    centro.ciudadId = this.ciudad.id;
    if (this.id) {
      this.centroService.actualizar(centro).subscribe(
        (resp) => {
          this.mensaje.onMessage({ type: 'info', title: 'Mensaje', body: 'Registro Actualizado Correctamente' });
          this.regresar();
        },
        (error) => {
          const toaster: Toast = { type: 'error', title: 'Mensaje', body: error.message };
          this.mensaje.onMessage(toaster);
        }
      );
    } else {
      this.centroService.guardar(centro).subscribe(
        (resp) => {
          this.mensaje.onMessage({ type: 'success', title: 'Mensaje', body: 'Registro Almacenado Correctamente' });
          this.regresar();
        },
        (error) => {
          const toaster: Toast = { type: 'error', title: 'Mensaje', body: error };
          this.mensaje.onMessage(toaster);
        }
      );
    }
  }

  public resetForm() {
    this.centroForm.reset();
  }

  public regresar() {
    this.router.navigate(['/example']);
  }

  public typeaheadOnSelect($event) {
    this.ciudad = $event.item;
  }
}
