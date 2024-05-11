import { ToasterModule } from 'angular2-toaster';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { GrowlModule } from 'primeng/primeng';
import { HuellaModule, HuellaService } from '@oc/ngx-huella';
import { DirectivesModule } from '../../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LoginRoutingModule,
    GrowlModule,
    DirectivesModule,
    HuellaModule,
    ToasterModule.forChild(),
  ],
  declarations: [LoginComponent],
  providers: [HuellaService],
})
export class LoginModule {}
