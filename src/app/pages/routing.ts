import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'borusan',
    loadChildren: () =>
      import('../borusan/borusan.module').then((m) => m.BorusanModule),
  },
 
  // {
  //   path: 'dashboard',
  //   loadChildren: () =>
  //     import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
  // },
 

  {
    path: '',
    redirectTo: '/borusan',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'error/404',
  },
];

export { Routing };
