import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./common/routes/home-page.routes').then(m => m.routes),
  },
  {
    path: 'register',
    loadChildren: () => import('./features/management/registration/routes/registration.routes').then(m => m.routes),
  },
  {
    path: 'authentification',
    loadChildren: () => import('./common/routes/login.routes').then(m => m.routes),
  },
  {
    path: 'destination',
    loadChildren: () => import('./features/destination/routes/destination.routes').then(m => m.routes),
  },
  {
    path: 'conditions-generales',
    loadComponent: () => import('./common/pages/conditions-generales/conditions-generales.component').then(m => m.ConditionsGeneralesComponent),
  },
  {
    path: 'politique-confidentialite',
    loadComponent: () =>
      import('./common/pages/politique-confidentialite/politique-confidentialite.component').then(m => m.PolitiqueConfidentialiteComponent),
  },
  { path: 'not-found', loadChildren: () => import('./common/routes/not-found.routes').then(m => m.routes) },
  { path: '**', redirectTo: '/not-found' },
];
