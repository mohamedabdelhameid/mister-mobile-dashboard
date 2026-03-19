import { Component, inject, signal, WritableSignal, computed } from '@angular/core';
import { OrdersServices } from '../../../../core/services/ordersServices/orders.services';
import { IOrders } from '../../../../core/interfaces/ordersInterfaces/iorders.interfaces';
import { ToastUtilService } from '../../../../core/services/toastrServices/toastr.services';
import { DatePipe, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiLink } from '../../../../core/environments/api-link.environment';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [NgClass, DatePipe, FormsModule],
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  private readonly ordersServices = inject(OrdersServices);
  private readonly toastr = inject(ToastUtilService);
  readonly router = inject(Router);
  ApiLink = ApiLink;

  orders: WritableSignal<IOrders[]> = signal([]);
  searchQuery = signal('');

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.ordersServices.getAllOrders().subscribe({
      next: (res) => {
        this.orders.set(res.data);
        this.ordersServices.ordersCount.set(res.data.length);
      },
      error: () => this.toastr.error('فشل جلب الطلبات اعد المحاولة لاحقا', 'فشل'),
    });
  }

  filteredOrders = computed(() => {
    const q = this.searchQuery().trim().toLowerCase(); // ← reactive ✅
    if (!q) return this.orders();
    return this.orders().filter(
      (order) =>
        order.id.toLowerCase().includes(q) ||
        order.user.first_name.toLowerCase().includes(q) ||
        order.user.last_name.toLowerCase().includes(q) ||
        `${order.user.first_name} ${order.user.last_name}`.toLowerCase().includes(q),
    );
  });

  onSearch(value: string) {
    this.searchQuery.set(value);
  }

  clearSearch() {
    this.searchQuery.set('');
  }
}
