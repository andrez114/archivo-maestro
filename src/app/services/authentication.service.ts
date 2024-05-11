import { MenuService } from './menu.service';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'd3';

import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { MessageService } from 'primeng/components/common/messageservice';
import { ToasterModule, ToasterService, Toast } from 'angular2-toaster';
import { ConfigService } from './config.service';

@Injectable()
export class AuthenticationService {
  @BlockUI() blockUI: NgBlockUI;
  public settings: any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private toasterService: ToasterService,
    private message: MessageService,
    private menuService: MenuService,
    private configService: ConfigService,
  ) {
    this.settings = configService.getConfig();
  }

  login(_username: string, _password: string) {
    return this.http.post<any>('/api/authenticate', { username: _username, password: _password }).pipe(
      map((user) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          sessionStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  loginHuella(credentials: any) {
    this.http.post(environment.SSO + '/v1/login', credentials).subscribe(
      (respuesta: any) => {
        this.setLogin(respuesta.data.empleado, respuesta.data.token, "loginconhuella");
      },
      (error) => {
        const toast: Toast = {
          type: 'error',
          title: 'Mensaje',
          body: error.error.meta.error.userMessage,
        };
        this.toasterService.pop(toast);
      }
    );
  }

  loginAutomatico(_token?: string, _credentials?: any, url?: string) {
    if (_token) {
      this.http.post<any>(environment.SSO + '/v1/verify', { token: _token }).subscribe(
        (respuesta) => {
          this.http.post<any>(environment.SSO + '/v1/me', { token: _token }).subscribe(
            (resp) => {
              this.blockUI.stop();
              const info = resp.data;
              info.token = _token;
              this.setLogin(info, _token, url);
            },
            (error) => { }
          );
        },
        (err) => {
          this.blockUI.stop();
          const toast: Toast = {
            type: 'error',
            title: 'Mensaje',
            body: err.meta.error.userMessage,
          };
          this.toasterService.pop(toast);
        }
      );
    } else {
      this.http
        .post<any>(environment.localSSO + '/auth/login', { numEmpleado: _credentials.user.numEmpleado })
        .subscribe(
          (resp) => {
            this.blockUI.stop();
            const info = _credentials;
            info.token = resp.acces_token;
            this.setLogin(_credentials, resp.access_token, url);
          },
          (error) => {
            this.blockUI.stop();
            const toast: Toast = {
              type: 'error',
              title: 'Mensaje',
              body: error.meta.error.userMessage,
            };
            this.toasterService.pop(toast);
          }
        );
    }
  }

  isAuth() {
    if (sessionStorage.getItem('currentUser')) {
      return true;
    } else {
      return false;
    }
  }

  currentUser() {
    return JSON.parse(sessionStorage.getItem('currentUser'));
  }

  logout() {
    this.deletesessionStorage();
    if (environment.inHouse[0]) {
      this.router.navigate(['/login']);
    } else {
      window.location.href = environment.STATIC.redirect;
    }
  }

  setLogin(user: any, token: any, url: any) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('url', url);
    this.blockUI.stop();
    this.router.navigate(['/']);
  }

  private deletesessionStorage() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
    this.cerrarsesion();
  }

  private cerrarsesion() {
    this.http.post<any>(environment.SSO + '/v1/logout', { token: sessionStorage.token }).subscribe(
      (respuesta) => {
        window.location.href = environment.STATIC.redirect;
      },
      (error) => {
        window.location.href = environment.STATIC.redirect;
      });
  }
}
