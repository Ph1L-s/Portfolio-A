import { Component, signal, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss'
})
export class ContactForm {
  private fb = new FormBuilder();
  private http = inject(HttpClient);

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
   * Signal tracking whether the form is currently being submitted.
   * Used to disable the submit button and show loading state.
   */
  isSubmitting = signal(false);

  /**
   * Signal tracking the submission result status.
   * - 'idle': No recent submission or status has been reset
   * - 'success': Form submitted successfully
   * - 'error': Form submission failed
   *
   * @remarks
   * Status automatically resets to 'idle' after 5 seconds.
   */
  submitStatus = signal<'idle' | 'success' | 'error'>('idle');

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

  /**
   * Computed property returning the placeholder text for the name field.
   * Shows error message if present, otherwise shows default placeholder.
   */
  namePlaceholder = computed(() => this.errors().name || 'Your name goes here');

  /**
   * Computed property returning the placeholder text for the email field.
   * Shows error message if present, otherwise shows default placeholder.
   */
  emailPlaceholder = computed(() => this.errors().email || 'youremail@email.com');

  /**
   * Computed property returning the placeholder text for the message field.
   * Shows error message if present, otherwise shows default placeholder.
   */
  messagePlaceholder = computed(() => this.errors().message || 'Hello Phil, I am interested in...');

  /**
   * Computed property indicating whether the name field has an error.
   * Used to apply error styling in the template.
   */
  nameErrorClass = computed(() => !!this.errors().name);

  /**
   * Computed property indicating whether the email field has an error.
   * Used to apply error styling in the template.
   */
  emailErrorClass = computed(() => !!this.errors().email);

  /**
   * Computed property indicating whether the message field has an error.
   * Used to apply error styling in the template.
   */
  messageErrorClass = computed(() => !!this.errors().message);

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
   * Handles form submission with validation, spam prevention, and backend communication.
   *
   * Process flow:
   * 1. Validates all form fields
   * 2. If invalid, displays error messages and exits
   * 3. If valid, sends data to PHP backend via HTTP POST
   * 4. Handles success/error responses and updates UI accordingly
   * 5. Resets form on success
   *
   * @returns void
   *
   * @remarks
   * - The honeypot field ('website') is included in submission for backend validation
   * - Success/error status automatically resets after 5 seconds
   * - Form is disabled during submission via isSubmitting signal
   * - All errors are cleared before submission attempt
   */
  onSubmit() {
    if (!this.contactForm.valid) {
      this.showValidationErrors();
      return;
    }

    this.isSubmitting.set(true);
    this.submitStatus.set('idle');
    this.clearAllErrors();

    const formData = {
      name: this.contactForm.get('name')?.value,
      email: this.contactForm.get('email')?.value,
      message: this.contactForm.get('message')?.value,
      agree: this.contactForm.get('privacy')?.value,
      website: this.contactForm.get('website')?.value // Honeypot field
    };

    this.http.post(this.post.endPoint, this.post.body(formData), this.post.options)
      .subscribe({
        next: (response) => {
          console.info('Mail sent successfully:', response);
          this.submitStatus.set('success');
          this.contactForm.reset();
          this.clearAllErrors();
        },
        error: (error) => {
          console.error('Error sending mail:', error);
          this.submitStatus.set('error');
        },
        complete: () => {
          this.isSubmitting.set(false);
          // Reset status after 5 seconds
          setTimeout(() => this.submitStatus.set('idle'), 5000);
        }
      });
  }
  
  /**
   * Collects and displays validation error messages for all form fields.
   *
   * Checks each form field for validation errors and generates appropriate
   * user-friendly error messages. Error messages are stored in the errors signal
   * which triggers UI updates via computed properties.
   *
   * Error priority (for email field):
   * 1. Required error
   * 2. Email format error
   * 3. Disposable email error
   * 4. Suspicious pattern error
   *
   * @returns void
   * @private
   *
   * @remarks
   * This method is called when form submission is attempted with invalid fields.
   * Only the first error for each field is displayed to avoid overwhelming the user.
   */
  private showValidationErrors() {
    const newErrors = { name: '', email: '', message: '', privacy: '' };

    if (this.contactForm.get('name')?.hasError('required')) {
      newErrors.name = 'Oops! It seems your name is missing';
    }

    if (this.contactForm.get('email')?.hasError('required')) {
      newErrors.email = 'Hoppla! your email is required';
    } else if (this.contactForm.get('email')?.hasError('email')) {
      newErrors.email = 'Please enter a valid email address';
    } else if (this.contactForm.get('email')?.hasError('trashEmail')) {
      newErrors.email = 'Disposable email addresses are not allowed';
    } else if (this.contactForm.get('email')?.hasError('suspiciousEmail')) {
      newErrors.email = 'Email format appears suspicious';
    }

    if (this.contactForm.get('message')?.hasError('required')) {
      newErrors.message = 'What do you need to develop?';
    }

    if (this.contactForm.get('privacy')?.hasError('required')) {
      newErrors.privacy = 'Please accept the privacy policy.';
    }

    this.errors.set(newErrors);
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
  }
}
