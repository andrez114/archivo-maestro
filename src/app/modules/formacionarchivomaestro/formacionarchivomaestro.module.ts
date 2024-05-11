import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DataTableModule } from 'primeng/primeng';
import { GrowlModule } from 'primeng/primeng';
import { CodeHighlighterModule } from 'primeng/primeng';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { FormacionarchivomaestroRoutingModule } from './formacionarchivomaestro-routing.module';
import { FormacionarchivomaestroComponent } from './formacionarchivomaestro.component';
import { FormacionarchivomaestroService } from './services/formacionarchivomaestro.service';
import { DropdownModule } from 'primeng/dropdown';
import { PanelModule } from 'primeng/panel';
import { ConsultasComponent } from './consultas/consultas.component';
import { ModalModule } from 'ngx-bootstrap';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProgressBarModule } from 'primeng/progressbar';
import { SharedComponentsModule } from '../../shared-components/shared-components.module';

@NgModule({
    imports: [
        CommonModule,
        FormacionarchivomaestroRoutingModule,
        FormsModule,
        ChartsModule,
        BsDropdownModule,
        DataTableModule,
        TableModule,
        GrowlModule,
        CodeHighlighterModule,
        MenubarModule,
        TooltipModule,
        CommonModule,
        DropdownModule,
        PanelModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot(),
        ProgressBarModule,
        SharedComponentsModule,
    ],
    providers: [FormacionarchivomaestroService],
    declarations: [FormacionarchivomaestroComponent, ConsultasComponent],
})
export class FormacionarchivomaestroModule { }
