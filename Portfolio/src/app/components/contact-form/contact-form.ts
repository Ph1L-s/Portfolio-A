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

  fieldHighlight = signal({
    name: false,
    email: false,
    message: false,
    privacy: false
  });

  // Computed properties for template bindings
  namePlaceholder = computed(() => this.errors().name || 'Your name goes here');
  emailPlaceholder = computed(() => this.errors().email || 'youremail@email.com');
  messagePlaceholder = computed(() => this.errors().message || 'Hello Phil, I am interested in...');
  
  nameErrorClass = computed(() => !!this.errors().name);
  emailErrorClass = computed(() => !!this.errors().email);
  messageErrorClass = computed(() => !!this.errors().message);
  
  nameHighlight = computed(() => this.fieldHighlight().name);
  emailHighlight = computed(() => this.fieldHighlight().email);
  messageHighlight = computed(() => this.fieldHighlight().message);
  privacyHighlight = computed(() => this.fieldHighlight().privacy);
  
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
    const newHighlights = { name: false, email: false, message: false, privacy: false };
    
    if (this.contactForm.get('name')?.hasError('required')) {
      newErrors.name = 'Oops! It seems your name is missing';
      newHighlights.name = true;
      this.highlightField('name');
    }
    
    if (this.contactForm.get('email')?.hasError('required')) {
      newErrors.email = 'Hoppla! your email is required';
      newHighlights.email = true;
      this.highlightField('email');
    } else if (this.contactForm.get('email')?.hasError('email')) {
      newErrors.email = 'Please enter a valid email address';
      newHighlights.email = true;
      this.highlightField('email');
    }
    
    if (this.contactForm.get('message')?.hasError('required')) {
      newErrors.message = 'What do you need to develop?';
      newHighlights.message = true;
      this.highlightField('message');
    }
    
    if (this.contactForm.get('privacy')?.hasError('required')) {
      newErrors.privacy = 'Please accept the privacy policy.';
      newHighlights.privacy = true;
      this.highlightField('privacy');
    }
    
    this.errors.set(newErrors);
    this.fieldHighlight.set(newHighlights);
  }
  
  private highlightField(fieldName: keyof ReturnType<typeof this.fieldHighlight>) {
    const current = this.fieldHighlight();
    this.fieldHighlight.set({ ...current, [fieldName]: true });
    
    setTimeout(() => {
      const updated = this.fieldHighlight();
      this.fieldHighlight.set({ ...updated, [fieldName]: false });
    }, 1500);
  }
  
  clearPrivacyError() {
    const currentErrors = this.errors();
    this.errors.set({ ...currentErrors, privacy: '' });
  }
}
