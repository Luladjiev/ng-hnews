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
    path: 'item/:itemId',
    loadComponent: () =>
      import('./features/item/ui/item/item.component').then(
        (m) => m.ItemComponent
      ),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./features/about/ui/about/about.component').then(
        (m) => m.AboutComponent
      ),
  },
];
