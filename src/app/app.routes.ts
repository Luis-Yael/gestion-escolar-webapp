import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./screens/login-screen/login-screen').then(m => m.LoginScreen),
  },

  { path: '**', redirectTo: 'login' },
];
