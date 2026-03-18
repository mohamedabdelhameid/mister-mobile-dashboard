import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import { MobilesServices } from '../../../../../core/services/mobilesServices/mobiles.services';
import { Brands } from '../../../../../core/interfaces/brandsInterfaces/brands-interfaces.interfaces';
import { BrandsServices } from '../../../../../core/services/brandsServices/brands.services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-mobile',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './add-mobile.component.html',
  styleUrl: './add-mobile.component.css',
})
export class AddMobileComponent {
  private readonly fb = inject(FormBuilder);
  private readonly mobilesServices = inject(MobilesServices);
  private readonly brandsServices = inject(BrandsServices);
  private readonly toastr = inject(ToastUtilService);
  file: WritableSignal<File | null> = signal(null);
  addMobileForm!: FormGroup;
  authSubscription!: Subscription;
  brands: WritableSignal<Brands[]> = signal([]);

  ngOnInit(): void {
    this.initializeForm();
    this.getAllBrands();
  }

  selectImage(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files?.item(0)) {
      this.file.set(target.files?.item(0)!);
      this.addMobileForm.get('image')?.setValue(this.file()?.name || '');
    }
  }

  initializeForm() {
    this.addMobileForm = this.fb.group({
      title: ['', Validators.required],
      brand_id: ['', Validators.required],
      model_number: ['LUXA Store', Validators.required], // ديما luxa store
      description: ['', Validators.required],
      battery: ['', Validators.required],
      processor: ['', Validators.required],
      storage: ['', Validators.required], // مساحة التخزين و الرامات
      display: ['', Validators.required], // الشاشة حجمها و نوعها وكام هيرتز
      price: ['', Validators.required],
      discount: ['', Validators.required],
      operating_system: ['', Validators.required],
      camera: ['', Validators.required],
      network_support: ['', Validators.required], // 4G or 5G or else
      release_year: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  getAllBrands(): void {
    this.brandsServices.getAllBrands().subscribe({
      next: (res) => {
        this.brands.set(res.data);
      },
    });
  }

  addMobile() {
    const data = new FormData();
    data.append('title', this.addMobileForm.get('title')?.value || '');
    data.append('brand_id', this.addMobileForm.get('brand_id')?.value || '');
    data.append('model_number', this.addMobileForm.get('model_number')?.value || '');
    data.append('description', this.addMobileForm.get('description')?.value || '');
    data.append('battery', this.addMobileForm.get('battery')?.value || '');
    data.append('processor', this.addMobileForm.get('processor')?.value || '');
    data.append('storage', this.addMobileForm.get('storage')?.value || '');
    data.append('display', this.addMobileForm.get('display')?.value || '');
    data.append('price', this.addMobileForm.get('price')?.value || '');
    data.append('discount', this.addMobileForm.get('discount')?.value || '');
    data.append('operating_system', this.addMobileForm.get('operating_system')?.value || '');
    data.append('camera', this.addMobileForm.get('camera')?.value || '');
    data.append('network_support', this.addMobileForm.get('network_support')?.value || '');
    data.append('release_year', this.addMobileForm.get('release_year')?.value || '');
    data.append('status', this.addMobileForm.get('status')?.value || '');
    data.append('image_cover', this.file() || ({} as File));

    this.authSubscription?.unsubscribe();

    this.authSubscription = this.mobilesServices.addMobile(data).subscribe({
      next: (res) => {
        this.toastr.success('تم إضافة الموبايل بنجاح', 'نجحت');
        this.initializeForm();
        this.file.set(null);
      },
      error: (err) => {
        this.toastr.error(
          'فشلت إضافة الموبايل يرجى المحاولة مرة اخرى مع التأكد من حجم الصورة',
          'فشل',
        );
      },
    });
  }
}
