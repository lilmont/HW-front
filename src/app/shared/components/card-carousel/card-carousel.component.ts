import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { IUserCommentList } from '../../../models/IUserCommentList';

@Component({
  selector: 'hw-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrl: './card-carousel.component.css'
})
export class CardCarouselComponent implements AfterViewInit, OnDestroy {
  @Input() cards: IUserCommentList[] = [];

  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChildren('cardRef') cardElements!: QueryList<ElementRef>;

  isReady: boolean = false;
  translateX: string = 'translateX(0px)';
  index = 0;
  autoSlideInterval: any;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    this.calculateTranslateX(0);
    this.isReady = true;
    this.cdr.detectChanges(); // Now safe
    this.startAutoSlide();
  }

  next() {
    this.index = (this.index + 1) % this.cards.length;
    this.calculateTranslateX(this.index);
  }

  prev() {
    this.index = (this.index - 1 + this.cards.length) % this.cards.length;
    this.calculateTranslateX(this.index);
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

  private calculateTranslateX(index: number): void {
    if (!this.cardElements || !this.carousel) {
      this.translateX = 'translateX(0px)';
      return;
    }

    if (index == 0)
      this.translateX = 'translateX(0px)';
    else {
      let totalOffset = 0;
      for (let i = 0; i < index; i++) {
        const el = this.cardElements.get(i)?.nativeElement;
        if (el) {
          totalOffset += el.getBoundingClientRect().width;
        }
      }

      const containerWidth = this.carousel.nativeElement.offsetWidth;
      let allCardsWidth = 0;
      this.cardElements.forEach(elRef => {
        allCardsWidth += elRef.nativeElement.getBoundingClientRect().width;
      });

      const maxTranslate = allCardsWidth - containerWidth;
      const clamped = Math.min(totalOffset, maxTranslate);
      this.translateX = `translateX(${clamped}px)`; // For RTL
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }
}
