import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { ProjectsListComponent } from './projects-list/projects-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    TestimonialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
