import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ColorsServices } from '../../../../core/services/colorServices/colors.services';
import { IColor } from '../../../../core/interfaces/colorInterfaces/icolor.interfaces';
import { ToastUtilService } from '../../../../core/services/toastrServices/toastr.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-colors',
  imports: [],
  templateUrl: './colors.component.html',
  styleUrl: './colors.component.css',
})
export class ColorsComponent {
  private readonly colorsServices = inject(ColorsServices);
  private readonly toastr = inject(ToastUtilService);
  readonly router = inject(Router);
  colors: WritableSignal<IColor[]> = signal([]);

  ngOnInit() {
    this.getAllColors();
  }

  getAllColors(): void {
    this.colorsServices.getAllColors().subscribe({
      next: (res) => {
        this.colors.set(res.data);
      },
      error: (err) => {
        this.toastr.error('فشل جلب الألوان', 'فشل');
      },
    });
  }

  deleteColor(id: string): void {
    this.colorsServices.deleteColor(id).subscribe({
      next: (res) => {
        this.toastr.success('تم حذف اللون بنجاح', 'نجاح');
        this.getAllColors();
      },
      error: (err) => {
        this.toastr.error('فشل حذف اللون', 'فشل');
      },
    });
  }
}
