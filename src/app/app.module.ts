import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ProjectsModule } from './projects/projects.module';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { registerLocaleData } from '@angular/common';
import localeFa from '@angular/common/locales/fa';
import { CoursesModule } from './courses/courses.module';


registerLocaleData(localeFa);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    TestimonialsModule,
    ProjectsModule,
    CoreModule,
    AuthModule,
    BrowserAnimationsModule,
    CoursesModule,
    ToastrModule.forRoot({
      toastClass: 'ngx-toastr toast-enter',
      positionClass: 'toast-bottom-right',
      timeOut: 5000,
      closeButton: false,
      enableHtml: true,
      preventDuplicates: true
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID, useValue: 'fa-IR'
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
