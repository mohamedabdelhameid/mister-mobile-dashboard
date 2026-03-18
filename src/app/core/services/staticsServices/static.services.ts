import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { ApiLink } from '../../environments/api-link.environment';
import { Observable } from 'rxjs';
import { IStatic } from '../../interfaces/staticsInterfaces/istatic.interfaces';

@Injectable({
  providedIn: 'root',
})
export class StaticServices {
  private readonly httpClint = inject(HttpClient);

  getStatistics(): Observable<IStatic> {
    return this.httpClint.get<IStatic>(ApiLink.apiLink + 'statistics');
  }
}
