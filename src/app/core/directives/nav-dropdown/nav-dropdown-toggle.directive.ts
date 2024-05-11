import { Directive, HostListener, ElementRef } from '@angular/core';
import { NavDropdownDirective } from './nav-dropdown.directive';

/**
 * Allows the dropdown to be toggled via click.
 */
@Directive({
  selector: '[appNavDropdownToggle]',
})
export class NavDropdownToggleDirective {
  constructor(private dropdown: NavDropdownDirective) {}

  @HostListener('click', ['$event'])
  toggleOpen($event: any) {
    $event.preventDefault();
    this.dropdown.toggle();
  }
}
