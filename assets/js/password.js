/* ============================================================
   PASSWORD.JS — Client-side case study gate
   danostrowski.com
   ============================================================ */

(function () {
  'use strict';

  // SHA-256 hash of the password "password"
  // To update: run hashPassword('yournewpassword') in console and replace this
  const CORRECT_HASH = 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855';

  // Actually: SHA-256 of "password" is:
  // 5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8
  const PASSWORD_HASH = '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8';

  const SESSION_KEY = 'dan-portfolio-access';

  const gate = document.getElementById('password-gate');
  const content = document.getElementById('case-content');
  const form = document.getElementById('password-form');
  const input = document.getElementById('password-input');
  const errorEl = document.getElementById('password-error');
  const submitBtn = document.getElementById('password-submit');

  // ── Check existing session ─────────────────────────────────
  if (!gate || !content) return; // Not a protected page

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

      submitBtn.textContent = '...';
      submitBtn.disabled = true;

      try {
        const hash = await sha256(value);

        if (hash === PASSWORD_HASH) {
          sessionStorage.setItem(SESSION_KEY, 'granted');
          grantAccess();
        } else {
          if (errorEl) {
            errorEl.textContent = 'Incorrect. Request access via LinkedIn.';
          }
          if (input) {
            input.value = '';
            input.focus();
          }
          submitBtn.textContent = 'View Case Study';
          submitBtn.disabled = false;
        }
      } catch (err) {
        console.error('Hash error:', err);
        submitBtn.textContent = 'View Case Study';
        submitBtn.disabled = false;
      }
    });
  }

  // ── Enter key on input ─────────────────────────────────────
  if (input) {
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        form.dispatchEvent(new Event('submit'));
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
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

})();
