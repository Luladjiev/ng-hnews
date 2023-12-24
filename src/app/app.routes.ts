import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/front-page/ui/front-page/front-page.component').then(
        (c) => c.FrontPageComponent
      ),
  },
  {
    path: 'page-two',
    loadComponent: () =>
      import('./features/page-two/page-two.component').then(
        (m) => m.PageTwoComponent
      ),
  },
];
