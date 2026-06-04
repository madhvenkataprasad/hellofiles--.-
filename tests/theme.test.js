const {
  DARK_CLASS,
  STORAGE_KEY,
  toggleTheme,
  isDark,
  applyTheme,
  getStoredTheme,
  storeTheme,
} = require('../src/theme');

function createBody() {
  return { classList: { _set: new Set(), add(c) { this._set.add(c); }, remove(c) { this._set.delete(c); }, toggle(c) { this._set.has(c) ? this._set.delete(c) : this._set.add(c); }, contains(c) { return this._set.has(c); } } };
}

function createStorage(initial = {}) {
  const store = { ...initial };
  return { getItem: k => (k in store ? store[k] : null), setItem: (k, v) => { store[k] = v; }, _store: store };
}

describe('theme module', () => {
  describe('constants', () => {
    test('DARK_CLASS equals "dark"', () => {
      expect(DARK_CLASS).toBe('dark');
    });

    test('STORAGE_KEY equals "theme"', () => {
      expect(STORAGE_KEY).toBe('theme');
    });
  });

  describe('toggleTheme', () => {
    test('adds dark class when not present', () => {
      const body = createBody();
      const result = toggleTheme(body);
      expect(result).toBe(true);
      expect(body.classList.contains('dark')).toBe(true);
    });

    test('removes dark class when present', () => {
      const body = createBody();
      body.classList.add('dark');
      const result = toggleTheme(body);
      expect(result).toBe(false);
      expect(body.classList.contains('dark')).toBe(false);
    });

    test('toggles back and forth', () => {
      const body = createBody();
      toggleTheme(body);
      toggleTheme(body);
      expect(isDark(body)).toBe(false);
      toggleTheme(body);
      expect(isDark(body)).toBe(true);
    });

    test('throws when bodyElement is null', () => {
      expect(() => toggleTheme(null)).toThrow('bodyElement is required');
    });

    test('throws when bodyElement is undefined', () => {
      expect(() => toggleTheme(undefined)).toThrow('bodyElement is required');
    });
  });

  describe('isDark', () => {
    test('returns false for light body', () => {
      const body = createBody();
      expect(isDark(body)).toBe(false);
    });

    test('returns true for dark body', () => {
      const body = createBody();
      body.classList.add('dark');
      expect(isDark(body)).toBe(true);
    });

    test('throws when bodyElement is null', () => {
      expect(() => isDark(null)).toThrow('bodyElement is required');
    });
  });

  describe('applyTheme', () => {
    test('applies dark theme', () => {
      const body = createBody();
      applyTheme(body, 'dark');
      expect(body.classList.contains('dark')).toBe(true);
    });

    test('applies light theme', () => {
      const body = createBody();
      body.classList.add('dark');
      applyTheme(body, 'light');
      expect(body.classList.contains('dark')).toBe(false);
    });

    test('applying light when already light is a no-op', () => {
      const body = createBody();
      applyTheme(body, 'light');
      expect(body.classList.contains('dark')).toBe(false);
    });

    test('applying dark twice keeps dark', () => {
      const body = createBody();
      applyTheme(body, 'dark');
      applyTheme(body, 'dark');
      expect(body.classList.contains('dark')).toBe(true);
    });

    test('throws when bodyElement is null', () => {
      expect(() => applyTheme(null, 'dark')).toThrow('bodyElement is required');
    });
  });

  describe('getStoredTheme', () => {
    test('returns stored theme', () => {
      const storage = createStorage({ theme: 'dark' });
      expect(getStoredTheme(storage)).toBe('dark');
    });

    test('returns null when no theme stored', () => {
      const storage = createStorage();
      expect(getStoredTheme(storage)).toBeNull();
    });

    test('returns null when storage is null', () => {
      expect(getStoredTheme(null)).toBeNull();
    });
  });

  describe('storeTheme', () => {
    test('stores the theme value', () => {
      const storage = createStorage();
      storeTheme(storage, 'dark');
      expect(storage._store.theme).toBe('dark');
    });

    test('overwrites previous value', () => {
      const storage = createStorage({ theme: 'dark' });
      storeTheme(storage, 'light');
      expect(storage._store.theme).toBe('light');
    });

    test('throws when storage is null', () => {
      expect(() => storeTheme(null, 'dark')).toThrow('storage is required');
    });
  });
});
