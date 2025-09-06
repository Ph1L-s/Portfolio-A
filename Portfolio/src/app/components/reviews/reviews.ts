import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  imports: [],
  templateUrl: './reviews.html',
  styleUrl: './reviews.scss'
})
export class Reviews {
  currentSlide = 0;
  
  testimonials = [
    {
      text: "Working with Lukas in a group project that involved a lot of technical challenges was fantastic. He stayed calm, cool, and focused, and made our team a success. He's super collaborative and positive, and I'd happily work with him again.",
      author: "A. Fischer - Team Partner"
    },
    {
      text: "Our project benefited enormously from Simon efficient way of working.",
      author: "T.Schulz - Frontend Developer"
    },
    {
      text: "Lukas has proven to be a reliable group partner, his technical skills and proactive approach were crucial to the success of our project.",
      author: "Frontend Developer"
    }
  ];

  isTransitioning = false;
  translateX = 0;

  getPrevTestimonial() {
    const total = this.testimonials.length;
    const prevIndex = (this.currentSlide - 1 + total) % total;
    return this.testimonials[prevIndex];
  }

  getCurrentTestimonial() {
    return this.testimonials[this.currentSlide];
  }

  getNextTestimonial() {
    const total = this.testimonials.length;
    const nextIndex = (this.currentSlide + 1) % total;
    return this.testimonials[nextIndex];
  }

  nextSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    this.currentSlide = (this.currentSlide + 1) % this.testimonials.length;
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }

  previousSlide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;
    
    this.currentSlide = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
    
    setTimeout(() => {
      this.isTransitioning = false;
    }, 600);
  }
}
