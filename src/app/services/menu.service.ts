import { ConfigService } from './config.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, config } from 'rxjs';

@Injectable()
export class MenuService {
  public apiRoot: string;
  public menuExist = new BehaviorSubject(false);

  navItem$ = this.menuExist.asObservable();

  constructor(public http: HttpClient, private configService: ConfigService) {
    this.apiRoot = './assets/menu.json';
  }

  getMenu(queryParams?: any): Observable<any> {
    if (this.configService.config.apiMenu) {
      //this.apiRoot = this.configService.config.apiMenu;
    }
    return this.http.get(this.apiRoot, { params: queryParams }).map((resp: any) => {
      return resp.data.menu;
    });
  }

  setExistMenu(value: boolean) {
    this.menuExist.next(value);
  }

  public getUserName(): string {
    let user = JSON.parse(sessionStorage.currentUser);
    return user.nombre + " " + user.apellidopaterno + " " + user.apellidomaterno;
  }

  getUser(): string {
    let user = JSON.parse(sessionStorage.currentUser);
    return user.numeroempleado
  }

  getPuesto(): string {
    let user = JSON.parse(sessionStorage.currentUser);
    return user.numeropuesto;
  }

  getSeccion(): string {
    let user = JSON.parse(sessionStorage.currentUser);
    return user.seccioncentro;
  }

  getCentro(): string {
    let user = JSON.parse(sessionStorage.currentUser);
    return user.numerocentro;
  }

}
