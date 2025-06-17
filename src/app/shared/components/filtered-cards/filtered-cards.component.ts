import { Component, Input, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { ProjectHttpService } from '../../../core/services/project-http.service';
import { LoadingService } from '../../../core/services/loading.service';
import { IProjectCategory } from '../../../models/IProjectCategory';

@Component({
  selector: 'hw-filtered-cards',
  templateUrl: './filtered-cards.component.html',
  styleUrl: './filtered-cards.component.css'
})
export class FilteredCardsComponent implements OnInit {
  Messages = Messages;
  labels: IProjectCategory[] = [];
  cards = [
    { title: 'پروژه آرایشگاه مردانه شارپنر', description: 'پروژه آرایگاه مردانه شارپنر با امکان رزرو آنلاین نوبت به همراه ده ساعت برنامه نویسی اختصاصی', category: 'همه' },
    { title: 'پروژه طراحی و دکوراسیون داخلی ونوم', description: 'وبسایت طراحی و دکوراسیون داخلی به همراه پکیج 10 ساعت برنامه نویسی اختصاصی', category: 'متفرقه' },
    { title: 'سایت فروشگاهی یراق آلات', description: 'فروشگاه اینترنتی جذاب، پنل ادمین پیشرفته همراه با مدیریت اپراتورهای بخش‌های مختلف، متصل به پنل پیامکی، مدیریت خودکار خریدهای ناموفق، دارای بلاگ اختصاصی و...', category: 'رستوران' },
    { title: 'پروژه فست فود', description: 'پروژه تخصصی برای کلیه فست فودها. همراه با 10 ساعت برنامه نویسی اختصاصی بدون مدیریت محتوا', category: 'فروشگاهی' },
    { title: 'سایت شرکتی', description: 'سایت دو زبانه شرکتی همراه با کنترل پنل ادمین', category: 'ساختمان' },
    // Add more cards as needed
  ];

  filteredCards = [...this.cards]; // Initially, show all cards
  selectedLabelId: number = 0;

  constructor(private projectHttpService: ProjectHttpService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.loadingService.show();
    this.projectHttpService.getAllProjectCategories().subscribe({
      next: (data) => {
        this.labels = data;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  filterCards(labelId: number) {
    this.selectedLabelId = labelId;
    if (labelId === 0) {
      this.filteredCards = [...this.cards];
    } else {
      // this.filteredCards = this.cards.filter(card => card.category === label);
    }
  }
}
