/**
 * Dakshesh Rathore — Portfolio JavaScript
 * Lightweight, zero dependencies, accessible and performant
 */

(function () {
  'use strict';

  // --- 1. Theme Management ---
  const STORAGE_KEY = 'dr_portfolio_theme';
  const themeToggleBtn = document.getElementById('theme-toggle');
  const root = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
    // Default to dark theme as preferred for developer portfolio
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }
    return 'dark';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    if (themeToggleBtn) {
      const isLight = theme === 'light';
      themeToggleBtn.setAttribute(
        'aria-label',
        isLight ? 'Switch to dark theme' : 'Switch to light theme'
      );
      themeToggleBtn.setAttribute(
        'title',
        isLight ? 'Switch to dark theme' : 'Switch to light theme'
      );
    }
  }

  // Initialize theme
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') || 'dark';
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem(STORAGE_KEY, next);
      applyTheme(next);
    });
  }

  // Listen for system theme changes if user hasn't explicitly set one
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
      if (!localStorage.getItem(STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // --- 2. Mobile Navigation Menu ---
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = navMenu.classList.contains('open');
      if (isOpen) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.classList.add('open');
        mobileToggle.setAttribute('aria-expanded', 'true');
      }
    });

    // Close menu when clicking navigation links
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.focus();
      }
    });
  }

  // --- 3. Active Nav Link on Scroll (Intersection Observer) ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            if (link.getAttribute('href') === '#' + currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(function (sec) {
      observer.observe(sec);
    });
  }

  // --- 4. Copy Email to Clipboard ---
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    toast.setAttribute('aria-hidden', 'false');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
      toast.setAttribute('aria-hidden', 'true');
    }, 2500);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const email = copyBtn.getAttribute('data-email') || 'daksheshrathore71@gmail.com';
      const originalText = copyBtn.querySelector('.copy-text');

      function notifySuccess() {
        if (originalText) originalText.textContent = 'Copied!';
        showToast('Email address copied to clipboard!');
        setTimeout(function () {
          if (originalText) originalText.textContent = 'Copy';
        }, 2000);
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(notifySuccess).catch(function () {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }

      function fallbackCopy(text) {
        try {
          const tempInput = document.createElement('input');
          tempInput.value = text;
          tempInput.style.position = 'fixed';
          tempInput.style.opacity = '0';
          document.body.appendChild(tempInput);
          tempInput.focus();
          tempInput.select();
          const successful = document.execCommand('copy');
          document.body.removeChild(tempInput);
          if (successful) {
            notifySuccess();
          } else {
            showToast('Press Ctrl+C to copy: ' + text);
          }
        } catch (err) {
          showToast('Press Ctrl+C to copy: ' + text);
        }
      }
    });
  }

  // --- 5. Dynamic Footer Year ---
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
