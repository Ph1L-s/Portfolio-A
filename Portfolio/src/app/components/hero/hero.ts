import { Component, ViewEncapsulation } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-hero',
  imports: [NgFor],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  encapsulation: ViewEncapsulation.None
})
export class Hero {
  // Marquee info items - defined once, duplicated in template
  infoItems = [
    'Available for remote work',
    'Frontend Developer',
    'Based in Germany',
    'Open to new opportunities'
  ];
}
