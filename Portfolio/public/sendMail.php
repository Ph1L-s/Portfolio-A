<?php
// Trashmail/Disposable email domain blacklist
$blacklistedDomains = [
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

// Rate limiting storage (in production, use Redis or database)
session_start();

function checkRateLimit() {
    $maxEmails = 3;
    $timeWindow = 600; // 10 minutes
    $currentTime = time();
    
    if (!isset($_SESSION['email_attempts'])) {
        $_SESSION['email_attempts'] = [];
    }
    
    // Remove old attempts outside time window
    $_SESSION['email_attempts'] = array_filter($_SESSION['email_attempts'], function($timestamp) use ($currentTime, $timeWindow) {
        return ($currentTime - $timestamp) < $timeWindow;
    });
    
    if (count($_SESSION['email_attempts']) >= $maxEmails) {
        return false;
    }
    
    return true;
}

function recordEmailAttempt() {
    $_SESSION['email_attempts'][] = time();
}

function isTrashEmailDomain($email) {
    global $blacklistedDomains;
    $domain = strtolower(substr(strrchr($email, "@"), 1));
    return in_array($domain, $blacklistedDomains);
}

function hasValidMXRecord($email) {
    $domain = substr(strrchr($email, "@"), 1);
    return checkdnsrr($domain, 'MX') || checkdnsrr($domain, 'A');
}

function isValidEmailPattern($email) {
    // Check for suspicious patterns
    $patterns = [
        '/^[0-9]+@/',  // Starts with numbers only
        '/^[a-z]{1,2}[0-9]{6,}@/',  // Few letters followed by many numbers
        '/[0-9]{8,}/',  // Contains 8+ consecutive numbers
        '/^test[0-9]*@/',  // Starts with "test"
        '/^temp[0-9]*@/',  // Starts with "temp"
    ];
    
    foreach ($patterns as $pattern) {
        if (preg_match($pattern, strtolower($email))) {
            return false;
        }
    }
    
    return true;
}

switch ($_SERVER['REQUEST_METHOD']) {
    case "OPTIONS": // Preflight request for CORS
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;

    case "POST":
        header("Access-Control-Allow-Origin: *");

        // Rate limiting check
        if (!checkRateLimit()) {
            http_response_code(429);
            echo "Rate limit exceeded. Please wait before sending another message.";
            exit;
        }

        // Get raw JSON input
        $json = file_get_contents("php://input");
        $params = json_decode($json);

        // Sanitize & validate inputs
        $email       = filter_var($params->email ?? '', FILTER_VALIDATE_EMAIL);
        $name        = trim(strip_tags($params->name ?? ''));
        $userMessage = trim(strip_tags($params->message ?? ''));
        $agree       = $params->agree ?? false;
        $honeypot    = trim($params->website ?? ''); // Honeypot field

        if (!$email || !$name || !$userMessage || !$agree) {
            http_response_code(400);
            echo "Invalid input";
            exit;
        }

        // Honeypot check (if filled, it's likely a bot)
        if (!empty($honeypot)) {
            http_response_code(400);
            echo "Spam detected";
            exit;
        }

        // Advanced email validation
        if (isTrashEmailDomain($email)) {
            http_response_code(400);
            echo "Disposable email addresses are not allowed";
            exit;
        }

        if (!hasValidMXRecord($email)) {
            http_response_code(400);
            echo "Invalid email domain";
            exit;
        }

        if (!isValidEmailPattern($email)) {
            http_response_code(400);
            echo "Email format appears suspicious";
            exit;
        }

        // Record this attempt for rate limiting
        recordEmailAttempt();

        // Recipient & subject - YOUR EMAIL ADDRESS
        $recipient = "phillips96.business@gmail.com";  
        $subject   = "Portfolio Contact Form - {$name}";

        // Plain text version (safe fallback)
        $plainText = "New contact form submission from your portfolio:\n\n";
        $plainText .= "From: {$name} <{$email}>\n";
        $plainText .= "Message:\n{$userMessage}\n\n";
        $plainText .= "Sent from: Portfolio Contact Form";

        // HTML version (formatted)
        $htmlText  = "
        <html>
          <body style='font-family: Arial, sans-serif; line-height: 1.6;'>
            <h2 style='color: #3DCFB6;'>New Portfolio Contact Form Submission</h2>
            <p><strong>From:</strong> {$name}</p>
            <p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
            <p><strong>Message:</strong></p>
            <div style='background: #f5f5f5; padding: 15px; border-left: 4px solid #3DCFB6; margin: 10px 0;'>
              " . nl2br(htmlspecialchars($userMessage)) . "
            </div>
            <p style='color: #666; font-size: 0.9em;'>Sent from: Portfolio Contact Form</p>
          </body>
        </html>";

        // Boundary for multipart message
        $boundary = md5(uniqid(time()));

        // Headers
        $headers   = [];
        $headers[] = "MIME-Version: 1.0";
        $headers[] = "From: Portfolio Contact <noreply@" . $_SERVER['HTTP_HOST'] . ">"; 
        $headers[] = "Reply-To: {$email}";
        $headers[] = "Content-Type: multipart/alternative; boundary=\"{$boundary}\"";

        // Body with both plain text + HTML
        $body  = "--{$boundary}\r\n";
        $body .= "Content-Type: text/plain; charset=utf-8\r\n\r\n";
        $body .= $plainText . "\r\n";
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: text/html; charset=utf-8\r\n\r\n";
        $body .= $htmlText . "\r\n";
        $body .= "--{$boundary}--";

        // Send the email
        if (mail($recipient, $subject, $body, implode("\r\n", $headers))) {
            echo "Message sent successfully!";
        } else {
            http_response_code(500);
            echo "Error sending message. Please try again.";
        }
        break;

    default:
        header("Allow: POST", true, 405);
        exit;
}
?>