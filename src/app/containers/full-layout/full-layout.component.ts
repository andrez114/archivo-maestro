import { environment } from './../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/index';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html',
})
export class FullLayoutComponent implements OnInit {
  public imgUrl: string;
  public appLogo: string;
  public user: any;
  public notificaciones: any[];
  public mensajes: any[];
  public haveMenu: boolean;

  public toasterconfig: ToasterConfig = new ToasterConfig({ animation: 'slideDown' });

  constructor(private auth: AuthenticationService) {
    this.notificaciones = [];
    this.mensajes = [];
  }

  ngOnInit() {
    this.user = this.auth.currentUser();
    this.imgUrl = 'assets/img/avatars/avatar.png';
    if (environment.production) {
      this.imgUrl = `${environment.STATIC.hojaAzul}${this.user.numeroempleado}.jpg`;
    }
    this.haveMenu = environment.haveMenu;
    this.appLogo = environment.appLogo;
  }
}
