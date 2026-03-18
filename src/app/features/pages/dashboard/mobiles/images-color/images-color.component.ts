import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MobilesServices } from '../../../../../core/services/mobilesServices/mobiles.services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';

@Component({
  selector: 'app-images-color',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './images-color.component.html',
  styleUrl: './images-color.component.css',
})
export class ImagesColorComponent {
  private mobilesServices = inject(MobilesServices);
  colorId!: string;
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly toastr = inject(ToastUtilService);
  addImageToMobileColorForm!: FormGroup;
  private readonly fb = inject(FormBuilder);
  file: WritableSignal<File[] | null> = signal(null);
  authSubscription!: Subscription;
  imageUrls: string[] = [];

  ngOnInit(): void {
    this.getColorId();
  }

  getColorId() {
    this.route.params.subscribe((params) => {
      this.colorId = params['id'];
      this.initializeForm();
    });
  }

  selectImages(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const filesArray = Array.from(target.files);
      this.file.set(filesArray);

      this.imageUrls = filesArray.map((f) => URL.createObjectURL(f));
    }
  }

  initializeForm() {
    this.addImageToMobileColorForm = this.fb.group({
      mobile_color_variant_id: [this.colorId, [Validators.required]],
    });
  }

  addImageToMobileColor(): void {
    const data = new FormData();
    data.append('mobile_color_variant_id', this.colorId);
    this.file()?.forEach((file) => data.append('images[]', file));

    this.authSubscription?.unsubscribe();
    this.authSubscription = this.mobilesServices.addImagesColorMobile(data).subscribe({
      next: (res) => {
        this.toastr.success('تمت إضافة الصور بنجاح', 'نجحت');
        this.router.navigate(['/dashboard/mobiles/colors']);
      },
      error: (err) => {
        this.toastr.error('فشلت العملية', 'فشل');
      },
    });
  }

  getObjectUrl(file: File): string {
    return URL.createObjectURL(file);
  }

  getTotalSize(): string {
    const total = this.file()?.reduce((sum, f) => sum + f.size, 0) ?? 0;
    return (total / 1024 / 1024).toFixed(2) + ' MB';
  }

  onSubmit() {
    if (this.addImageToMobileColorForm.invalid || !this.file()) {
      this.addImageToMobileColorForm.markAllAsTouched();
    } else {
      this.addImageToMobileColor();
    }
  }
}
