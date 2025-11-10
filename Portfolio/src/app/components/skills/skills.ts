import { Component } from '@angular/core';

/**
 * Skills section component.
 *
 * Displays the developer's technical skills and technologies with icons.
 * Includes a call-to-action button to scroll to the contact section.
 */
@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {

  /**
   * Smoothly scrolls the page to the contact section.
   *
   * Uses the native scrollIntoView API with smooth behavior for
   * a better user experience when navigating to the contact form.
   *
   * @returns void
   *
   * @remarks
   * This method is typically called when the user clicks a "Get in touch" or
   * "Contact me" button. If the contact section element is not found,
   * the method exits silently without scrolling.
   */
  scrollToContact() {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
