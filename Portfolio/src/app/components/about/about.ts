import { Component } from '@angular/core';

/**
 * About Me section component.
 *
 * Displays information about the developer including bio, skills, and photo.
 * Includes hover effects for visual interactivity.
 */
@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {

  /**
   * Handles mouse hover event on images to apply visual effects.
   *
   * Adds a 'hovered' CSS class to the target element to trigger
   * hover animations or styling changes.
   *
   * @param event - The mouse event from hovering over an image element
   * @returns void
   *
   * @remarks
   * Uses currentTarget to ensure the class is added to the element with
   * the event listener, not the element directly under the mouse cursor.
   */
  onImageHover(event: MouseEvent) {
    (event.currentTarget as HTMLElement).classList.add('hovered');
  }
}
