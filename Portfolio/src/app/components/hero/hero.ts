import { Component, ViewEncapsulation, inject, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hero',
  imports: [TranslateModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
  encapsulation: ViewEncapsulation.None
})
export class Hero implements OnInit, OnDestroy {
  private translate = inject(TranslateService);
  private langSubscription?: Subscription;

  infoItems: string[] = [];

  ngOnInit() {
    this.updateInfoItems();
    this.langSubscription = this.translate.onLangChange.subscribe(() => {
      this.updateInfoItems();
    });
  }

  ngOnDestroy() {
    this.langSubscription?.unsubscribe();
  }

  private updateInfoItems() {
    this.infoItems = [
      this.translate.instant('banner.remote'),
      this.translate.instant('banner.frontend'),
      this.translate.instant('banner.basedIn'),
      this.translate.instant('banner.openToWork')
    ];
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
