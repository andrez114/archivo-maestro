import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormacionarchivomaestroService } from './../services/formacionarchivomaestro.service';
import { FormacionarchivomaestroComponent } from './../formacionarchivomaestro.component';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Alerta } from './../models/alertas';


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['../formacionarchivomaestro.component.scss']
})
export class ConsultasComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  @Output() consultas = new EventEmitter<Boolean>();

  public alerta: Alerta = new Alerta();

  constructor(
    private service: FormacionarchivomaestroService,
    private funcion: FormacionarchivomaestroComponent) {

  }

  public resultadoActualizacion: Boolean = false;
  public maestro: any;




  ngOnInit() {
    this.cargarMaestro();
  }

  public async cargarMaestro() {
    this.blockUI.start('Cargando...');
    await this.service.consultarMaestro(this.funcion.tienda).toPromise().then((Response: any) => {
      this.maestro = Response.data.response;
      this.blockUI.stop();
    }, (error) => {
      this.blockUI.stop();
      this.alerta.mensajeError('Error al cargar las tiendas, intentelo de nuevo mas tarde.');
    });
    this.blockUI.stop();
  }


  public cerrarFormulario() {
    this.consultas.emit(this.resultadoActualizacion);
  }
}
