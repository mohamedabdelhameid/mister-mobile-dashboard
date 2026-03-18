import { Routes } from '@angular/router';
import { DashboardComponent } from './features/pages/dashboard/dashboard.component';
import { HomeComponent } from './features/pages/dashboard/home/home.component';
import { MobilesComponent } from './features/pages/dashboard/mobiles/mobiles.component';
import { authGuard } from './core/guards/authGuard/auth-guard';
import { guestGuardGuard } from './core/guards/guestGuard/guest-guard-guard';
import { BrandsComponent } from './features/pages/dashboard/brands/brands.component';
import { AddBrandComponent } from './features/pages/dashboard/brands/add-brand/add-brand.component';
import { UpdateBrandComponent } from './features/pages/dashboard/brands/update-brand/update-brand.component';
import { ColorsComponent } from './features/pages/dashboard/colors/colors.component';
import { AddColorComponent } from './features/pages/dashboard/colors/add-color/add-color.component';
import { UpdateColorComponent } from './features/pages/dashboard/colors/update-color/update-color.component';
import { UpdateMobileColorComponent } from './features/pages/dashboard/mobiles/mobile-colors/update-color/update-color.component';
import { AddMobileComponent } from './features/pages/dashboard/mobiles/add-mobile/add-mobile.component';
import { UpdateMobileComponent } from './features/pages/dashboard/mobiles/update-mobile/update-mobile.component';
import { MobileColorsComponent } from './features/pages/dashboard/mobiles/mobile-colors/mobile-colors.component';
import { AddMobileColorComponent } from './features/pages/dashboard/mobiles/mobile-colors/add-mobile-color/add-mobile-color.component';
import { ImagesColorComponent } from './features/pages/dashboard/mobiles/images-color/images-color.component';
import { MessagesComponent } from './features/pages/dashboard/messages/messages.component';
import { OrdersComponent } from './features/pages/dashboard/orders/orders.component';
import { UpdateOrderComponent } from './features/pages/dashboard/orders/update-order/update-order.component';
import { NotFoundComponent } from './features/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login.component').then((m) => m.LoginComponent),
    title: 'تسجيل الدخول',
    canActivate: [authGuard],
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [guestGuardGuard],
    children: [
      { path: 'home', component: HomeComponent, title: 'لوحة التحكم' },
      { path: 'messages', component: MessagesComponent, title: 'الرسائل' },
      { path: 'brands', component: BrandsComponent, title: 'الماركات' },
      { path: 'brands/add', component: AddBrandComponent, title: 'إضافة ماركة' },
      { path: 'brands/:id', component: UpdateBrandComponent, title: 'تعديل ماركة' },
      { path: 'colors', component: ColorsComponent, title: 'الألوان' },
      { path: 'colors/add', component: AddColorComponent, title: 'إضافة لون' },
      { path: 'colors/:id', component: UpdateColorComponent, title: 'تعديل لون' },
      { path: 'mobiles', component: MobilesComponent, title: 'الموبايلات' },
      { path: 'mobiles/add', component: AddMobileComponent, title: 'إضافة موبايل' },
      { path: 'mobiles/update/:id', component: UpdateMobileComponent, title: 'تعديل موبايل' },
      { path: 'mobiles/colors', component: MobileColorsComponent, title: 'ألوان الموبايل' },
      {
        path: 'mobiles/colors/add',
        component: AddMobileColorComponent,
        title: 'إضافة لون الموبايل',
      },
      {
        path: 'mobiles/colors/update/:id',
        component: UpdateMobileColorComponent,
        title: 'تعديل لون الموبايل',
      },
      {
        path: 'mobiles/images/:id',
        component: ImagesColorComponent,
        title: 'صور لون الموبايل',
      },
      { path: 'orders', component: OrdersComponent, title: 'الطلبات' },
      { path: 'orders/update/:id', component: UpdateOrderComponent, title: 'تعديل الطلب' },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'صفحة غير موجودة',
  },
];
