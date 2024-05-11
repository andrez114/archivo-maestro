import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';

// Import Containers
import { FullLayoutComponent, SimpleLayoutComponent } from './containers';
import { AuthGuard } from './guards/Auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'formacionarchivomaestro',
    pathMatch: 'full',
  },
  {
    canActivate: [AuthGuard],
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'formacionarchivomaestro',
    },
    children: [
      {
        path: 'example',
        data: {
          title: 'Ejemplo',
        },
        loadChildren: './modules/example/example.module#ExampleModule',
      },
      {
        path: 'formacionarchivomaestro',
        loadChildren: './modules/formacionarchivomaestro/formacionarchivomaestro.module#FormacionarchivomaestroModule',
      },
    ],
  },
  {
    path: 'login',
    component: SimpleLayoutComponent,
    data: {
      title: 'Login',
    },
    children: [
      {
        path: '',
        loadChildren: './modules/login/login.module#LoginModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(private router: Router) {
    if (environment.production) {
      this.router.errorHandler = (error: any) => {
        this.router.navigate(['/formacionarchivomaestro']); // or redirect to default route
      };
    }
  }
}
