import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/**
 * Contact form component with comprehensive spam protection and validation.
 *
 * Features:
 * - Custom validators for disposable emails and suspicious patterns
 * - Honeypot field for bot detection
 * - Real-time validation feedback
 * - Integration with PHP backend for email sending
 *
 * @remarks
 * This component uses Angular signals for reactive state management and
 * implements multiple layers of spam protection including domain blacklisting,
 * pattern matching, and honeypot detection.
 */
@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule, RouterLink, TranslateModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm implements OnInit, OnDestroy {
  private fb = new FormBuilder();
  private http = inject(HttpClient);
  private translate = inject(TranslateService);

  // Signal to track language changes for computed properties
  private currentLang = signal(this.translate.currentLang || 'en');

  // Subscription for form value changes (Session Storage)
  private formValueSubscription?: Subscription;

  // Session Storage key for form data persistence
  private readonly STORAGE_KEY = 'contactFormData';

  /**
   * Blacklist of 200+ disposable email domains to prevent spam submissions.
   * This list is synchronized with the PHP backend validation.
   *
   * @remarks
   * Includes common temporary email services like mailinator, guerrillamail,
   * 10minutemail, and many others that are frequently used for spam.
   */
  private blacklistedDomains = [
    '10minutemail.com', '20minutemail.com', '2prong.com', '3d-game.com', '4warding.com',
    'agedmail.com', 'ajaxapp.net', 'amilegit.com', 'amiriindustrial.com', 'anonbox.net',
    'anonymousspeech.com', 'armyspy.com', 'binkmail.com', 'bobmail.info', 'brennendesreich.de',
    'brefmail.com', 'broadbandninja.com', 'bumpymail.com', 'casualdx.com', 'centermail.com',
    'chogmail.com', 'cool.fr.nf', 'correo.blogos.net', 'cosmorph.com', 'courriel.fr.nf',
    'curryworld.de', 'cust.in', 'dacoolest.com', 'dandikmail.com', 'dayrep.com',
    'deadaddress.com', 'despam.it', 'devnullmail.com', 'dfgh.net', 'digitalsanctuary.com',
    'discardmail.com', 'discardmail.de', 'disposableaddress.com', 'disposableinbox.com',
    'dontreg.com', 'dontsendmespam.de', 'drdrb.com', 'dump-email.info', 'dumpmail.de',
    'dumpyemail.com', 'e-mail.com', 'e-mail.org', 'emailias.com', 'emailinfive.com',
    'emailsensei.com', 'emailtemporario.com.br', 'emailzilla.com', 'fakeinbox.com',
    'fakemailgenerator.com', 'fastmail.fm', 'filzmail.com', 'fivemail.com', 'fleckens.hu',
    'fudgerub.com', 'fux0ringduh.com', 'garbagemail.org', 'get-mail.info', 'getairmail.com',
    'getmails.eu', 'getonemail.com', 'getonemail.net', 'ghosttexter.de', 'gishpuppy.com',
    'great-host.in', 'guerrillamail.biz', 'guerrillamail.com', 'guerrillamail.net',
    'guerrillamail.org', 'guerrillamailblock.com', 'h.mintemail.com', 'haltospam.com',
    'hasanmail.com', 'hidemail.de', 'hotpop.com', 'ieatspam.eu', 'ieatspam.info',
    'ieh-mail.de', 'imails.info', 'inboxalias.com', 'incognitomail.com', 'incognitomail.net',
    'incognitomail.org', 'ipoo.org', 'irish2me.com', 'jetable.com', 'jetable.fr.nf',
    'jetable.net', 'jetable.org', 'jnxjn.com', 'jourrapide.com', 'kaspop.com',
    'keepmymail.com', 'killmail.com', 'killmail.net', 'kir.ch.tc', 'klassmaster.com',
    'klzlk.com', 'koszmail.pl', 'kurzepost.de', 'lawlita.com', 'letthemeatspam.com',
    'lhsdv.com', 'lifebyfood.com', 'link2mail.net', 'litedrop.com', 'lookugly.com',
    'lortemail.dk', 'losemymail.com', 'lovespamham.com', 'lr78.com', 'maboard.com',
    'mail-temporaire.fr', 'mail.by', 'mail.mezimages.net', 'mail4trash.com', 'mailbidon.com',
    'mailblocks.com', 'mailcatch.com', 'maileater.com', 'mailexpire.com', 'mailfa.tk',
    'mailforspam.com', 'mailfreeonline.com', 'mailguard.me', 'mailin8r.com', 'mailinatar.com',
    'mailinator.com', 'mailinator.net', 'mailinator.org', 'mailinator2.com', 'mailincubator.com',
    'mailme.lv', 'mailnator.com', 'mailnesia.com', 'mailnull.com', 'mailsac.com',
    'mailslapping.com', 'mailtemp.info', 'mailtome.de', 'mailtothis.com', 'mailzilla.com',
    'makemetheking.com', 'manifestgenerator.com', 'manybrain.com', 'mbx.cc', 'mintemail.com',
    'mjukglass.nu', 'mobi.web.id', 'moburl.com', 'moncourrier.fr.nf', 'monemail.fr.nf',
    'monmail.fr.nf', 'mt2009.com', 'mx0.wwwnew.eu', 'mycleaninbox.net', 'mypartyclip.de',
    'myphantomemail.com', 'myspaceinc.com', 'myspaceinc.net', 'myspaceinc.org', 'myspacepimpedup.com',
    'myspamless.com', 'mytrashmail.com', 'no-spam.ws', 'nobulk.com', 'noclickemail.com',
    'nogmailspam.info', 'nomail.xl.cx', 'nomail2me.com', 'nomorespamemails.com', 'nospam.ze.tc',
    'nospam4.us', 'nospamfor.us', 'nowmymail.com', 'ntlhelp.net', 'nullbox.info',
    'nus.edu.sg', 'objectmail.com', 'obobbo.com', 'oooo.com', 'ordinaryamerican.net',
    'ourklips.com', 'outlawspam.com', 'ovpn.to', 'owlpic.com', 'pancakemail.com',
    'poofy.org', 'pookmail.com', 'privatdemail.net', 'proxymail.eu', 'punycode.info',
    'putthisinyourspamdatabase.com', 'quickinbox.com', 'rcpt.at', 'recode.me', 'recursor.net',
    'reliable-mail.com', 'rhyta.com', 'rppkn.com', 'rtrtr.com', 'rumgel.com',
    'safe-mail.net', 'sandelf.de', 'saynotospams.com', 'selfdestructingmail.com', 'sendspamhere.com',
    'sharklasers.com', 'smellfear.com', 'snakemail.com', 'sneakemail.com', 'sneakmail.de',
    'sofimail.com', 'sofort-mail.de', 'soodonims.com', 'spam.la', 'spamail.de',
    'spambob.net', 'spambog.com', 'spambog.de', 'spambog.ru', 'spambox.us',
    'spamcannon.com', 'spamcannon.net', 'spamcon.org', 'spamcorptastic.com', 'spamcowboy.com',
    'spamcowboy.net', 'spamcowboy.org', 'spamday.com', 'spamex.com', 'spamfree24.com',
    'spamfree24.de', 'spamfree24.eu', 'spamfree24.net', 'spamfree24.org', 'spamgoes.com',
    'spamhereplease.com', 'spamhole.com', 'spamify.com', 'spaminator.de', 'spamkill.info',
    'spaml.com', 'spaml.de', 'spammotel.com', 'spamobox.com', 'spamspot.com',
    'spamthis.co.uk', 'spamthisplease.com', 'spamtroll.net', 'speed.1s.fr', 'supergreatmail.com',
    'supermailer.jp', 'superrito.com', 'superstachel.de', 'suremail.info', 'tagyourself.com',
    'teewars.org', 'teleworm.com', 'teleworm.us', 'temp-mail.org', 'tempail.com',
    'tempalias.com', 'tempe-mail.com', 'tempemail.biz', 'tempemail.com', 'tempinbox.co.uk',
    'tempinbox.com', 'tempmail.eu', 'tempmail2.com', 'tempmaildemo.com', 'tempymail.com',
    'thankyou2010.com', 'thecloudindex.com', 'thisisnotmyrealemail.com', 'throam.com', 'throwawayemailaddresses.com',
    'tilien.com', 'tmailinator.com', 'toomail.biz', 'trash-mail.at', 'trash-mail.com',
    'trash-mail.de', 'trash2009.com', 'trashdevil.com', 'trashdevil.de', 'trashemail.de',
    'trashmail.at', 'trashmail.com', 'trashmail.de', 'trashmail.me', 'trashmail.net',
    'trashmail.org', 'trashmail.ws', 'trashmailer.com', 'trashymail.com', 'trashymail.net',
    'tyldd.com', 'uggsrock.com', 'umail.net', 'upliftnow.com', 'uplipht.com',
    'venompen.com', 'veryrealemail.com', 'viditag.com', 'viralplays.com', 'vomoto.com',
    'walala.org', 'walkmail.ru', 'wetrainbayarea.com', 'wetrainbayarea.org', 'wh4f.org',
    'whatpassthistest.com', 'whyspam.me', 'willselfdestruct.com', 'winemaven.info', 'wronghead.com',
    'wuzupmail.net', 'xagloo.com', 'xemaps.com', 'xents.com', 'xmail.com',
    'xyzfree.net', 'yep.it', 'yogamaven.com', 'yopmail.com', 'yopmail.fr',
    'yopmail.net', 'yourdomain.com', 'ypmail.webredirect.org', 'yuurok.com', 'zehnminuten.de',
    'zippymail.info', 'zoaxe.com', 'zoemail.org'
  ];

  /**
   * Custom validator that rejects disposable/temporary email addresses.
   *
   * Checks the email domain against a blacklist of known disposable email providers.
   * This prevents spam submissions from temporary email services.
   *
   * @param control - The form control containing the email value to validate
   * @returns ValidationErrors with 'trashEmail' key if domain is blacklisted, null if valid
   *
   * @example
   * // Usage in form control
   * email: ['', [Validators.email, this.noTrashEmailValidator]]
   *
   * @remarks
   * The validator is case-insensitive and only checks the domain portion after '@'.
   * Empty values are considered valid to allow the required validator to handle them.
   */
  private noTrashEmailValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const email = control.value.toLowerCase();
    const domain = email.split('@')[1];
    if (domain && this.blacklistedDomains.includes(domain)) {
      return { trashEmail: true };
    }
    return null;
  };

  /**
   * Custom validator that detects suspicious email patterns commonly used by bots and spammers.
   *
   * Checks for patterns like:
   * - Emails starting with only numbers (e.g., 123456@example.com)
   * - Few letters followed by many numbers (e.g., ab123456@example.com)
   * - 8 or more consecutive numbers anywhere in the email
   * - Emails starting with 'test' or 'temp'
   *
   * @param control - The form control containing the email value to validate
   * @returns ValidationErrors with 'suspiciousEmail' key if pattern matches, null if valid
   *
   * @example
   * // Usage in form control
   * email: ['', [this.noSuspiciousPatternValidator]]
   *
   * @remarks
   * This validator works in conjunction with noTrashEmailValidator to provide
   * comprehensive spam protection. Empty values are considered valid.
   */
  private noSuspiciousPatternValidator = (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const email = control.value.toLowerCase();

    const suspiciousPatterns = [
      /^[0-9]+@/,  // Starts with numbers only
      /^[a-z]{1,2}[0-9]{6,}@/,  // Few letters followed by many numbers
      /[0-9]{8,}/,  // Contains 8+ consecutive numbers
      /^test[0-9]*@/,  // Starts with "test"
      /^temp[0-9]*@/,  // Starts with "temp"
    ];

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(email)) {
        return { suspiciousEmail: true };
      }
    }
    return null;
  };

  
  /**
   * Contact form with validation for name, email, message, privacy policy, and honeypot field.
   *
   * @remarks
   * The 'website' field is a honeypot - it should remain empty for legitimate users.
   * Bots typically fill all fields, allowing us to detect and reject automated submissions.
   */
  contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, this.noTrashEmailValidator, this.noSuspiciousPatternValidator]],
    message: ['', [Validators.required]],
    privacy: [false, [Validators.requiredTrue]],
    website: [''] // Honeypot field
  });

  /**
   * Signal containing validation error messages for each form field.
   * Empty strings indicate no error for that field.
   */
  errors = signal({
    name: '',
    email: '',
    message: '',
    privacy: ''
  });

  /**
   * Signal tracking which fields have been touched (blurred).
   * Used to show validation errors only after user interaction.
   */
  touched = signal<Record<string, boolean>>({
    name: false,
    email: false,
    message: false,
    agree: false
  });

  /**
   * Signal tracking whether the form is currently being submitted.
   * Used to disable the submit button and show loading state.
   */
  isSubmitting = signal(false);

  /**
   * Signal tracking the submission result status.
   * - 'idle': No recent submission or status has been reset
   * - 'success': Form submitted successfully
   * - 'error': Form submission failed
   * - 'rate_limited': Rate limit exceeded
   *
   * @remarks
   * Status automatically resets to 'idle' after 5 seconds.
   */
  submitStatus = signal<'idle' | 'success' | 'error' | 'rate_limited'>('idle');

  /**
   * Rate limit status signals
   */
  remainingEmails = signal(5);
  showRateLimitWarning = signal(false);
  cooldownMinutes = signal(0);

  /**
   * Configuration for the HTTP POST request to the PHP backend.
   * Contains endpoint path, serialization function, and request options.
   */
  post = {
    endPoint: '/sendMail.php', // Relative path to PHP file in public folder
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as const
    }
  };

  ngOnInit() {
    // Update currentLang signal when language changes to trigger computed properties
    this.translate.onLangChange.subscribe((event) => {
      this.currentLang.set(event.lang);
    });

    // Restore form data from session storage
    this.restoreFromSession();

    // Auto-save form data to session storage on changes (with 500ms debounce)
    this.formValueSubscription = this.contactForm.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => this.saveToSession());
  }

  ngOnDestroy() {
    // Clean up subscription to prevent memory leaks
    this.formValueSubscription?.unsubscribe();
  }

  /**
   * Saves form data (name, email, message) to session storage.
   * Does not save privacy checkbox or honeypot field.
   */
  private saveToSession() {
    const dataToSave = {
      name: this.contactForm.get('name')?.value || '',
      email: this.contactForm.get('email')?.value || '',
      message: this.contactForm.get('message')?.value || ''
    };
    sessionStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToSave));
  }

  /**
   * Restores form data from session storage if available.
   */
  private restoreFromSession() {
    const savedData = sessionStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        this.contactForm.patchValue(parsed);
      } catch (e) {
        sessionStorage.removeItem(this.STORAGE_KEY);
      }
    }
  }

  /**
   * Clears form data from session storage.
   */
  private clearSession() {
    sessionStorage.removeItem(this.STORAGE_KEY);
  }

  /**
   * Computed property indicating whether the privacy checkbox has an error.
   * Used to show/hide the privacy error message.
   */
  showPrivacyError = computed(() => !!this.errors().privacy);

  /**
   * Computed property returning the privacy policy error text.
   */
  privacyErrorText = computed(() => this.errors().privacy);

  /**
   * Computed property returning the specific error message for the name field.
   * Returns null if field is not touched or has no errors.
   */
  nameErrorMessage = computed(() => {
    const nameControl = this.contactForm.get('name');
    if (!nameControl || !this.touched()['name']) return null;
    if (nameControl.hasError('required')) return 'contact.nameMissing';
    return null;
  });

  /**
   * Computed property returning the specific error message for the email field.
   * Returns null if field is not touched or has no errors.
   * Error priority: required > email format > trash email > suspicious pattern
   */
  emailErrorMessage = computed(() => {
    const emailControl = this.contactForm.get('email');
    if (!emailControl || !this.touched()['email']) return null;
    if (emailControl.hasError('required')) return 'contact.emailRequired';
    if (emailControl.hasError('email')) return 'contact.invalidEmail';
    if (emailControl.hasError('trashEmail')) return 'contact.disposableEmailError';
    if (emailControl.hasError('suspiciousEmail')) return 'contact.suspiciousEmailError';
    return null;
  });

  /**
   * Computed property returning the specific error message for the message field.
   * Returns null if field is not touched or has no errors.
   */
  messageErrorMessage = computed(() => {
    const messageControl = this.contactForm.get('message');
    if (!messageControl || !this.touched()['message']) return null;
    if (messageControl.hasError('required')) return 'contact.messageRequired';
    return null;
  });

  /**
   * Handler for field blur events. Marks the field as touched and triggers validation.
   * @param fieldName - The name of the field that was blurred
   */
  onFieldBlur(fieldName: string): void {
    this.touched.update(t => ({ ...t, [fieldName]: true }));
  }

  /** Prepares form data for submission. */
  private prepareFormData() {
    return {
      name: this.contactForm.get('name')?.value,
      email: this.contactForm.get('email')?.value,
      message: this.contactForm.get('message')?.value,
      agree: this.contactForm.get('privacy')?.value,
      website: this.contactForm.get('website')?.value
    };
  }

  /** Handles successful form submission response. */
  private handleSubmitSuccess(responseText: string) {
    try {
      const response = JSON.parse(responseText);
      console.info('Mail sent successfully:', response);
      if (response.remaining !== undefined) this.remainingEmails.set(response.remaining);
      if (response.showWarning) this.showRateLimitWarning.set(true);
    } catch { /* Non-JSON response, still success */ }

    this.submitStatus.set('success');
    this.contactForm.reset();
    this.clearAllErrors();
    this.clearSession();
  }

  /** Handles form submission error response. */
  private handleSubmitError(error: any) {
    console.error('Error sending mail:', error);

    if (error.status === 429) {
      this.handleRateLimitError(error);
    } else {
      this.submitStatus.set('error');
    }
  }

  /** Handles rate limit (HTTP 429) error. */
  private handleRateLimitError(error: any) {
    this.submitStatus.set('rate_limited');
    this.remainingEmails.set(0);

    try {
      const response = JSON.parse(error.error);
      this.cooldownMinutes.set(Math.ceil(response.cooldown / 60));
    } catch {
      this.cooldownMinutes.set(15);
    }
  }

  /** Resets submit status after timeout. */
  private resetStatusAfterTimeout() {
    this.isSubmitting.set(false);
    const timeout = this.submitStatus() === 'rate_limited' ? 10000 : 5000;
    setTimeout(() => {
      this.submitStatus.set('idle');
      this.showRateLimitWarning.set(false);
    }, timeout);
  }

  /** Handles form submission. */
  onSubmit() {
    if (!this.contactForm.valid) {
      this.showValidationErrors();
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');
    this.clearAllErrors();

    const formData = this.prepareFormData();

    this.http.post(this.post.endPoint, this.post.body(formData), this.post.options)
      .subscribe({
        next: (response) => this.handleSubmitSuccess(response as string),
        error: (error) => this.handleSubmitError(error),
        complete: () => this.resetStatusAfterTimeout()
      });
  }
  
  /** Marks all fields as touched. */
  private markAllFieldsTouched() {
    this.touched.set({ name: true, email: true, message: true, agree: true });
  }

  /** Updates privacy error state. */
  private updatePrivacyError() {
    const hasPrivacyError = this.contactForm.get('privacy')?.hasError('required');
    const privacyMsg = hasPrivacyError ? this.translate.instant('contact.privacyError') : '';
    this.errors.set({ name: '', email: '', message: '', privacy: privacyMsg });
  }

  /** Scrolls to first error field. */
  private scrollToFirstError() {
    setTimeout(() => {
      const errorField = document.querySelector('.has-error, .field-error');
      errorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  }

  /** Displays validation errors for all form fields. */
  private showValidationErrors() {
    this.markAllFieldsTouched();
    this.updatePrivacyError();
    this.scrollToFirstError();
  }
  
  /**
   * Clears only the privacy policy error message.
   *
   * Used when the user checks the privacy checkbox to immediately remove
   * the error message without clearing other field errors.
   *
   * @returns void
   *
   * @remarks
   * This provides better UX by giving immediate feedback when the privacy
   * checkbox is checked, without waiting for form submission.
   */
  clearPrivacyError() {
    const currentErrors = this.errors();
    this.errors.set({ ...currentErrors, privacy: '' });
  }

  /**
   * Clears all validation error messages for all form fields.
   *
   * @returns void
   * @private
   *
   * @remarks
   * Called at the start of form submission and after successful submission
   * to reset the error state.
   */
  private clearAllErrors() {
    this.errors.set({ name: '', email: '', message: '', privacy: '' });
    this.touched.set({ name: false, email: false, message: false, agree: false });
  }
}
