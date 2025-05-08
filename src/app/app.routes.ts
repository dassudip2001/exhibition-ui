import { Routes } from '@angular/router';
import { ContentWrapperComponent } from './shared/component/content-wrapper/content-wrapper.component';

export const routes: Routes = [
  {
    path: 'exhibition-app',
    component: ContentWrapperComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'exhibitions',
        loadComponent: () =>
          import('./features/exhibition/exhibition.component').then(
            (m) => m.ExhibitionComponent
          ),
      },
      {
        path: 'exhibition/create',
        loadComponent: () =>
          import(
            './features/exhibition/views/exhibition-basic-form/exhibition-basic-form.component'
          ).then((m) => m.ExhibitionBasicFormComponent),
      },
      {
        path: 'exhibition/edit/:id',
        loadComponent: () =>
          import(
            './features/exhibition/views/exhibition-basic-form/exhibition-basic-form.component'
          ).then((m) => m.ExhibitionBasicFormComponent),
      },

      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'exhibition-app',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'exhibition-app',
    pathMatch: 'full',
  },
];
