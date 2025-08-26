import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ContactPageComponent } from './pages/contact-page/contact-page';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'contact', component: ContactPageComponent },
  { path: '**', redirectTo: '' }
];
