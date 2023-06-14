import { Component,ViewChild, OnInit } from '@angular/core';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent;

  public chartOptions!: Partial<ChartOptions> | any;

  constructor() { 
    this.chartOptions = {
      // series: [44, 55, 13, 43, 22],
      // series: [0, 5, 0, 5, 0],
      series: [5, 5],
      colors : ['#15cf27','#ff2f2f'],
      chart: {
        width: 480,
        type: "pie",
      },
      labels: ["Güvende olan","Güvende olmayan"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 300
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }

  ngOnInit(): void {
  }

}
