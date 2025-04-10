import { Component } from '@angular/core';

@Component({
  selector: 'hw-testimonials-grid',
  templateUrl: './testimonials-grid.component.html',
  styleUrl: './testimonials-grid.component.css'
})
export class TestimonialsGridComponent {
  testimonialsList: TestimonialModel[] = [
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "واقعا جز بهترین دوره های اموزشی با بیان تمام جزئیات کاربردی وپشتیبانی عالی تشکر بابت همه زحماتتون"
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "من هیچ پیش زمینه ای تو برنامه نویسی نداشتم و از سطح مبتدی شروع کردم کلاس هارو دارم میبینم، هنوز تمومشون نکردم ولی تا اینجا که دیدم هم توضیحات کامل و گویا هستش هم پشتیبانی بخوبی انجام میشه، بیصبرانه منتظر اتمام کلاس های دوره و شروع کار بعنوان برنامه نویس هستم."
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "اموزش های کاربردی و مفید رسیدگی دقیق ,خیییلی ممنون"
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "سلام آموزش ها واقعا خوب و واضح هستن و همچنین خیلی خوب پشتیبانی میشه خدا رو شکر من هر موقع سوال داشتم در کمتر از 2 ساعت با پشتیبانی خوب شما مشکلم رفع شد. حتی در بعضی مواقع جناب مزروعی لطف کردن با anydesk مشکلم رو بر طرف کردند. من پیشنهادم اینه که بعد از اتمام هر جلسه چندتا تمرین css یا javascript در رابطه همون پرژوه بگید که دوستان خودشون تلاش کنن فقط به این اموزش ها اکتفا نکنند. ان شالله که زودتر تموم بشه شروع به کار کنیم . به دوستانی که قصد دارند آموزش برنامه نویسی و طراحی وب سایت رو شروع کنن به شدت توصیه میکنم که در این آموزش ها شرکت کنند. واقعا دسستون درد نکنه جناب آقای مزروعی"
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "آموزش ها خوبه وکامل توضیح دادن اما مهمتر این هست که پشتیبانی قوی هست وسوالات شمارو جواب میدن"
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "آموزش ها بسیار خوب و روان داده شده و صرفا به خود آموزش ها اکتفا نشده و منابع آموزشی دیگر هم معرفی شده. پشتیبانی بسیار خوب است و به سرعت و دقت به تمام سوالات پاسخ داده شده. نکته مهم دیگر در آموزش ها این است که پروژه محور و کاملا بصورت تعامل با استاد هستند که ارزش آن ها را دوچندان می کند. صد در صد پیشنهاد میکنم."
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "اموزش های کاربردی و مفید رسیدگی دقیق ,خیییلی ممنون"
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "من هیچ پیش زمینه ای تو برنامه نویسی نداشتم و از سطح مبتدی شروع کردم کلاس هارو دارم میبینم، هنوز تمومشون نکردم ولی تا اینجا که دیدم هم توضیحات کامل و گویا هستش هم پشتیبانی بخوبی انجام میشه، بیصبرانه منتظر اتمام کلاس های دوره و شروع کار بعنوان برنامه نویس هستم."
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "سلام آموزش ها واقعا خوب و واضح هستن و همچنین خیلی خوب پشتیبانی میشه خدا رو شکر من هر موقع سوال داشتم در کمتر از 2 ساعت با پشتیبانی خوب شما مشکلم رفع شد. حتی در بعضی مواقع جناب مزروعی لطف کردن با anydesk مشکلم رو بر طرف کردند. من پیشنهادم اینه که بعد از اتمام هر جلسه چندتا تمرین css یا javascript در رابطه همون پرژوه بگید که دوستان خودشون تلاش کنن فقط به این اموزش ها اکتفا نکنند. ان شالله که زودتر تموم بشه شروع به کار کنیم . به دوستانی که قصد دارند آموزش برنامه نویسی و طراحی وب سایت رو شروع کنن به شدت توصیه میکنم که در این آموزش ها شرکت کنند. واقعا دسستون درد نکنه جناب آقای مزروعی"
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "آموزش ها خوبه وکامل توضیح دادن اما مهمتر این هست که پشتیبانی قوی هست وسوالات شمارو جواب میدن"
    },
    {
      Image: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
      FullName: "پریا ذوقی",
      Text: "آموزش ها بسیار خوب و روان داده شده و صرفا به خود آموزش ها اکتفا نشده و منابع آموزشی دیگر هم معرفی شده. پشتیبانی بسیار خوب است و به سرعت و دقت به تمام سوالات پاسخ داده شده. نکته مهم دیگر در آموزش ها این است که پروژه محور و کاملا بصورت تعامل با استاد هستند که ارزش آن ها را دوچندان می کند. صد در صد پیشنهاد میکنم."
    }
  ];

  chunk(arr: TestimonialModel[], chunkSize: number): TestimonialModel[][] {
    const chunks: TestimonialModel[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      chunks.push(arr.slice(i, i + chunkSize));
    }
    return chunks;
  }
}

class TestimonialModel {
  Image: string;
  FullName: string;
  Text: string;
  constructor(image: string, fullName: string, text: string) {
    this.Image = image;
    this.FullName = fullName;
    this.Text = text;
  }
}
