import { Component, Input } from '@angular/core';
import { Messages } from '../../../texts/messages';

@Component({
  selector: 'hw-filtered-cards',
  templateUrl: './filtered-cards.component.html',
  styleUrl: './filtered-cards.component.css'
})
export class FilteredCardsComponent {
  Messages = Messages;
  labels = ['همه', 'متفرقه', 'رستوران', 'فروشگاهی', 'ساختمان', 'زیبایی', 'صنعت', 'شرکتی'];
  cards = [
    { title: 'پروژه آرایشگاه مردانه شارپنر', description: 'پروژه آرایگاه مردانه شارپنر با امکان رزرو آنلاین نوبت به همراه ده ساعت برنامه نویسی اختصاصی', category: 'همه' },
    { title: 'پروژه طراحی و دکوراسیون داخلی ونوم', description: 'وبسایت طراحی و دکوراسیون داخلی به همراه پکیج 10 ساعت برنامه نویسی اختصاصی', category: 'متفرقه' },
    { title: 'سایت فروشگاهی یراق آلات', description: 'فروشگاه اینترنتی جذاب، پنل ادمین پیشرفته همراه با مدیریت اپراتورهای بخش‌های مختلف، متصل به پنل پیامکی، مدیریت خودکار خریدهای ناموفق، دارای بلاگ اختصاصی و...', category: 'رستوران' },
    { title: 'پروژه فست فود', description: 'پروژه تخصصی برای کلیه فست فودها. همراه با 10 ساعت برنامه نویسی اختصاصی بدون مدیریت محتوا', category: 'فروشگاهی' },
    { title: 'سایت شرکتی', description: 'سایت دو زبانه شرکتی همراه با کنترل پنل ادمین', category: 'ساختمان' },
    // Add more cards as needed
  ];

  filteredCards = [...this.cards]; // Initially, show all cards
  selectedLabel: string = 'همه';

  filterCards(label: string) {
    this.selectedLabel = label;
    if (label === 'همه') {
      this.filteredCards = [...this.cards];
    } else {
      this.filteredCards = this.cards.filter(card => card.category === label);
    }
  }
}
