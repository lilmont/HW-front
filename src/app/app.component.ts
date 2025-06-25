import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite'
import { filter, map, mergeMap } from 'rxjs';

@Component({
  selector: 'hw-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title) { }
  ngOnInit(): void {
    initFlowbite();
    this.setStaticPageTitles();
  }

  setStaticPageTitles() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let route = this.activatedRoute;
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        mergeMap(route => route.data)
      )
      .subscribe(data => {
        if (data['title']) {
          this.titleService.setTitle(data['title']);
        }
        // Otherwise, dynamic title is handled inside the component itself
      });
  }
}
