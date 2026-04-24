import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // {
  //   path: 'dashboard/brands/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'dashboard/colors/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'dashboard/mobiles/update/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'dashboard/mobiles/images/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'dashboard/mobiles/colors/update/:id',
  //   renderMode: RenderMode.Server,
  // },
  // {
  //   path: 'dashboard/orders/update/:id',
  //   renderMode: RenderMode.Server,
  // },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
