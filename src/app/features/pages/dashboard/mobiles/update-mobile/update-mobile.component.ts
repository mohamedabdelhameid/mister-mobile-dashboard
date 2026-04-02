import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Brands } from '../../../../../core/interfaces/brandsInterfaces/brands-interfaces.interfaces';
import { BrandsServices } from '../../../../../core/services/brandsServices/brands.services';
import { MobilesServices } from '../../../../../core/services/mobilesServices/mobiles.services';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import { IMobile } from '../../../../../core/interfaces/mobilesInterfaces/imobile.interfaces';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-update-mobile',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './update-mobile.component.html',
  styleUrl: './update-mobile.component.css',
})
export class UpdateMobileComponent {
  private readonly fb = inject(FormBuilder);
  private readonly mobilesServices = inject(MobilesServices);
  private readonly brandsServices = inject(BrandsServices);
  private readonly toastr = inject(ToastUtilService);
  file: WritableSignal<File | null> = signal(null);
  updateMobileForm!: FormGroup;
  authSubscription!: Subscription;
  brands: WritableSignal<Brands[]> = signal([]);
  mobile: WritableSignal<IMobile> = signal({} as IMobile);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  mobileId!: string;

  ngOnInit(): void {
    this.initializeForm();
    this.getMobileId();
    this.getAllBrands();
  }

  selectImage(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files?.item(0)) {
      this.file.set(target.files?.item(0)!);
      this.updateMobileForm.get('image')?.setValue(this.file()?.name || '');
    }
  }

  initializeForm() {
    this.updateMobileForm = this.fb.group({
      title: [this.mobile()?.title, Validators.required],
      brand_id: [this.mobile()?.brand?.id, Validators.required],
      model_number: ['Mister Mobile Store', Validators.required], // ديما Mister Mobile store
      description: [this.mobile()?.description, Validators.required],
      battery: [this.mobile()?.battery, Validators.required],
      processor: [this.mobile()?.processor, Validators.required],
      storage: [this.mobile()?.storage, Validators.required], // مساحة التخزين و الرامات
      display: [this.mobile()?.display, Validators.required], // الشاشة حجمها و نوعها وكام هيرتز
      price: [this.mobile()?.price, Validators.required],
      discount: [this.mobile()?.discount, Validators.required],
      operating_system: [this.mobile()?.operating_system, Validators.required],
      camera: [this.mobile()?.camera, Validators.required],
      network_support: [this.mobile()?.network_support, Validators.required], // 4G or 5G or else
      release_year: [this.mobile()?.release_year, Validators.required],
      status: [this.mobile()?.status, Validators.required],
    });
  }

  getAllBrands(): void {
    this.brandsServices.getAllBrands().subscribe({
      next: (res) => {
        this.brands.set(res.data);
      },
    });
  }

  getMobileId() {
    this.route.params.subscribe((params) => {
      this.mobileId = params['id'];
      this.getMobileData();
    });
  }

  getMobileData(): void {
    this.mobilesServices.showMobile(this.mobileId).subscribe({
      next: (res) => {
        this.mobile.set(res.data);
        this.updateMobileForm.patchValue({
          title: res.data.title,
          brand_id: res.data.brand.id,
          model_number: res.data.model_number,
          description: res.data.description,
          battery: res.data.battery,
          processor: res.data.processor,
          storage: res.data.storage,
          display: res.data.display,
          price: res.data.price,
          discount: res.data.discount,
          operating_system: res.data.operating_system,
          camera: res.data.camera,
          network_support: res.data.network_support,
          release_year: res.data.release_year,
          status: res.data.status,
        });
      },
    });
  }

  updateMobile() {
    const data = new FormData();
    data.append('title', this.updateMobileForm.get('title')?.value || this.mobile()?.title);
    data.append(
      'brand_id',
      this.updateMobileForm.get('brand_id')?.value || this.mobile()?.brand?.id,
    );
    data.append(
      'model_number',
      this.updateMobileForm.get('model_number')?.value || this.mobile()?.model_number,
    );
    data.append(
      'description',
      this.updateMobileForm.get('description')?.value || this.mobile()?.description,
    );
    data.append('battery', this.updateMobileForm.get('battery')?.value || this.mobile()?.battery);
    data.append(
      'processor',
      this.updateMobileForm.get('processor')?.value || this.mobile()?.processor,
    );
    data.append('storage', this.updateMobileForm.get('storage')?.value || this.mobile()?.storage);
    data.append('display', this.updateMobileForm.get('display')?.value || this.mobile()?.display);
    data.append('price', this.updateMobileForm.get('price')?.value || this.mobile()?.price);
    data.append(
      'discount',
      this.updateMobileForm.get('discount')?.value || this.mobile()?.discount,
    );
    data.append(
      'operating_system',
      this.updateMobileForm.get('operating_system')?.value || this.mobile()?.operating_system,
    );
    data.append('camera', this.updateMobileForm.get('camera')?.value || this.mobile()?.camera);
    data.append(
      'network_support',
      this.updateMobileForm.get('network_support')?.value || this.mobile()?.network_support,
    );
    data.append(
      'release_year',
      this.updateMobileForm.get('release_year')?.value || this.mobile()?.release_year,
    );
    data.append('status', this.updateMobileForm.get('status')?.value || this.mobile()?.status);

    if (this.file()) {
      data.append('image_cover', this.file()!);
    }

    this.authSubscription?.unsubscribe();

    this.authSubscription = this.mobilesServices.updateMobile(this.mobileId, data).subscribe({
      next: (res) => {
        this.toastr.success('تم تعديل الموبايل بنجاح', 'نجحت');
        this.initializeForm();
        if (this.file()) {
          this.file.set(null);
        }
        this.router.navigate(['/dashboard/mobiles']);
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
