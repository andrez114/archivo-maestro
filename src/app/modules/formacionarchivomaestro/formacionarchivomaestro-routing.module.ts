import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormacionarchivomaestroComponent } from './formacionarchivomaestro.component';

const APP_ROUTES: Routes = [
  {
    path: '',
    component: FormacionarchivomaestroComponent,
    data: {
      title: 'formacionarchivomaestro',
    },
  },
];
@NgModule({
  imports: [RouterModule.forChild(APP_ROUTES)],
  exports: [RouterModule]
})
export class FormacionarchivomaestroRoutingModule { }
