import { Component, signal, computed } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  private fb = new FormBuilder();
  
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    message: ['', [Validators.required]],
    privacy: [false, [Validators.requiredTrue]]
  });

  errors = signal({
    name: '',
    email: '',
    message: '',
    privacy: ''
  });

  // Computed properties for template bindings
  namePlaceholder = computed(() => this.errors().name || 'Your name goes here');
  emailPlaceholder = computed(() => this.errors().email || 'youremail@email.com');
  messagePlaceholder = computed(() => this.errors().message || 'Hello Phil, I am interested in...');
  
  nameErrorClass = computed(() => !!this.errors().name);
  emailErrorClass = computed(() => !!this.errors().email);
  messageErrorClass = computed(() => !!this.errors().message);
  
  showPrivacyError = computed(() => !!this.errors().privacy);
  privacyErrorText = computed(() => this.errors().privacy);

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      // Handle successful submission
    } else {
      this.showValidationErrors();
    }
  }
  
  private showValidationErrors() {
    const newErrors = { name: '', email: '', message: '', privacy: '' };
    
    if (this.contactForm.get('name')?.hasError('required')) {
      newErrors.name = 'Oops! It seems your name is missing';
    }
    
    if (this.contactForm.get('email')?.hasError('required')) {
      newErrors.email = 'Hoppla! your email is required';
    } else if (this.contactForm.get('email')?.hasError('email')) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (this.contactForm.get('message')?.hasError('required')) {
      newErrors.message = 'What do you need to develop?';
    }
    
    if (this.contactForm.get('privacy')?.hasError('required')) {
      newErrors.privacy = 'Please accept the privacy policy.';
    }
    
    this.errors.set(newErrors);
  }
  
  clearPrivacyError() {
    const currentErrors = this.errors();
    this.errors.set({ ...currentErrors, privacy: '' });
  }
}
