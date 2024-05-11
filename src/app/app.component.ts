import { Component, OnInit } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<block-ui></block-ui><router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;
  constructor() {}
  ngOnInit() {}
}
