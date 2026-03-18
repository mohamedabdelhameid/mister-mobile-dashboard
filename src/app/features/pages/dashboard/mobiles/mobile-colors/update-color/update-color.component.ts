import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MobilesServices } from '../../../../../../core/services/mobilesServices/mobiles.services';
import { ToastUtilService } from '../../../../../../core/services/toastrServices/toastr.services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-update-color',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './update-color.component.html',
  styleUrl: './update-color.component.css',
})
export class UpdateMobileColorComponent {
  private mobileService = inject(MobilesServices);
  private toastr = inject(ToastUtilService);
  private router = inject(Router);
  updateStockForm!: FormGroup;
  private readonly route = inject(ActivatedRoute);
  colorId!: string;
  private readonly fb = inject(FormBuilder);
  authSubscription!: Subscription;

  ngOnInit(): void {
    this.initializeForm();
    this.getColorId();
  }

  getColorId() {
    this.route.params.subscribe((params) => {
      this.colorId = params['id'];
    });
  }

  initializeForm() {
    this.updateStockForm = this.fb.group({
      stock_quantity: ['', [Validators.required]],
    });
  }

  updateStockQuantity(): void {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.mobileService
      .updateMobileColorAndStock(this.colorId, this.updateStockForm.value.stock_quantity)
      .subscribe({
        next: (res) => {
          this.toastr.success('تم تعديل اللون بنجاح', 'نجحت');
          this.updateStockForm.reset();
          this.router.navigate(['/dashboard/mobiles/colors']);
        },
        error: (err) => {
          this.toastr.error('فشلت تعديل اللون', 'فشل');
        },
      });
  }

  onSubmit() {
    if (this.updateStockForm.invalid) {
      this.updateStockForm.markAllAsTouched();
    } else {
      this.updateStockQuantity();
    }
  }
}
