import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import moment from 'jalali-moment';
import { IMonthlyReportRequest, MonthlyReportRequest } from '../../models/IMonthlyReportRequest';
import { ReportHttpService } from '../../services/report-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { IMonthlyReportResponse } from '../../models/IMonthlyReportResponse';
import { IOption, Option } from '../../models/IOption';
import { Messages } from '../../../texts/messages';
import { UserProgressRequest } from '../../models/IUserProgressRequest';
import { IUserProgressResponse } from '../../models/IUserProgressResponse';

@Component({
  selector: 'hw-user-report',
  templateUrl: './user-report.component.html',
  styleUrl: './user-report.component.css'
})
export class UserReportComponent implements OnInit {
  Messages = Messages;
  firstMonthlyReportRequest: IMonthlyReportRequest = new MonthlyReportRequest();
  secondMonthlyReportRequest: IMonthlyReportRequest = new MonthlyReportRequest();
  firstSelectedReport: IMonthlyReportResponse | null = null;
  secondSelectedReport: IMonthlyReportResponse | null = null;
  showComparison: boolean = false;
  months: IOption[] = [];
  years: number[] = [1404];
  selectedDay: string = ''
  userProgressList: IUserProgressResponse[] = [];

  // chart configuration
  dailyUserData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  comparisonUserData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  lineChartType: ChartType = 'line';
  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        enabled: true,
        bodyAlign: 'right',
        titleAlign: 'right',
        padding: 12,
        callbacks: {
          title: (context) => {
            const dataLabel = context[0].label;
            const datasetLabel = context[0].dataset.label;
            return `${dataLabel} ${datasetLabel}`;
          },
          label: (context) => {
            const value = context.parsed.y;
            const persianValue = moment.locale('fa') ? value.toLocaleString('fa') : value.toString();
            return `${persianValue} ${Messages.Headers.user} `;
          }
        }
      }
    },
    scales: {
      y: { beginAtZero: true, title: { display: true, text: `${Messages.Headers.user}  (${Messages.Headers.person})` } },
      x: { title: { display: true, text: Messages.Labels.day } }
    },
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        const element = elements[0];
        const datasetIndex = element.datasetIndex;
        const dataIndex = element.index;

        // Determine which report to use based on datasetIndex
        const selectedReport = datasetIndex === 0 ? this.firstSelectedReport : this.secondSelectedReport;
        const request = datasetIndex === 0 ? this.firstMonthlyReportRequest : this.secondMonthlyReportRequest;

        if (selectedReport && request) {
          const day = selectedReport.dailyReports[dataIndex].day;
          const month = request.month;
          const year = request.year;

          // Create the date object for the request
          const datePayload = { day, month, year };

          // Send request to the database
          this.getSelectedPointDetails(datePayload);
        }
      }
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
      this.dailyUserData = this.buildDatasets();
      this.secondSelectedReport = null; // optional: clear second report
    }
  }

  updateFirstChart() {
    if (!this.firstMonthlyReportRequest) return;

    this.loadingService.show();
    this.reportHttpService.getUserCreatedByMonthAndYear(this.firstMonthlyReportRequest).subscribe({
      next: (response) => {
        this.firstSelectedReport = response;
        this.dailyUserData = this.buildDatasets();
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
    this.reportHttpService.getUserCreatedByMonthAndYear(this.secondMonthlyReportRequest).subscribe({
      next: (response) => {
        this.secondSelectedReport = response;
        this.dailyUserData = this.buildDatasets();
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

  private getSelectedPointDetails(datePayload: { day: number; month: number; year: number }) {
    this.selectedDay = datePayload.year + '/' + datePayload.month + '/' + datePayload.day;
    const request = new UserProgressRequest();
    request.ids = this.firstSelectedReport?.dailyReports.filter(i => i.day == datePayload.day)[0].ids ?? [];
    this.loadingService.show();
    this.reportHttpService.getUsersProgressByIds(request).subscribe({
      next: (response) => {
        this.loadingService.hide();
        this.userProgressList = response;
      },
      error: (error) => {
        this.loadingService.hide();
      }
    });
  }
}
