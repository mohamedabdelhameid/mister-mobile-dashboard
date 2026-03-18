import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../environments/api-link.environment';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AdminLoginResponse, IOldAdmin } from '../../interfaces/authInterfaces/iauth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthServicesService {
  private readonly httpClint = inject(HttpClient);
  private platformID = inject(PLATFORM_ID);
  private router = inject(Router);

  getAccountData(): Observable<any> {
    return this.httpClint.get<any>(ApiLink.apiLink + 'admin/getaccount');
  }

  loginAdmin(userData: IOldAdmin): Observable<AdminLoginResponse> {
    return this.httpClint.post<AdminLoginResponse>(ApiLink.apiLink + 'admin/login', userData);
  }

  decodeAdminData(): any | undefined {
    if (isPlatformBrowser(this.platformID)) {
      if (localStorage.getItem('admin_access_token')) {
        const token = localStorage.getItem('admin_access_token')!;
        const decoded = jwtDecode(token) as any;
        return decoded;
      } else {
        this.router.navigate(['/login']);
        return undefined;
      }
    } else {
      return undefined;
    }
  }
}
