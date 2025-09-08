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
import { IUserOverallProgressResponse } from '../../models/IUserOverallProgressResponse';
import { IUserMonthlyOverallProgressResponse } from '../../models/IUserMonthlyOverallProgressResponse';

@Component({
  selector: 'hw-user-overall-report',
  templateUrl: './user-overall-report.component.html',
  styleUrl: './user-overall-report.component.css'
})
export class UserOverallReportComponent implements OnInit {
  Messages = Messages;
  firstMonthlyReportRequest: IMonthlyReportRequest = new MonthlyReportRequest();
  secondMonthlyReportRequest: IMonthlyReportRequest = new MonthlyReportRequest();
  firstSelectedReport: IMonthlyReportResponse | null = null;
  secondSelectedReport: IMonthlyReportResponse | null = null;
  showComparison: boolean = false;
  months: IOption[] = [];
  years: number[] = [1404, 1405, 1406];
  firstSelectedDay: string = ''
  secondSelectedDay: string = ''
  firstUserOverallProgressList: IUserOverallProgressResponse[] = [];
  secondUserOverallProgressList: IUserOverallProgressResponse[] = [];
  firstUserOverallMonthlyReport: IUserMonthlyOverallProgressResponse | undefined = undefined;
  secondUserOverallMonthlyReport: IUserMonthlyOverallProgressResponse | undefined = undefined;

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
          this.getSelectedPointDetails(datePayload, datasetIndex);
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

    const now = moment(); // today
    const currentShamsiMonth = parseInt(now.format('jM'), 10);
    const currentShamsiYear = parseInt(now.format('jYYYY'), 10);

    this.firstMonthlyReportRequest = {
      month: currentShamsiMonth,
      year: currentShamsiYear
    };

    // (Optional) also initialize comparison request with same defaults
    this.secondMonthlyReportRequest = {
      month: currentShamsiMonth - 1,
      year: currentShamsiYear
    };

    this.updateFirstChart();
  }

  toggleComparison() {
    this.showComparison = !this.showComparison;

    if (!this.showComparison) {
      this.dailyUserData = this.buildDatasets();
      this.secondSelectedReport = null; // optional: clear second report
    }
    else
      this.updateSecondChart()
  }

  updateFirstChart() {
    if (!this.firstMonthlyReportRequest) return;

    this.loadingService.show();
    this.reportHttpService.getUserCreatedByMonthAndYear(this.firstMonthlyReportRequest).subscribe({
      next: (response) => {
        this.firstSelectedReport = response;
        this.dailyUserData = this.buildDatasets();
        this.getMonthlyOverallFirstChart(this.firstMonthlyReportRequest);
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  getMonthlyOverallFirstChart(firstMonthlyReportRequest: IMonthlyReportRequest) {
    this.reportHttpService.getUsersMonthlyOverallProgressByIds(firstMonthlyReportRequest).subscribe({
      next: (response) => {
        this.firstUserOverallMonthlyReport = response;
      },
      error: () => {
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
        this.getMonthlyOverallSecondChart(this.secondMonthlyReportRequest);
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  getMonthlyOverallSecondChart(secondMonthlyReportRequest: IMonthlyReportRequest) {
    this.reportHttpService.getUsersMonthlyOverallProgressByIds(secondMonthlyReportRequest).subscribe({
      next: (response) => {
        this.secondUserOverallMonthlyReport = response;
      },
      error: () => {
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

  private getSelectedPointDetails(datePayload: { day: number; month: number; year: number }, datasetIndex: number) {
    const request = new UserProgressRequest();
    if (datasetIndex == 0) {
      this.firstSelectedDay = datePayload.year + '/' + datePayload.month + '/' + datePayload.day;
      request.ids = this.firstSelectedReport?.dailyReports.filter(i => i.day == datePayload.day)[0].ids ?? [];
    }
    else if (datasetIndex == 1) {
      this.secondSelectedDay = datePayload.year + '/' + datePayload.month + '/' + datePayload.day;
      request.ids = this.secondSelectedReport?.dailyReports.filter(i => i.day == datePayload.day)[0].ids ?? [];
    }
    this.loadingService.show();
    this.reportHttpService.getUsersOverallProgressByIds(request).subscribe({
      next: (response) => {
        this.loadingService.hide();
        if (datasetIndex == 0)
          this.firstUserOverallProgressList = response;
        else if (datasetIndex == 1)
          this.secondUserOverallProgressList = response;
      },
      error: (error) => {
        this.loadingService.hide();
      }
    });
  }
}
