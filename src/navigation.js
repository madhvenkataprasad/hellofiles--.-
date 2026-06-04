/**
 * Navigation module.
 * Handles active-link highlighting and smooth-scroll navigation.
 */

function setActiveLink(links, targetHref) {
  if (!Array.isArray(links)) {
    throw new TypeError('links must be an array');
  }
  links.forEach(link => {
    if (link.getAttribute('href') === targetHref) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

function getActiveLink(links) {
  if (!Array.isArray(links)) {
    throw new TypeError('links must be an array');
  }
  return links.find(link => link.classList.contains('active')) || null;
}

function buildNavItems(labels) {
  if (!Array.isArray(labels)) {
    throw new TypeError('labels must be an array');
  }
  return labels.map(label => ({
    label,
    href: `#${label.toLowerCase().replace(/\s+/g, '-')}`,
  }));
}

function isExternalLink(href) {
  if (typeof href !== 'string') return false;
  return /^https?:\/\//.test(href);
}

function filterNavItems(items, predicate) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function');
  }
  return items.filter(predicate);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    setActiveLink,
    getActiveLink,
    buildNavItems,
    isExternalLink,
    filterNavItems,
  };
}
