import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastUtilService } from '../../../core/services/toastrServices/toastr.services';
import { MessagesServices } from '../../../core/services/messagesServices/messages.services';
import { OrdersServices } from '../../../core/services/ordersServices/orders.services';

@Component({
  selector: 'app-sidepar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidepar.component.html',
  styleUrl: './sidepar.component.css',
})
export class SideparComponent {
  private readonly plate_ID = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly messagesServices = inject(MessagesServices);
  private readonly ordersServices = inject(OrdersServices);
  messagesCount: WritableSignal<number> = this.messagesServices.messagesCount;
  ordersCount: WritableSignal<number> = this.ordersServices.ordersCount;

  private readonly toastr = inject(ToastUtilService);

  ngOnInit() {
    this.getAllMessages();
    this.getAllOrders();
  }

  getAllMessages() {
    this.messagesServices.getAllMessages().subscribe({
      next: (res) => {
        this.messagesCount.set(res.data.length);
        this.messagesServices.messagesCount.set(this.messagesCount());
      },
      error: (err) => {
        this.toastr.error('فشل جلب الرسائل', 'فشلت');
      },
    });
  }

  getAllOrders() {
    this.ordersServices.getAllOrders().subscribe({
      next: (res) => {
        this.ordersCount.set(res.data.length);
        this.ordersServices.ordersCount.set(this.ordersCount());
      },
      error: (err) => {
        this.toastr.error('فشل جلب الطلبات اعد المحاولة لاحقا', 'فشل');
      },
    });
  }

  logOut() {
    if (isPlatformBrowser(this.plate_ID)) {
      localStorage.removeItem('admin_access_token');
      this.router.navigate(['/login']);
    }
  }
}
