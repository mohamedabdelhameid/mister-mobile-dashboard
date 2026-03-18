import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiLink } from '../../environments/api-link.environment';
import { Observable } from 'rxjs';
import { Iglobal } from '../../../shared/interfaces/global/iglobal.interfaces';
import {
  IAddImageColorMobile,
  IAddMobileColorAndStock,
  IMobile,
  IUpdateMobileColorStock,
} from '../../interfaces/mobilesInterfaces/imobile.interfaces';

@Injectable({
  providedIn: 'root',
})
export class MobilesServices {
  private readonly httpClint = inject(HttpClient);

  getAllMobiles(): Observable<Iglobal<IMobile[]>> {
    return this.httpClint.get<Iglobal<IMobile[]>>(ApiLink.apiLink + 'mobiles');
  }

  showMobile(id: string): Observable<Iglobal<IMobile>> {
    return this.httpClint.get<Iglobal<IMobile>>(ApiLink.apiLink + 'mobiles/' + id);
  }

  addMobile(mobile: FormData): Observable<Iglobal<IMobile>> {
    return this.httpClint.post<Iglobal<IMobile>>(ApiLink.apiLink + 'mobiles', mobile);
  }

  updateMobile(id: string, mobile: FormData): Observable<Iglobal<IMobile>> {
    return this.httpClint.post<Iglobal<IMobile>>(ApiLink.apiLink + 'mobiles/' + id, mobile);
  }

  deleteMobile(id: string): Observable<Iglobal<IMobile>> {
    return this.httpClint.delete<Iglobal<IMobile>>(ApiLink.apiLink + 'mobiles/' + id);
  }

  addMobileColorAndStock(
    data: IAddMobileColorAndStock,
  ): Observable<Iglobal<IUpdateMobileColorStock>> {
    return this.httpClint.post<Iglobal<IUpdateMobileColorStock>>(
      ApiLink.apiLink + 'mobile-colors',
      data,
    );
  }

  updateMobileColorAndStock(
    id: string,
    stock_quantity: number,
  ): Observable<Iglobal<IUpdateMobileColorStock>> {
    return this.httpClint.put<Iglobal<IUpdateMobileColorStock>>(
      ApiLink.apiLink + 'mobile-colors/' + id,
      { stock_quantity },
    );
  }

  deleteMobileColorAndStock(id: string): Observable<Iglobal<IMobile>> {
    return this.httpClint.delete<Iglobal<IMobile>>(ApiLink.apiLink + 'mobile-colors/' + id);
  }

  addImagesColorMobile(data: FormData): Observable<Iglobal<IAddImageColorMobile[]>> {
    return this.httpClint.post<Iglobal<IAddImageColorMobile[]>>(
      ApiLink.apiLink + 'mobile-images',
      data,
    );
  }

  // deleteImageColorMobile(id : string):Observable<any>{
  //   return this.httpClint.delete<any>(ApiLink.apiLink + 'mobile-images/' + id);
  // }
}
