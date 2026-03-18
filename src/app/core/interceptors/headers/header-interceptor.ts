import { isPlatformBrowser } from '@angular/common';
import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  let plate_id = inject(PLATFORM_ID);

  if (isPlatformBrowser(plate_id)) {
    const token = localStorage.getItem('admin_access_token');
    if (token) {
      if (
        req.url.includes('statistics') ||
        req.url.includes('brands') ||
        req.url.includes('colors') ||
        req.url.includes('mobiles') ||
        req.url.includes('mobile-images') ||
        req.url.includes('mobile-colors') ||
        req.url.includes('contact-us') ||
        req.url.includes('orders')
      ) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json',
          },
        });
      }
    } else {
      req = req.clone({
        setHeaders: {
          Accept: 'application/json',
        },
      });
    }
  }
  return next(req);
};
