import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Privacy Policy page component.
 *
 * Displays data protection and privacy information
 * in compliance with GDPR requirements.
 */
@Component({
  selector: 'app-privacy',
  imports: [TranslateModule],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss'
})
export class Privacy {

}
