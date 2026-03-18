import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiLink } from '../../environments/api-link.environment';
import { Iglobal } from '../../../shared/interfaces/global/iglobal.interfaces';
import { IOrders } from '../../interfaces/ordersInterfaces/iorders.interfaces';

@Injectable({
  providedIn: 'root',
})
export class OrdersServices {
  private readonly httpClint = inject(HttpClient);
  ordersCount: WritableSignal<number> = signal(0);

  getAllOrders(): Observable<Iglobal<IOrders[]>> {
    return this.httpClint.get<Iglobal<IOrders[]>>(ApiLink.apiLink + 'orders');
  }

  updateOrderStatus(id: string, status: object): Observable<Iglobal<IOrders>> {
    return this.httpClint.put<Iglobal<IOrders>>(ApiLink.apiLink + 'orders/' + id, status);
  }
}
