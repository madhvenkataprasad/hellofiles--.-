/**
 * Theme toggle utility.
 * Manages dark/light mode switching with localStorage persistence.
 */
const Theme = {
  STORAGE_KEY: 'theme-preference',

  init() {
    const saved = localStorage.getItem(this.STORAGE_KEY);
    if (saved === 'dark') {
      document.body.classList.add('dark');
    }
  },

  toggle() {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem(this.STORAGE_KEY, isDark ? 'dark' : 'light');
  }
};

document.addEventListener('DOMContentLoaded', () => Theme.init());
