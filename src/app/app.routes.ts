import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'proof-of-concept',
    pathMatch: 'full',
  },
  {
    path: 'proof-of-concept',
    loadComponent: () =>
      import('./poc/proof-of-concept/proof-of-concept.page').then(
        (m) => m.ProofOfConceptPage
      ),
  },
];
