import { Component, inject, signal, WritableSignal } from '@angular/core';
import { StaticServices } from '../../../../../core/services/staticsServices/static.services';
import { Data } from '../../../../../core/interfaces/staticsInterfaces/istatic.interfaces';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import { RouterLink } from '@angular/router';
import { ChartsComponent } from '../charts/charts.component';

@Component({
  selector: 'app-statics',
  imports: [RouterLink, ChartsComponent],
  templateUrl: './statics.component.html',
  styleUrl: './statics.component.css',
})
export class StaticsComponent {
  private staticService = inject(StaticServices);
  private toastr = inject(ToastUtilService);
  stats: WritableSignal<Data | null> = signal(null);

  ngOnInit(): void {
    this.getStatistics();
  }

  getStatistics(): void {
    this.staticService.getStatistics().subscribe({
      next: (res) => {
        this.stats.set(res.data);
      },
      error: (err) => {
        this.toastr.error('فشل جلب احصائيات الموقع', 'فشل');
      },
    });
  }
}
