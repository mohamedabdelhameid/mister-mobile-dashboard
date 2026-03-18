import { Component, computed, inject, Input, signal, WritableSignal } from '@angular/core';
import { Data } from '@angular/router';
import { BaseChartDirective } from 'ng2-charts';
import { ToastUtilService } from '../../../../../core/services/toastrServices/toastr.services';
import { StaticServices } from '../../../../../core/services/staticsServices/static.services';

@Component({
  selector: 'app-charts',
  imports: [BaseChartDirective],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css',
})
export class ChartsComponent {
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
    });
  }

  mobilesBrandsChart = computed(() => ({
    labels: ['Mobiles', 'Brands'],
    datasets: [
      {
        data: [this.stats()?.['mobiles_count'] ?? 0, this.stats()?.['brands_count'] ?? 0],
        backgroundColor: ['#D4AF37', '#444441'],
        borderWidth: 0,
      },
    ],
  }));

  ordersUsersChart = computed(() => ({
    labels: ['Orders', 'Users'],
    datasets: [
      {
        data: [this.stats()?.['orders_count'] ?? 0, this.stats()?.['users_count'] ?? 0],
        backgroundColor: ['#D4AF37', '#444441'],
        borderWidth: 0,
      },
    ],
  }));

  donutOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    cutout: '70%',
  };
}
