import { Component, inject, signal, WritableSignal } from '@angular/core';
import { OrdersServices } from '../../../../core/services/ordersServices/orders.services';
import { IOrders } from '../../../../core/interfaces/ordersInterfaces/iorders.interfaces';
import { ToastUtilService } from '../../../../core/services/toastrServices/toastr.services';
import { DatePipe, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ApiLink } from '../../../../core/environments/api-link.environment';

@Component({
  selector: 'app-orders',
  imports: [NgClass, DatePipe],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent {
  private readonly ordersServices = inject(OrdersServices);
  private readonly toastr = inject(ToastUtilService);
  readonly router = inject(Router);
  ApiLink = ApiLink;
  orders: WritableSignal<IOrders[]> = signal([]);

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersServices.getAllOrders().subscribe({
      next: (res) => {
        this.orders.set(res.data);
        this.ordersServices.ordersCount.set(res.data.length);
      },
      error: (err) => {
        this.toastr.error('فشل جلب الطلبات اعد المحاولة لاحقا', 'فشل');
      },
    });
  }
}
