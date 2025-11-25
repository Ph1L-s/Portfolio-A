import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reviews',
  imports: [TranslateModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss'
})
export class Reviews implements OnInit, OnDestroy {
  private translate = inject(TranslateService);
  private langChangeSubscription?: Subscription;

  currentIndex = 0;
  testimonials: Array<{ text: string; author: string; role: string }> = [];
  isTransitioning = false;

  ngOnInit() {
    this.loadTestimonials();
    this.langChangeSubscription = this.translate.onLangChange.subscribe(() => {
      this.loadTestimonials();
    });
  }

  ngOnDestroy() {
    this.langChangeSubscription?.unsubscribe();
  }

  private loadTestimonials() {
    this.translate.get('reviews.testimonials').subscribe((testimonials: any[]) => {
      if (testimonials && Array.isArray(testimonials)) {
        this.testimonials = testimonials;
        this.currentIndex = 0;
      }
    });
  }

  get prevIndex(): number {
    return (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
  }

  get nextIndex(): number {
    return (this.currentIndex + 1) % this.testimonials.length;
  }

  get currentTestimonial() {
    return this.testimonials[this.currentIndex];
  }

  get prevTestimonial() {
    return this.testimonials[this.prevIndex];
  }

  get nextTestimonial() {
    return this.testimonials[this.nextIndex];
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = this.nextIndex;
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  previousSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex = this.prevIndex;
    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }
}
