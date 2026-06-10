/* ============================================================
   PASSWORD.JS — Client-side case study gate
   danostrowski.com

   To update the password:
   1. Open browser console on any page
   2. Run:
      crypto.subtle.digest('SHA-256', new TextEncoder().encode('yournewpassword'))
        .then(b => console.log(Array.from(new Uint8Array(b))
        .map(x => x.toString(16).padStart(2,'0')).join('')))
   3. Copy the hash and replace PASSWORD_HASH below
   ============================================================ */

(function () {
  'use strict';

  // SHA-256 hash of the current password
  // Default: "password" — change before launch
  const PASSWORD_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';

  const SESSION_KEY = 'dan-portfolio-access';

  const gate    = document.getElementById('password-gate');
  const content = document.getElementById('case-content');
  const form    = document.getElementById('password-form');
  const input   = document.getElementById('password-input');
  const errorEl = document.getElementById('password-error');
  const submitBtn = document.getElementById('password-submit');

  // ── Not a protected page ───────────────────────────────────
  if (!gate || !content) return;

  // ── Already authenticated this session ────────────────────
  if (sessionStorage.getItem(SESSION_KEY) === 'granted') {
    grantAccess();
    return;
  }

  // ── Form submit ────────────────────────────────────────────
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const value = input ? input.value.trim() : '';
      if (!value) return;

      submitBtn.textContent = '···';
      submitBtn.disabled = true;

      try {
        const hash = await sha256(value);
        if (hash === PASSWORD_HASH) {
          sessionStorage.setItem(SESSION_KEY, 'granted');
          grantAccess();
        } else {
          if (errorEl) errorEl.textContent = 'Incorrect. Request access via LinkedIn.';
          if (input) { input.value = ''; input.focus(); }
          submitBtn.textContent = 'View Case Study';
          submitBtn.disabled = false;
        }
      } catch (err) {
        submitBtn.textContent = 'View Case Study';
        submitBtn.disabled = false;
      }
    });
  }

  // ── Grant access ───────────────────────────────────────────
  function grantAccess() {
    if (gate) gate.style.display = 'none';
    if (content) {
      content.style.display = 'block';
      content.removeAttribute('hidden');
    }
  }

  // ── SHA-256 via Web Crypto API ─────────────────────────────
  async function sha256(message) {
    const data = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

})();
