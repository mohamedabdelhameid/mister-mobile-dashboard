import { Component, inject, signal, WritableSignal } from '@angular/core';
import { BrandsServices } from '../../../../../core/services/brandsServices/brands.services';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-brand',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css',
})
export class AddBrandComponent {
  private readonly fb = inject(FormBuilder);
  private readonly brandsServices = inject(BrandsServices);
  private readonly toastr = inject(ToastUtilService);
  file: WritableSignal<File | null> = signal(null);
  addBrandForm!: FormGroup;
  authSubscription!: Subscription;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addBrandForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  selectImage(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files?.item(0)) {
      this.file.set(target.files?.item(0)!);
      this.addBrandForm.get('image')?.setValue(this.file()?.name || '');
    }
  }

  addBrand() {
    const data = new FormData();
    data.append('name', this.addBrandForm.get('name')?.value || '');
    data.append('image', this.file() || ({} as File));

    this.authSubscription?.unsubscribe();

    this.authSubscription = this.brandsServices.addBrand(data).subscribe({
      next: (res) => {
        this.toastr.success('تم إضافة الماركة بنجاح', 'نجحت');
        this.initializeForm();
        this.file.set(null);
      },
      error: (err) => {
        this.toastr.error(
          'فشلت إضافة الماركة يرجى المحاولة مرة اخرى مع التأكد من حجم الصورة',
          'فشل',
        );
      },
    });
  }

  onSubmit() {
    if (this.addBrandForm.invalid || !this.file()) {
      this.addBrandForm.markAllAsTouched();
    } else {
      this.addBrand();
    }
  }
}
