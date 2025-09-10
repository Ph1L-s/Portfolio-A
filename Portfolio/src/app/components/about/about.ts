import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  onImageHover(event: MouseEvent) {
    (event.currentTarget as HTMLElement).classList.add('hovered');
  }
}
