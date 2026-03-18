import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../environments/api-link.environment';
import { Iglobal } from '../../../shared/interfaces/global/iglobal.interfaces';
import { Brands } from '../../interfaces/brandsInterfaces/brands-interfaces.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BrandsServices {
  private readonly httpClint = inject(HttpClient);

  getAllBrands(): Observable<Iglobal<Brands[]>> {
    return this.httpClint.get<Iglobal<Brands[]>>(ApiLink.apiLink + 'brands');
  }

  deleteBrand(id: string): Observable<Iglobal<Brands>> {
    return this.httpClint.delete<Iglobal<Brands>>(ApiLink.apiLink + 'brands/' + id);
  }

  addBrand(data: FormData): Observable<Iglobal<Brands>> {
    return this.httpClint.post<Iglobal<Brands>>(ApiLink.apiLink + 'brands', data);
  }

  showBrand(id: string): Observable<any> {
    return this.httpClint.get<any>(ApiLink.apiLink + `brands/${id}`);
  }

  updateBrand(id: string, data: FormData): Observable<Iglobal<Brands>> {
    return this.httpClint.post<Iglobal<Brands>>(ApiLink.apiLink + `brands/${id}`, data);
  }
}
