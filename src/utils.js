/**
 * General utility functions used across the application.
 */

function capitalize(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function slugify(str) {
  if (typeof str !== 'string') {
    throw new TypeError('Expected a string');
  }
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function debounce(fn, delay) {
  if (typeof fn !== 'function') {
    throw new TypeError('Expected a function');
  }
  if (typeof delay !== 'number' || delay < 0) {
    throw new TypeError('delay must be a non-negative number');
  }
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function clamp(value, min, max) {
  if (typeof value !== 'number' || typeof min !== 'number' || typeof max !== 'number') {
    throw new TypeError('All arguments must be numbers');
  }
  if (min > max) {
    throw new RangeError('min must not be greater than max');
  }
  return Math.min(Math.max(value, min), max);
}

function formatGreeting(name) {
  if (typeof name !== 'string') {
    throw new TypeError('Expected a string');
  }
  const trimmed = name.trim();
  if (trimmed.length === 0) return 'Hello!';
  return `Hello, ${capitalize(trimmed)}!`;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    capitalize,
    slugify,
    debounce,
    clamp,
    formatGreeting,
  };
}
