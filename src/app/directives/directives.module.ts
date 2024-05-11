import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestringirTipoDirective, Ng2SearchPipe } from './index';

@NgModule({
  imports: [CommonModule],
  declarations: [RestringirTipoDirective, Ng2SearchPipe],
  exports: [RestringirTipoDirective, Ng2SearchPipe],
})
export class DirectivesModule {}
