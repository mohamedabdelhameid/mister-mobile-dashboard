import {
  Component,
  ElementRef,
  inject,
  signal,
  ViewChild,
  viewChild,
  WritableSignal,
} from '@angular/core';
import { ColorsServices } from '../../../../../core/services/colorServices/colors.services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import { Subscription } from 'rxjs';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-color',
  imports: [NgClass, ReactiveFormsModule, RouterLink],
  templateUrl: './add-color.component.html',
  styleUrl: './add-color.component.css',
})
export class AddColorComponent {
  private readonly colorServices = inject(ColorsServices);
  private readonly fb = inject(FormBuilder);
  private readonly toastr = inject(ToastUtilService);
  addColorForm!: FormGroup;
  authSubscription?: Subscription;

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.addColorForm = this.fb.group({
      name: ['', Validators.required],
      hex_code: ['', Validators.required],
    });
  }

  addColor() {
    this.authSubscription?.unsubscribe();

    this.authSubscription = this.colorServices.addColor(this.addColorForm.value).subscribe({
      next: (res) => {
        this.toastr.success('تم إضافة اللون بنجاح', 'نجاح');
        this.addColorForm.reset();
      },
      error: (err) => {
        this.toastr.error('فشل إضافة اللون يرجى المحاولة لاحقا', 'فشل');
      },
    });
  }

  onSubmit() {
    if (this.addColorForm.invalid) {
      this.addColorForm.markAllAsTouched();
    } else {
      this.addColor();
    }
  }
}
