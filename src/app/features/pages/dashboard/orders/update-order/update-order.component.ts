import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersServices } from '../../../../../core/services/ordersServices/orders.services';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-update-order',
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './update-order.component.html',
  styleUrl: './update-order.component.css',
})
export class UpdateOrderComponent {
  private readonly fb = inject(FormBuilder);
  private readonly ordersServices = inject(OrdersServices);
  private readonly toastr = inject(ToastUtilService);
  private readonly rouetr = inject(Router);
  updateOrderStatus!: FormGroup;
  authSubscription!: Subscription;
  private readonly route = inject(ActivatedRoute);
  orderId!: string;

  ngOnInit(): void {
    this.initializeForm();
    this.getOrderId();
  }

  initializeForm() {
    this.updateOrderStatus = this.fb.group({
      payment_status: ['', Validators.required],
    });
  }

  getOrderId() {
    this.route.params.subscribe((params) => {
      this.orderId = params['id'];
    });
  }

  updateOrder() {
    this.authSubscription?.unsubscribe();
    this.authSubscription = this.ordersServices
      .updateOrderStatus(this.orderId, this.updateOrderStatus.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('تم تعديل الطلب بنجاح', 'نجحت');
          this.updateOrderStatus.reset();
          location.href = '/dashboard/orders';
        },
        error: (err) => {
          this.toastr.error('فشلت تعديل الطلب', 'فشل');
        },
      });
  }

  onSubmit() {
    if (this.updateOrderStatus.invalid) {
      this.updateOrderStatus.markAllAsTouched();
    } else {
      this.updateOrder();
    }
  }
}
