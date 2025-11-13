import { Component, ViewEncapsulation, inject, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  imports: [TranslateModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  encapsulation: ViewEncapsulation.None
})
export class Hero implements OnInit {
  private translate = inject(TranslateService);

  // Marquee info items - defined once, duplicated in template
  infoItems: string[] = [];

  ngOnInit() {
    // Initialize with translated values
    this.updateInfoItems();

    // Update when language changes
    this.translate.onLangChange.subscribe(() => {
      this.updateInfoItems();
    });
  }

  private updateInfoItems() {
    this.infoItems = [
      this.translate.instant('banner.remote'),
      this.translate.instant('banner.frontend'),
      this.translate.instant('banner.basedIn'),
      this.translate.instant('banner.openToWork')
    ];
  }
}
