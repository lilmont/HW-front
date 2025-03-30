import { Component, ElementRef, Input, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'hw-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.css'
})
export class CardCarouselComponent {
  @Input() cards: { name: string; avatar: string; text: string }[] = [];
  @Input() title: string = '';

  @ViewChild('carousel') carousel!: ElementRef;
  index = 0;
  autoSlideInterval: any;

  constructor(private renderer: Renderer2) { }

  ngAfterViewInit() {
    this.startAutoSlide();
  }

  next() {
    if (this.index < this.cards.length - 1) {
      this.index++;
    } else {
      this.index = 0; // Loop back to first
    }
    this.updateCarousel();
  }

  prev() {
    if (this.index > 0) {
      this.index--;
    } else {
      this.index = this.cards.length - 1; // Loop to last
    }
    this.updateCarousel();
  }

  updateCarousel() {
    const translateValue = `translateX(${this.index * -65}%)`;
    this.renderer.setStyle(this.carousel.nativeElement, 'transform', translateValue);
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.next();
    }, 3000); // Adjust interval as needed (3000ms = 3 seconds)
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }
}
