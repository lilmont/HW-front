import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import moment from 'jalali-moment';
import { IMonthlyReportRequest, MonthlyReportRequest } from '../../models/IMonthlyReportRequest';
import { ReportHttpService } from '../../services/report-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { IMonthlyReportResponse } from '../../models/IMonthlyReportResponse';
import { IOption, Option } from '../../models/IOption';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-income-report',
  templateUrl: './income-report.component.html',
  styleUrl: './income-report.component.css'
})
export class IncomeReportComponent implements OnInit {
  Messages = Messages;
  firstMonthlyReportRequest: IMonthlyReportRequest = new MonthlyReportRequest();
  secondMonthlyReportRequest: IMonthlyReportRequest = new MonthlyReportRequest();
  firstSelectedReport: IMonthlyReportResponse | null = null;
  secondSelectedReport: IMonthlyReportResponse | null = null;
  showComparison: boolean = false;
  months: IOption[] = [];
  years: number[] = [1404];

  // chart configuration
  dailyIncomeData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  comparisonIncomeData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  lineChartType: ChartType = 'line';
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const value = context.parsed.y;
            const persianValue = moment.locale('fa') ? value.toLocaleString('fa') : value.toString();
            return `${context.dataset.label}: ${persianValue} ${Messages.Headers.toman}`;
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: `${Messages.Labels.income}  (${Messages.Headers.toman})` } },
      x: { title: { display: true, text: Messages.Labels.day } }
    }
  };


  constructor(private reportHttpService: ReportHttpService,
    private loadingService: LoadingService
  ) { }

  ngOnInit() {
    moment.locale('fa');
    for (let m = 1; m <= 12; m++) {
      const shamsiYear = 1404;
      const option = new Option();
      option.title = moment(`${shamsiYear}-${m}-1`, 'jYYYY-jM-jD').format('jMMMM');
      option.id = m;
      this.months.push(option);
    }
    this.updateFirstChart();
  }

  toggleComparison() {
    this.showComparison = !this.showComparison;

    if (!this.showComparison) {
      this.dailyIncomeData = this.buildDatasets();
      this.secondSelectedReport = null; // optional: clear second report
    }
  }

  updateFirstChart() {
    if (!this.firstMonthlyReportRequest) return;

    this.loadingService.show();
    this.reportHttpService.getIncomeByMonthAndYear(this.firstMonthlyReportRequest).subscribe({
      next: (response) => {
        this.firstSelectedReport = response;
        this.dailyIncomeData = this.buildDatasets();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  updateSecondChart() {
    if (!this.showComparison) return;

    this.loadingService.show();
    this.reportHttpService.getIncomeByMonthAndYear(this.secondMonthlyReportRequest).subscribe({
      next: (response) => {
        this.secondSelectedReport = response;
        this.dailyIncomeData = this.buildDatasets();
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });

  }

  private buildDatasets(): ChartConfiguration['data'] {
    const datasets: any[] = [];

    if (this.firstSelectedReport) {
      datasets.push({
        label: this.firstSelectedReport.monthName,
        data: this.firstSelectedReport.dailyReports.map(dr => dr.data),
        borderColor: '#4751C2',
        backgroundColor: 'rgba(122, 101, 229, 0.1)',
        fill: true,
        tension: 0.4
      });
    }

    if (this.showComparison && this.secondSelectedReport) {
      datasets.push({
        label: this.secondSelectedReport.monthName,
        data: this.secondSelectedReport.dailyReports.map(dr => dr.data),
        borderColor: '#FFC008',
        backgroundColor: 'rgba(236, 220, 142, 0.1)',
        fill: true,
        tension: 0.4
      });
    }

    return {
      labels: this.firstSelectedReport
        ? this.firstSelectedReport.dailyReports.map(dr => dr.day.toLocaleString('fa'))
        : [],
      datasets
    };
  }
}
