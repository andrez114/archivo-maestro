import { Router } from '@angular/router';
import { Component, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
  selector: 'app-sidebar-nav-dropdown',
  template: `
    <a class="nav-link nav-dropdown-toggle" appNavDropdownToggle href="">
      <i *ngIf="isIcon()" class="{{ link.icon }}"></i>
      {{ link.name }}
      <span *ngIf="isBadge()" [ngClass]="'badge badge-' + link.badge.variant">{{ link.badge.text }}</span>
    </a>
    <ul class="nav-dropdown-items children">
      <ng-template ngFor let-child [ngForOf]="link.children">
        <app-sidebar-nav-item [item]="child"></app-sidebar-nav-item>
      </ng-template>
    </ul>
  `,
})
export class AppSidebarNavDropdownComponent {
  @Input()
  link: any;

  constructor() {}

  public isBadge() {
    if (this.link.badge) {
      return true;
    }
    return false;
  }

  public isIcon() {
    if (this.link.icon) {
      return true;
    }
    return false;
  }
}
