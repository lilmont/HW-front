import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'hw-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent implements OnInit, OnDestroy {
  carouselImages: string[] = [
    "https://flowbite.com/docs/images/carousel/carousel-1.svg",
    "https://flowbite.com/docs/images/carousel/carousel-2.svg",
    "https://flowbite.com/docs/images/carousel/carousel-3.svg",
    "https://flowbite.com/docs/images/carousel/carousel-4.svg",
    "https://flowbite.com/docs/images/carousel/carousel-5.svg"
  ];

  currentIndex = 0;
  autoSlideInterval: any;

  ngOnInit(): void {
    this.startAutoSlide(); // Optional
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
