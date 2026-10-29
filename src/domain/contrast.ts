export type ContrastCriterionId =
  | 'text-normal-aa'
  | 'text-large-aa'
  | 'text-normal-aaa'
  | 'text-large-aaa'
  | 'non-text-aa';

export const CONTRAST_CRITERIA: ReadonlyArray<{
  id: ContrastCriterionId;
  label: string;
  ratio: number;
}> = [
  { id: 'text-normal-aa', label: 'Text below large size · AA', ratio: 4.5 },
  { id: 'text-large-aa', label: 'Large text · AA', ratio: 3 },
  { id: 'text-normal-aaa', label: 'Text below large size · AAA', ratio: 7 },
  { id: 'text-large-aaa', label: 'Large text · AAA', ratio: 4.5 },
  { id: 'non-text-aa', label: 'UI components and meaningful graphics · AA', ratio: 3 },
];

type RGB = readonly [number, number, number];

export function parseHexColor(value: string): RGB | null {
  const hex = value.trim().replace(/^#/, '');
  if (!/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(hex)) return null;

  const expanded = hex.length === 3 ? [...hex].map((digit) => digit + digit).join('') : hex;
  return [
    Number.parseInt(expanded.slice(0, 2), 16),
    Number.parseInt(expanded.slice(2, 4), 16),
    Number.parseInt(expanded.slice(4, 6), 16),
  ];
}

export function isValidHexColor(value: string): boolean {
  return parseHexColor(value) !== null;
}

export function normalizeHexColor(value: string): string | null {
  if (!isValidHexColor(value)) return null;
  return `#${value.trim().replace(/^#/, '')}`;
}

function linearize(channel: number): number {
  const srgb = channel / 255;
  return srgb <= 0.04045 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
}

export function getRelativeLuminance(color: string): number | null {
  const rgb = parseHexColor(color);
  if (!rgb) return null;
  const [red, green, blue] = rgb.map(linearize);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

export function getContrastRatio(foreground: string, background: string): number | null {
  const foregroundLuminance = getRelativeLuminance(foreground);
  const backgroundLuminance = getRelativeLuminance(background);
  if (foregroundLuminance === null || backgroundLuminance === null) return null;

  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}
