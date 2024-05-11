import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuService, AuthenticationService } from './../../services/index';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent implements OnInit {
  @Input() imgUrl: string;
  @Input() appLogo: string;
  @Input() user: any;
  @Input() notifications: any[];
  @Input() messages: any[];

  // @Output() onLogout: EventEmitter<any> = new EventEmitter();

  subscription: Subscription;
  menuExist = false;
  nom_Empleado: string = "Espere......";
  constructor(private menuData: MenuService, private auth: AuthenticationService) {}

  logOut() {
    setTimeout(() => {
      this.auth.logout();
    }, 100);
  }

  ngOnInit() {
    document.oncontextmenu = function(){return false}
    document.querySelector('body').classList.add('aside-menu-hidden');
    this.subscription = this.menuData.navItem$.subscribe(
      (value) => {
        this.menuExist = value;
      },
      (err) => {}
    );
    this.nom_Empleado = this.menuData.getUserName()
  }
}
