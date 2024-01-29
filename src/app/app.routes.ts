import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./pages/users-listing/users-listing.component').then(mod => mod.UsersListingComponent)},
  {path: 'user/:id', loadComponent: () => import('./pages/user-details/user-details.component').then(mod => mod.UserDetailsComponent)},
];
