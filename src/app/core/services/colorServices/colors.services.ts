import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiLink } from '../../environments/api-link.environment';
import { Observable } from 'rxjs';
import { Iglobal } from '../../../shared/interfaces/global/iglobal.interfaces';
import {
  IColor,
  IColorRequest,
  IColorResponseDelete,
} from '../../interfaces/colorInterfaces/icolor.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ColorsServices {
  private readonly httpClint = inject(HttpClient);

  getAllColors(): Observable<Iglobal<IColor[]>> {
    return this.httpClint.get<Iglobal<IColor[]>>(ApiLink.apiLink + 'colors');
  }

  addColor(color: IColorRequest): Observable<Iglobal<IColor>> {
    return this.httpClint.post<Iglobal<IColor>>(ApiLink.apiLink + 'colors', color);
  }

  updateColor(id: string, color: IColorRequest): Observable<any> {
    return this.httpClint.put<any>(ApiLink.apiLink + 'colors/' + id, color);
  }

  deleteColor(id: string): Observable<IColorResponseDelete> {
    return this.httpClint.delete<IColorResponseDelete>(ApiLink.apiLink + 'colors/' + id);
  }
}
