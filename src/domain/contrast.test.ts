import { describe, expect, it } from 'vitest';
import { CONTRAST_CRITERIA, getContrastRatio, getRelativeLuminance, isValidHexColor, normalizeHexColor, parseHexColor } from './contrast';

describe('WCAG contrast arithmetic', () => {
  it('parses shorthand and full opaque hex colors', () => {
    expect(parseHexColor('#abc')).toEqual([170, 187, 204]);
    expect(parseHexColor(' #00FF10 ')).toEqual([0, 255, 16]);
    expect(isValidHexColor('#12g')).toBe(false);
    expect(isValidHexColor('#11223344')).toBe(false);
    expect(normalizeHexColor('abcdef')).toBe('#abcdef');
    expect(normalizeHexColor('nope')).toBeNull();
  });

  it('uses sRGB relative luminance and produces the 21:1 black and white ratio', () => {
    expect(getRelativeLuminance('#000000')).toBe(0);
    expect(getRelativeLuminance('#ffffff')).toBeCloseTo(1, 10);
    expect(getContrastRatio('#000', '#fff')).toBeCloseTo(21, 10);
  });

  it('is symmetric, rejects invalid colors and distinguishes a near-threshold pair', () => {
    expect(getContrastRatio('#767676', '#fff')).toBeCloseTo(4.542, 3);
    expect(getContrastRatio('#fff', '#767676')).toBe(getContrastRatio('#767676', '#fff'));
    expect(getContrastRatio('transparent', '#fff')).toBeNull();
  });

  it('exposes the WCAG text and non-text comparison thresholds', () => {
    expect(CONTRAST_CRITERIA.map(({ id, ratio }) => [id, ratio])).toEqual([
      ['text-normal-aa', 4.5],
      ['text-large-aa', 3],
      ['text-normal-aaa', 7],
      ['text-large-aaa', 4.5],
      ['non-text-aa', 3],
    ]);
  });
});
