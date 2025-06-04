import { Component, OnInit } from '@angular/core';
import { Messages } from '../../../texts/messages';
import { CourseHttpService } from '../../../core/services/course-http.service';
import { ICourseCardInfo } from '../../../models/ICourseCardInfo';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent implements OnInit {
  title = 'hardworker-front';
  Messages = Messages;
  testimonials = [
    { name: 'نرگس سادات فاطمی', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', text: 'آموزش و تدریس واقعا عالی است و صدالبته پشتیبانی قوی ،ممنون آقای مزروعی' },
    { name: 'علی رهنمائیان', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', text: 'آموزش ها خوبه وکامل توضیح دادن اما مهمتر این هست که پشتیبانی قوی هست وسوالات شمارو جواب میدن' },
    { name: 'علیرضا افخمی', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', text: ' باسلام مهمترین اصل در دوره های آموزشی پروژه محور بودن انهاست که در این دوره به خوبی با پروژه هایی که در طول جلسات انجام میشود میتوان به درک درستی از برنامه نویسی رسید.  با تشکر' }
  ];
  courses: ICourseCardInfo[] = [];

  constructor(private courseHttpService: CourseHttpService,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.courseHttpService.getAllCourses().subscribe({
      next: (response) => {
        this.courses = response;
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }
}
