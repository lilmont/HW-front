import { Component } from '@angular/core';

@Component({
  selector: 'hw-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
  title = 'hardworker-front';
  testimonials = [
    { name: 'نرگس سادات فاطمی', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', text: 'آموزش و تدریس واقعا عالی است و صدالبته پشتیبانی قوی ،ممنون آقای مزروعی' },
    { name: 'علی رهنمائیان', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', text: 'آموزش ها خوبه وکامل توضیح دادن اما مهمتر این هست که پشتیبانی قوی هست وسوالات شمارو جواب میدن' },
    { name: 'علیرضا افخمی', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', text: ' باسلام مهمترین اصل در دوره های آموزشی پروژه محور بودن انهاست که در این دوره به خوبی با پروژه هایی که در طول جلسات انجام میشود میتوان به درک درستی از برنامه نویسی رسید.  با تشکر' }
  ];
}
