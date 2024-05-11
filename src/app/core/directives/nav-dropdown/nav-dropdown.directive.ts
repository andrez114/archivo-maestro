import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appNavDropdown]',
})
export class NavDropdownDirective {
  constructor(private el: ElementRef) {}

  toggle() {
    this.el.nativeElement.classList.toggle('open');
  }
}
