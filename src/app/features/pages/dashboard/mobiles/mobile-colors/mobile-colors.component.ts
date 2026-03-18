import { Component, inject, signal, WritableSignal } from '@angular/core';
import { MobilesServices } from '../../../../../core/services/mobilesServices/mobiles.services';
import { IMobile } from '../../../../../core/interfaces/mobilesInterfaces/imobile.interfaces';
import { IColor } from '../../../../../core/interfaces/colorInterfaces/icolor.interfaces';
import { ColorsServices } from '../../../../../core/services/colorServices/colors.services';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mobile-colors',
  imports: [],
  templateUrl: './mobile-colors.component.html',
  styleUrl: './mobile-colors.component.css',
})
export class MobileColorsComponent {
  private mobilesServices = inject(MobilesServices);
  private colorsServices = inject(ColorsServices);
  private toastr = inject(ToastUtilService);
  readonly router = inject(Router);
  mobiles: WritableSignal<IMobile[]> = signal([]);
  colors: WritableSignal<IColor[]> = signal([]);

  ngOnInit() {
    this.getAllMobiles();
  }

  getAllMobiles(): void {
    this.mobilesServices.getAllMobiles().subscribe({
      next: (res) => {
        this.mobiles.set(res.data);
        this.getAllColor();
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

  deleteMobileColorAndStock(id: string): void {
    this.mobilesServices.deleteMobileColorAndStock(id).subscribe({
      next: (res) => {
        this.toastr.success('تم حذف اللون بنجاح', 'نجحت');
        this.getAllMobiles();
      },
      error: (err) => {
        this.toastr.error('فشل حذف اللون', 'فشل');
      },
    });
  }
}
