import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-aside',
  templateUrl: './app-aside.component.html',
})
export class AppAsideComponent implements OnInit {
  @Input() messages: any;

  constructor() {}

  ngOnInit() {}
}
