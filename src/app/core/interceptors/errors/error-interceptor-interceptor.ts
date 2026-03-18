import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastUtilService } from '../../services/toastrServices/toastr.services';
import { inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const errorInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastr = inject(ToastUtilService);
  const router = inject(Router);
  const plate_ID = inject(PLATFORM_ID);

  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        setTimeout(() => {
          if (isPlatformBrowser(plate_ID)) {
            localStorage.removeItem('admin_access_token');
            router.navigate(['/login']);
          }
        }, 1000);
      } else if (err.status === 500) {
        toastr.error('حدث خطأ في السيرفر يرجى المحاولة لاحقا', 'خطأ');
      }
      throw err;
    }),
  );
};
