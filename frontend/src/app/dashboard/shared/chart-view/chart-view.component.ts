import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js/auto';
import { LaundryService } from '../../laundry.service';

@Component({
  selector: 'app-chart-view',
  templateUrl: './chart-view.component.html',
  styleUrls: ['./chart-view.component.scss']
})
export class ChartViewComponent {
  title = 'ng2-charts-demo';

  requestedOrderCount = 0;
  acceptedOrderCount = 0;
  deliveredOrderCount = 0;
  rejectedOrderCount = 0;

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData!: ChartConfiguration<'bar'>['data'];

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
  };

  constructor(private laundryservice: LaundryService) {}

  ngOnInit(): void {
    this.laundryservice.getLaundryEntries().subscribe(items => {

      /**
   * Fetches laundry entries from the service and updates the chart data.
   */
      this.requestedOrderCount = items.filter(item => item.status === 'requested').length;
      this.acceptedOrderCount = items.filter(item => item.status === 'processing').length;
      this.deliveredOrderCount = items.filter(item => item.status === 'delivered').length;
      this.rejectedOrderCount = items.filter(item => item.status === 'rejected').length;

      this.barChartData = {
        labels: ['Requested', 'Processing', 'Delivered', 'Rejected'],
        datasets: [{ data: [this.requestedOrderCount, this.acceptedOrderCount, this.deliveredOrderCount, this.rejectedOrderCount], label: 'Numbers' }],
      };
    });
  }
}
