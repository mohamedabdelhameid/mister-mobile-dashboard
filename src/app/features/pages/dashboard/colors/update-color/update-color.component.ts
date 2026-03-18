import { Component, effect, inject, signal, WritableSignal } from '@angular/core';
import { ColorsServices } from '../../../../../core/services/colorServices/colors.services';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IColor } from '../../../../../core/interfaces/colorInterfaces/icolor.interfaces';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-update-color',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './update-color.component.html',
  styleUrl: './update-color.component.css',
})
export class UpdateColorComponent {
  private readonly fb = inject(FormBuilder);
  private readonly colorsServices = inject(ColorsServices);
  private readonly toastr = inject(ToastUtilService);
  private readonly router = inject(Router);
  updateColorForm!: FormGroup;
  authSubscription!: Subscription;
  color: WritableSignal<IColor | undefined> = signal(undefined);
  colors: WritableSignal<IColor[]> = signal([]);
  private readonly route = inject(ActivatedRoute);
  colorId!: string;

  constructor() {
    effect(() => {
      const c = this.color();

      if (c) {
        this.updateColorForm.patchValue({
          name: c.name,
          hex_code: c.hex_code,
        });
      }
    });
  }

  ngOnInit(): void {
    this.initializeForm();
    this.getColorId();
  }

  getColorId() {
    this.route.params.subscribe((params) => {
      this.colorId = params['id'];
      this.getAllColors();
    });
  }

  initializeForm() {
    this.updateColorForm = this.fb.group({
      name: ['', [Validators.required]],
      hex_code: ['', [Validators.required]],
    });
  }

  getAllColors(): void {
    this.colorsServices.getAllColors().subscribe({
      next: (res) => {
        this.colors.set(res.data);
        this.getColorData();
      },
    });
  }

  getColorData() {
    const foundColor = this.colors().find((color) => color.id === this.colorId);

    if (foundColor) {
      this.color.set(foundColor);
    } else {
      this.toastr.error('فشل جلب اللون يرجى التأكد من اللون المختار', 'فشل');
      this.router.navigate(['/dashboard/colors']);
    }
  }

  updateColor() {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.colorsServices
      .updateColor(this.colorId, this.updateColorForm.value)
      .subscribe({
        next: (res) => {
          this.toastr.success('تم تعديل اللون بنجاح', 'نجحت');
          this.initializeForm();
          this.router.navigate(['/dashboard/colors']);
        },
        error: (err) => {
          this.toastr.error('فشلت تعديل اللون', 'فشل');
        },
      });
  }

  onSubmit() {
    if (this.updateColorForm.invalid) {
      this.updateColorForm.markAllAsTouched();
    } else {
      this.updateColor();
    }
  }
}
