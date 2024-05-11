import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { Event, Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { HuellaService } from '@oc/ngx-huella';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  _environment: boolean;
  _huella: boolean;
  _inHouse: boolean;

  public credential: any = {};
  public objToaster: any;
  public returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthenticationService,
    private toaster: ToasterService,
    private huellaService: HuellaService
  ) {
    this._environment = environment.production;
    this._huella = environment.inHouse[1];
    this._inHouse = environment.inHouse[0];
  }

  ngOnInit() {
    if (environment.inHouse[0]) {
      this.auth.logout();
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    } else {
      this.blockUI.start('Loading...');
      if (this._environment) {
        this.route.queryParams.subscribe((params: Params) => {
          if (params.token) {
            this.auth.loginAutomatico(params.token,'', params.url);
          } else if (this.auth.isAuth()) {
            this.blockUI.stop();
            this.router.navigate(['/']);
          } else {
            this.auth.logout();
            setTimeout(() => {
              window.location.href = environment.STATIC.redirect;
            }, 0);
          }
        });
      } else {
        this.blockUI.stop();
        this.auth.loginAutomatico(null, {
          user: { nombre: 'Juan Perez', numEmpleado: 99000001 },
        }, '');
      }
    }
  }

  public login() {
    if (this._huella) {
      this.huellaService.getHuella().subscribe(
        (respuesta) => {
          if (respuesta.error !== '') {
            this.toaster.pop({ type: 'info', title: 'Mensaje', body: respuesta.error });
            return false;
          } else {
            this.auth.loginHuella({ numEmpleado: this.credential.Empleado, template: respuesta.template64 });
            return true;
          }
        },
        (error) => {
          this.toaster.pop({ type: 'error', title: 'Mensaje', body: error.message });
          return false;
        }
      );
    } else {
      this.auth.login('', '').subscribe(
        (resp) => {
          if (resp.UsuarioValido === false) {
            this.toaster.pop({ type: 'error', title: 'Error', body: 'Usuario No Valido' });
          } else {
            this.router.navigate([this.returnUrl]);
          }
        },
        (error) => {
          this.toaster.pop({ type: 'error', title: 'Error', body: error });
        }
      );
    }
  }
}
