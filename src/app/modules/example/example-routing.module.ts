import { ExampleFormComponent } from './example-form/example-form.component';
import { ExampleListComponent } from './example-list/example-list.component';
import { ExampleComponent } from './example.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ExampleComponent,
    children: [
      { path: '', component: ExampleListComponent },
      { path: 'nuevo', data: { title: 'Nuevo' }, component: ExampleFormComponent },
      { path: 'editar/:id', data: { title: 'Editar' }, component: ExampleFormComponent },
    ],
  },
];

export const ExampleRoutingModule = RouterModule.forChild(routes);
