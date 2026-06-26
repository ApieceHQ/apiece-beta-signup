/**
 * Apiece beta signup — Google Apps Script backend.
 *
 * Bound to the applications Google Sheet. Receives a POST from the Next.js
 * /api/apply route, appends one row, and emails dp@apiece.co.
 *
 * Setup: see apps-script/README.md. In short:
 *  1. Extensions → Apps Script on the target Sheet, paste this file.
 *  2. Project Settings → Script properties → add APPLY_SECRET (any random string).
 *  3. Deploy → New deployment → Web app → Execute as "Me",
 *     Who has access "Anyone". Copy the /exec URL.
 *  4. Put that URL in APPS_SCRIPT_URL and the same secret in
 *     APPS_SCRIPT_SECRET in the site's environment.
 */

var NOTIFY_EMAIL = 'dp@apiece.co';
var HEADERS = ['Timestamp', 'Email', 'Audience URLs', 'Referral'];

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents);

    // Shared-secret check — rejects random public POSTs.
    var expected = PropertiesService.getScriptProperties().getProperty('APPLY_SECRET');
    if (expected && body.secret !== expected) {
      return jsonOut({ ok: false, error: 'unauthorized' });
    }

    var sheet = getSheet_();
    ensureHeaders_(sheet);

    var timestamp = body.timestamp || new Date().toISOString();
    var email = body.email || '';
    var urls = Array.isArray(body.urls) ? body.urls.join('\n') : (body.urls || '');
    var referral = body.referral || '';

    sheet.appendRow([timestamp, email, urls, referral]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New Apiece beta application: ' + email,
      body: [
        'New Apiece beta application',
        '',
        'Email:           ' + email,
        'Audience URL(s): ' + (urls || '—'),
        'Referral:        ' + (referral || '—'),
        'Time:            ' + timestamp,
      ].join('\n'),
    });

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

// Simple GET so you can confirm the deployment is live in a browser.
function doGet() {
  return jsonOut({ ok: true, service: 'apiece-beta-signup' });
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName('Applications') || ss.getSheets()[0];
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
