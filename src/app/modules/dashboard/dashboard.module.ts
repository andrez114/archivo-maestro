import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DataTableModule, GrowlModule, CodeHighlighterModule } from 'primeng/primeng';
import { MessageService } from 'primeng/components/common/messageservice';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ChartsModule,
    BsDropdownModule,
    DataTableModule,
    GrowlModule,
    CodeHighlighterModule,
    MenubarModule,
  ],
  declarations: [DashboardComponent],
})
export class DashboardModule {}
