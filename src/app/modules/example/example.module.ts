import { CiudadService } from './services/ciudad.service';
import { CentroService } from './services/centro.service';
import { ExampleRoutingModule } from './example-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExampleComponent } from './example.component';
import { ExampleFormComponent } from './example-form/example-form.component';
import { ExampleListComponent } from './example-list/example-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { CalendarModule, DropdownModule, MultiSelectModule } from 'primeng/primeng';
import { BlockUIModule } from 'ng-block-ui';
import { ModalModule, TooltipModule, TypeaheadModule } from 'ngx-bootstrap';
import { DirectivesModule } from '../../directives/directives.module';
import { TableModule } from 'primeng/table';
import { HuellaModule, HuellaService } from '@oc/ngx-huella';
import { ExamplePipe } from './pipes/example.pipe';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';

@NgModule({
  imports: [
    CommonModule,
    ExampleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    OrderModule,
    NgxPaginationModule,
    TooltipModule.forRoot(),
    BlockUIModule,
    ModalModule.forRoot(),
    DirectivesModule,
    TableModule,
    CalendarModule,
    HuellaModule,
    DropdownModule,
    MultiSelectModule,
    CalendarModule,
    TypeaheadModule.forRoot(),
    SharedComponentsModule,
  ],
  declarations: [ExamplePipe, ExampleComponent, ExampleFormComponent, ExampleListComponent],
  providers: [CentroService, HuellaService, CiudadService],
})
export class ExampleModule {}
