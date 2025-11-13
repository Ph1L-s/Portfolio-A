import { Component } from '@angular/core';
import { Nav } from '@components/nav/nav';

/**
 * Header component containing the site logo and navigation.
 *
 * Serves as the main header section displayed at the top of all pages.
 * Includes the portfolio logo/branding and the navigation component.
 *
 * @remarks
 * This is a container component that primarily composes the Nav component
 * for site-wide navigation functionality.
 */
@Component({
  selector: 'app-header',
  imports: [Nav],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
