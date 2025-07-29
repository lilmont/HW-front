import { Component, OnDestroy, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { CommonHttpService } from '../../../core/services/common-http.service';
import { LoadingService } from '../../../core/services/loading.service';

@Component({
  selector: 'hw-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  baseUrl = environment.apiBaseUrl;
  carouselImages: string[] = [];

  constructor(private commonHttpService: CommonHttpService,
    private loadingService: LoadingService
  ) { }

  currentIndex = 0;
  autoSlideInterval: any;

  ngOnInit(): void {
    // this.startAutoSlide(); // Optional

    this.getCarouselImages();
  }

  getCarouselImages() {
    this.loadingService.show();
    this.commonHttpService.getCarouselImages().subscribe({
      next: (response) => {
        console.log(response)
        this.carouselImages = response.map(c => this.baseUrl + '/uploads/carousel/' + c);
        this.loadingService.hide();
      },
      error: () => {
        this.loadingService.hide();
      }
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.autoSlideInterval);
  }

  showPrevious(): void {
    this.currentIndex = (this.currentIndex - 1 + this.carouselImages.length) % this.carouselImages.length;
  }

  showNext(): void {
    this.currentIndex = (this.currentIndex + 1) % this.carouselImages.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => this.showNext(), 5000); // Every 5s
  }
}
