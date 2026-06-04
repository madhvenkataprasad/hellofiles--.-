/**
 * Theme management module.
 * Handles toggling between light and dark themes and persisting the preference.
 */

const DARK_CLASS = 'dark';
const STORAGE_KEY = 'theme';

function toggleTheme(bodyElement) {
  if (!bodyElement) {
    throw new Error('bodyElement is required');
  }
  bodyElement.classList.toggle(DARK_CLASS);
  return isDark(bodyElement);
}

function isDark(bodyElement) {
  if (!bodyElement) {
    throw new Error('bodyElement is required');
  }
  return bodyElement.classList.contains(DARK_CLASS);
}

function applyTheme(bodyElement, theme) {
  if (!bodyElement) {
    throw new Error('bodyElement is required');
  }
  if (theme === 'dark') {
    bodyElement.classList.add(DARK_CLASS);
  } else {
    bodyElement.classList.remove(DARK_CLASS);
  }
}

function getStoredTheme(storage) {
  if (!storage) return null;
  return storage.getItem(STORAGE_KEY);
}

function storeTheme(storage, theme) {
  if (!storage) {
    throw new Error('storage is required');
  }
  storage.setItem(STORAGE_KEY, theme);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DARK_CLASS,
    STORAGE_KEY,
    toggleTheme,
    isDark,
    applyTheme,
    getStoredTheme,
    storeTheme,
  };
}
