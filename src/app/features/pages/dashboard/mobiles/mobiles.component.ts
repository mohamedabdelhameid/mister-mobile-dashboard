import { Component, computed, inject, signal, WritableSignal } from '@angular/core';
import { MobilesServices } from '../../../../core/services/mobilesServices/mobiles.services';
import { Router } from '@angular/router';
import { ToastUtilService } from '../../../../core/services/toastrServices/toastr.services';
import { IMobile } from '../../../../core/interfaces/mobilesInterfaces/imobile.interfaces';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mobiles',
  imports: [NgClass],
  templateUrl: './mobiles.component.html',
  styleUrl: './mobiles.component.css',
})
export class MobilesComponent {
  private readonly mobilesServices = inject(MobilesServices);
  private readonly toastr = inject(ToastUtilService);
  readonly router = inject(Router);
  mobiles: WritableSignal<IMobile[]> = signal([]);
  searchQuery = signal('');

  ngOnInit(): void {
    this.getAllMobiles();
  }

  filteredMobiles = computed(() => {
    const q = this.searchQuery().trim().toLowerCase();
    if (!q) return this.mobiles();
    return this.mobiles().filter(
      (m) => m.title.toLowerCase().includes(q) || m.brand.name.toLowerCase().includes(q),
    );
  });

  getAllMobiles(): void {
    this.mobilesServices.getAllMobiles().subscribe({
      next: (res) => {
        this.mobiles.set(res.data);
      },
      error: (err) => {
        this.toastr.error('فشلت عملية جلب الموبايلات', 'فشل');
      },
    });
  }

  deleteMobile(id: string): void {
    this.mobilesServices.deleteMobile(id).subscribe({
      next: (res) => {
        this.getAllMobiles();
        this.toastr.success('تم حذف الموبايل بنجاح', 'نجحت');
      },
      error: (err) => {
        this.toastr.error('فشلت عملية حذف الموبايل', 'فشل');
      },
    });
  }
}
