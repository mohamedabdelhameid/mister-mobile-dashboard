import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BrandsServices } from '../../../../core/services/brandsServices/brands.services';
import { Brands } from '../../../../core/interfaces/brandsInterfaces/brands-interfaces.interfaces';
import { ToastUtilService } from '../../../../core/services/toastrServices/toastr.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  private readonly brandsServices = inject(BrandsServices);
  private readonly toastr = inject(ToastUtilService);
  readonly router = inject(Router);
  brands: WritableSignal<Brands[] | null> = signal(null);

  ngOnInit(): void {
    this.getAllBrands();
  }

  getAllBrands() {
    this.brandsServices.getAllBrands().subscribe({
      next: (res) => {
        this.brands.set(res.data);
      },
      error: (err) => {
        this.toastr.error('فشلت عملية جلب الماركات', 'فشلت');
      },
    });
  }

  deleteBrands(id: string) {
    this.brandsServices.deleteBrand(id).subscribe({
      next: (res) => {
        this.getAllBrands();
        this.toastr.success('تم حذف الماركة بنجاح', 'نجحت');
      },
      error: (err) => {
        this.toastr.error('فشلت عملية حذف الماركة', 'فشل');
      },
    });
  }
}
