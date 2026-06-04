const {
  setActiveLink,
  getActiveLink,
  buildNavItems,
  isExternalLink,
  filterNavItems,
} = require('../src/navigation');

function createLink(href, active = false) {
  const classes = new Set(active ? ['active'] : []);
  return {
    getAttribute: attr => (attr === 'href' ? href : null),
    classList: {
      add(c) { classes.add(c); },
      remove(c) { classes.delete(c); },
      contains(c) { return classes.has(c); },
    },
  };
}

describe('navigation module', () => {
  describe('setActiveLink', () => {
    test('sets the matching link as active', () => {
      const links = [createLink('#home'), createLink('#about'), createLink('#contact')];
      setActiveLink(links, '#about');
      expect(links[0].classList.contains('active')).toBe(false);
      expect(links[1].classList.contains('active')).toBe(true);
      expect(links[2].classList.contains('active')).toBe(false);
    });

    test('removes active from previously active link', () => {
      const links = [createLink('#home', true), createLink('#about')];
      setActiveLink(links, '#about');
      expect(links[0].classList.contains('active')).toBe(false);
      expect(links[1].classList.contains('active')).toBe(true);
    });

    test('removes all active classes when no match', () => {
      const links = [createLink('#home', true), createLink('#about', true)];
      setActiveLink(links, '#nonexistent');
      expect(links[0].classList.contains('active')).toBe(false);
      expect(links[1].classList.contains('active')).toBe(false);
    });

    test('works with empty array', () => {
      expect(() => setActiveLink([], '#home')).not.toThrow();
    });

    test('throws for non-array input', () => {
      expect(() => setActiveLink('not-array', '#home')).toThrow(TypeError);
    });
  });

  describe('getActiveLink', () => {
    test('returns the active link', () => {
      const links = [createLink('#home'), createLink('#about', true)];
      expect(getActiveLink(links)).toBe(links[1]);
    });

    test('returns null when no active link', () => {
      const links = [createLink('#home'), createLink('#about')];
      expect(getActiveLink(links)).toBeNull();
    });

    test('returns first active when multiple active', () => {
      const links = [createLink('#home', true), createLink('#about', true)];
      expect(getActiveLink(links)).toBe(links[0]);
    });

    test('returns null for empty array', () => {
      expect(getActiveLink([])).toBeNull();
    });

    test('throws for non-array input', () => {
      expect(() => getActiveLink(null)).toThrow(TypeError);
    });
  });

  describe('buildNavItems', () => {
    test('builds items with correct labels and hrefs', () => {
      const result = buildNavItems(['Home', 'About', 'Contact']);
      expect(result).toEqual([
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'Contact', href: '#contact' },
      ]);
    });

    test('handles labels with spaces', () => {
      const result = buildNavItems(['My Page']);
      expect(result).toEqual([{ label: 'My Page', href: '#my-page' }]);
    });

    test('handles empty array', () => {
      expect(buildNavItems([])).toEqual([]);
    });

    test('handles single item', () => {
      const result = buildNavItems(['Gallery']);
      expect(result).toEqual([{ label: 'Gallery', href: '#gallery' }]);
    });

    test('throws for non-array input', () => {
      expect(() => buildNavItems('Home')).toThrow(TypeError);
    });
  });

  describe('isExternalLink', () => {
    test('returns true for http links', () => {
      expect(isExternalLink('http://example.com')).toBe(true);
    });

    test('returns true for https links', () => {
      expect(isExternalLink('https://example.com')).toBe(true);
    });

    test('returns false for hash links', () => {
      expect(isExternalLink('#section')).toBe(false);
    });

    test('returns false for relative paths', () => {
      expect(isExternalLink('/about')).toBe(false);
    });

    test('returns false for empty string', () => {
      expect(isExternalLink('')).toBe(false);
    });

    test('returns false for non-string input', () => {
      expect(isExternalLink(123)).toBe(false);
      expect(isExternalLink(null)).toBe(false);
      expect(isExternalLink(undefined)).toBe(false);
    });
  });

  describe('filterNavItems', () => {
    test('filters items by predicate', () => {
      const items = [
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
        { label: 'External', href: 'https://example.com' },
      ];
      const internal = filterNavItems(items, item => !isExternalLink(item.href));
      expect(internal).toEqual([
        { label: 'Home', href: '#home' },
        { label: 'About', href: '#about' },
      ]);
    });

    test('returns empty when nothing matches', () => {
      const items = [{ label: 'Home', href: '#home' }];
      expect(filterNavItems(items, () => false)).toEqual([]);
    });

    test('returns all when everything matches', () => {
      const items = [{ label: 'Home', href: '#home' }];
      expect(filterNavItems(items, () => true)).toEqual(items);
    });

    test('throws for non-array items', () => {
      expect(() => filterNavItems('not-array', () => true)).toThrow(TypeError);
    });

    test('throws for non-function predicate', () => {
      expect(() => filterNavItems([], 'not-fn')).toThrow(TypeError);
    });
  });
});
