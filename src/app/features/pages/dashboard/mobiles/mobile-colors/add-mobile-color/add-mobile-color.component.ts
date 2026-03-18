import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ColorsServices } from '../../../../../../core/services/colorServices/colors.services';
import { MobilesServices } from '../../../../../../core/services/mobilesServices/mobiles.services';
import { ToastUtilService } from '../../../../../../core/services/toastrServices/toastr.services';
import {
  IAddMobileColorAndStock,
  IMobile,
} from '../../../../../../core/interfaces/mobilesInterfaces/imobile.interfaces';
import { IColor } from '../../../../../../core/interfaces/colorInterfaces/icolor.interfaces';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-mobile-color',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './add-mobile-color.component.html',
  styleUrl: './add-mobile-color.component.css',
})
export class AddMobileColorComponent {
  private mobilesServices = inject(MobilesServices);
  private colorsServices = inject(ColorsServices);
  private toastr = inject(ToastUtilService);
  mobiles: WritableSignal<IMobile[]> = signal([]);
  colors: WritableSignal<IColor[]> = signal([]);
  addColorAndQuantityForm!: FormGroup;
  authSubscription?: Subscription;
  private readonly fb = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit() {
    this.initializeForm();
    this.getAllMobiles();
    this.getAllColor();
  }

  initializeForm() {
    this.addColorAndQuantityForm = this.fb.group({
      mobile_id: ['', Validators.required],
      color_id: ['', Validators.required],
      stock_quantity: ['', Validators.required],
    });
  }

  getAllMobiles(): void {
    this.mobilesServices.getAllMobiles().subscribe({
      next: (res) => {
        this.mobiles.set(res.data);
      },
      error: (err) => {
        this.toastr.error('فشل جلب الموبايلات', 'فشل');
      },
    });
  }

  getAllColor(): void {
    this.colorsServices.getAllColors().subscribe({
      next: (res) => {
        this.colors.set(res.data);
      },
      error: (err) => {
        this.toastr.error('فشل جلب الألوان', 'فشل');
      },
    });
  }

  addColorAndStock(): void {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.mobilesServices
      .addMobileColorAndStock(this.addColorAndQuantityForm.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('تم إضافة اللون والمخزون بنجاح', 'نجاح');
          this.addColorAndQuantityForm.reset();
        },
        error: (err) => {
          this.toastr.error('تأكد اذا كان اللون موجود اولا ثم اعد المحاولة', 'فشل');
        },
      });
  }

  onSubmit() {
    if (this.addColorAndQuantityForm.invalid) {
      this.addColorAndQuantityForm.markAllAsTouched();
    } else {
      this.addColorAndStock();
    }
  }
}
