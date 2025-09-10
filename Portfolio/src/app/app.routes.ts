import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ContactPageComponent } from './pages/contact-page/contact-page';
import { LegalNoticeComponent } from './pages/legal-notice/legal-notice';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: 'legal', component: LegalNoticeComponent },
  { path: '**', redirectTo: '' }
];
