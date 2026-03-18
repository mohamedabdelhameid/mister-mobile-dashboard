import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BrandsServices } from '../../../../../core/services/brandsServices/brands.services';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-brand',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-brand.component.html',
  styleUrl: './update-brand.component.css',
})
export class UpdateBrandComponent {
  private readonly fb = inject(FormBuilder);
  private readonly brandsServices = inject(BrandsServices);
  private readonly toastr = inject(ToastUtilService);
  private readonly rouetr = inject(Router);
  file: WritableSignal<File | null> = signal(null);
  updateBrandForm!: FormGroup;
  authSubscription!: Subscription;
  brand: WritableSignal<any> = signal('');
  private readonly route = inject(ActivatedRoute);
  brandId!: string;

  ngOnInit(): void {
    this.initializeForm();
    this.getBrandId();
  }

  getBrandId() {
    this.route.params.subscribe((params) => {
      this.brandId = params['id'];
      this.getBrandData(this.brandId);
    });
  }

  initializeForm() {
    this.updateBrandForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  getBrandData(id: string) {
    this.brandsServices.showBrand(id).subscribe({
      next: (res) => {
        this.brand.set(res.data);
      },
      error: (err) => {
        this.toastr.error('فشلت جلب الماركة', 'فشل');
      },
    });
  }

  selectImage(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files?.item(0)) {
      this.file.set(target.files?.item(0)!);
      this.updateBrandForm.get('image')?.setValue(this.file()?.name || '');
    }
  }

  updateBrand() {
    const data = new FormData();
    const name = this.updateBrandForm.get('name')?.value || this.brand()?.name;
    const image = this.file() || this.brand()?.image;

    data.append('name', name);

    if (this.file()) {
      data.append('image', this.file()!);
    }

    this.authSubscription?.unsubscribe();

    this.authSubscription = this.brandsServices.updateBrand(this.brandId, data).subscribe({
      next: (res) => {
        this.toastr.success('تم تعديل الماركة بنجاح', 'نجحت');
        this.initializeForm();
        this.file.set(null);
        this.rouetr.navigate(['/dashboard/brands']);
      },
      error: (err) => {
        this.toastr.error('فشلت تعديل الماركة', 'فشل');
      },
    });
  }

  onSubmit() {
    if (this.updateBrandForm.invalid || !this.file()) {
      this.updateBrandForm.markAllAsTouched();
    } else {
      this.updateBrand();
    }
  }
}
