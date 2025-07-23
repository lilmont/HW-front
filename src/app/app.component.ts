import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { initFlowbite } from 'flowbite'
import { filter, map, mergeMap } from 'rxjs';
import { ReferralService } from './core/services/referral.service';

@Component({
  selector: 'hw-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private referralService: ReferralService) { }
  ngOnInit(): void {
    initFlowbite();
    this.setStaticPageTitles();

    const urlParams = new URLSearchParams(window.location.search);
    const ref = urlParams.get('ref');
    if (ref)
      this.referralService.setReferralFromUrl(ref);
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
