import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About implements OnInit, OnDestroy {
  private observer!: IntersectionObserver;

  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const imageElement = this.elementRef.nativeElement.querySelector('.about-image');
            if (imageElement) {
              imageElement.classList.add('animate');
            }
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: '-50px 0px'
      }
    );

    const aboutSection = this.elementRef.nativeElement.querySelector('.about-section');
    if (aboutSection) {
      this.observer.observe(aboutSection);
    }
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
