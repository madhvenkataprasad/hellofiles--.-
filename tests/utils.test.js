const {
  capitalize,
  slugify,
  debounce,
  clamp,
  formatGreeting,
} = require('../src/utils');

describe('utils module', () => {
  describe('capitalize', () => {
    test('capitalizes first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    test('keeps already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    test('handles single character', () => {
      expect(capitalize('a')).toBe('A');
    });

    test('returns empty string unchanged', () => {
      expect(capitalize('')).toBe('');
    });

    test('handles string with numbers', () => {
      expect(capitalize('3apples')).toBe('3apples');
    });

    test('throws for non-string', () => {
      expect(() => capitalize(42)).toThrow(TypeError);
      expect(() => capitalize(null)).toThrow(TypeError);
    });
  });

  describe('slugify', () => {
    test('converts basic string to slug', () => {
      expect(slugify('Hello World')).toBe('hello-world');
    });

    test('handles multiple spaces', () => {
      expect(slugify('hello   world')).toBe('hello-world');
    });

    test('strips special characters', () => {
      expect(slugify('Hello, World!')).toBe('hello-world');
    });

    test('trims whitespace', () => {
      expect(slugify('  hello  ')).toBe('hello');
    });

    test('handles underscores', () => {
      expect(slugify('hello_world')).toBe('hello-world');
    });

    test('handles already slugified string', () => {
      expect(slugify('hello-world')).toBe('hello-world');
    });

    test('handles empty string', () => {
      expect(slugify('')).toBe('');
    });

    test('throws for non-string', () => {
      expect(() => slugify(123)).toThrow(TypeError);
    });
  });

  describe('debounce', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('delays execution', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);
      debounced();
      expect(fn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('resets timer on subsequent calls', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);
      debounced();
      jest.advanceTimersByTime(50);
      debounced();
      jest.advanceTimersByTime(50);
      expect(fn).not.toHaveBeenCalled();
      jest.advanceTimersByTime(50);
      expect(fn).toHaveBeenCalledTimes(1);
    });

    test('passes arguments to the original function', () => {
      const fn = jest.fn();
      const debounced = debounce(fn, 100);
      debounced('a', 'b');
      jest.advanceTimersByTime(100);
      expect(fn).toHaveBeenCalledWith('a', 'b');
    });

    test('preserves context (this)', () => {
      const obj = {
        value: 42,
        fn: jest.fn(function () { return this.value; }),
      };
      obj.debounced = debounce(obj.fn, 100);
      obj.debounced();
      jest.advanceTimersByTime(100);
      expect(obj.fn).toHaveBeenCalled();
    });

    test('throws for non-function', () => {
      expect(() => debounce('not-fn', 100)).toThrow(TypeError);
    });

    test('throws for negative delay', () => {
      expect(() => debounce(() => {}, -1)).toThrow(TypeError);
    });

    test('throws for non-number delay', () => {
      expect(() => debounce(() => {}, 'fast')).toThrow(TypeError);
    });
  });

  describe('clamp', () => {
    test('clamps below min', () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });

    test('clamps above max', () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });

    test('returns value when in range', () => {
      expect(clamp(5, 0, 10)).toBe(5);
    });

    test('returns min when value equals min', () => {
      expect(clamp(0, 0, 10)).toBe(0);
    });

    test('returns max when value equals max', () => {
      expect(clamp(10, 0, 10)).toBe(10);
    });

    test('handles negative ranges', () => {
      expect(clamp(-3, -5, -1)).toBe(-3);
    });

    test('handles min equal to max', () => {
      expect(clamp(5, 3, 3)).toBe(3);
    });

    test('throws when min > max', () => {
      expect(() => clamp(5, 10, 0)).toThrow(RangeError);
    });

    test('throws for non-number arguments', () => {
      expect(() => clamp('5', 0, 10)).toThrow(TypeError);
    });
  });

  describe('formatGreeting', () => {
    test('formats greeting with name', () => {
      expect(formatGreeting('alice')).toBe('Hello, Alice!');
    });

    test('capitalizes name', () => {
      expect(formatGreeting('bob')).toBe('Hello, Bob!');
    });

    test('trims whitespace', () => {
      expect(formatGreeting('  carol  ')).toBe('Hello, Carol!');
    });

    test('returns generic greeting for empty string', () => {
      expect(formatGreeting('')).toBe('Hello!');
    });

    test('returns generic greeting for whitespace-only string', () => {
      expect(formatGreeting('   ')).toBe('Hello!');
    });

    test('handles already capitalized name', () => {
      expect(formatGreeting('Dave')).toBe('Hello, Dave!');
    });

    test('throws for non-string', () => {
      expect(() => formatGreeting(42)).toThrow(TypeError);
    });
  });
});
