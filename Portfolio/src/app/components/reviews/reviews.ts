import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss'
})
export class Reviews {
  currentIndex = 0;
  
  originalTestimonials = [
    {
      text: "Working with Phillip in a group project that involved a lot of technical challenges was fantastic. He stayed calm, cool, and focused, and made our team a success. He's super collaborative and positive, and I'd happily work with him again.",
      author: "A. Fischer - Team Partner"
    },
    {
      text: "Our project benefited enormously from Phillip's efficient way of working.",
      author: "T.Schulz - Frontend Developer"
    },
    {
      text: "Phillip has proven to be a reliable group partner, his technical skills and proactive approach were crucial to the success of our project.",
      author: "H.Janisch - Team Partner"
    }
  ];

  testimonials: any[] = [];
  isTransitioning = false;

  constructor() {
    // Triple array for smooth infinite scrolling
    this.testimonials = [
      ...this.originalTestimonials,
      ...this.originalTestimonials,
      ...this.originalTestimonials
    ];
    this.currentIndex = this.originalTestimonials.length;
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex++;

    if (this.currentIndex >= (2 * this.originalTestimonials.length)) {
      setTimeout(() => {
        this.isTransitioning = false;
        this.currentIndex = this.originalTestimonials.length;
      }, 500);
    } else {
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    }
  }

  previousSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    this.currentIndex--;

    if (this.currentIndex < this.originalTestimonials.length) {
      setTimeout(() => {
        this.isTransitioning = false;
        this.currentIndex = (2 * this.originalTestimonials.length) - 1;
      }, 500);
    } else {
      setTimeout(() => {
        this.isTransitioning = false;
      }, 500);
    }
  }

  getTransform(): string {
    const centerOffset = 50;
    return `translateX(calc(${centerOffset}% - ${this.currentIndex * 50}%))`;
  }

  getCurrentTestimonial() {
    return this.testimonials[this.currentIndex];
  }

  getPrevTestimonial() {
    const prevIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    return this.testimonials[prevIndex];
  }

  getNextTestimonial() {
    const nextIndex = (this.currentIndex + 1) % this.testimonials.length;
    return this.testimonials[nextIndex];
  }
}
