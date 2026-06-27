export const colors = {
  primary: '#D31145',
  primaryDeep: '#9E0E34',
  primaryTint: '#FCEDF1',
  primaryTintDark: '#FBDCE6',

  ink: '#16161C',
  ink2: '#23232B',
  inkBody: '#33333B',
  inkBody2: '#52525C',
  textSecondary: '#8A8A95',
  textTertiary: '#B0B0BA',

  pageBg: '#E5E5EA',
  screenBg: '#F4F4F6',
  card: '#FFFFFF',
  hairline: '#F2F2F4',
  hairline2: '#ECECF1',

  success: '#1B9E5A',
  successDeep: '#0E5A35',
  successTint: '#EAF7F0',
  successDot: '#5BE3A0',

  amber: '#E8821A',
  amberDeep: '#B5670D',
  amberDeeper: '#8A5008',
  amberTint: '#FFF3E4',

  info: '#2A6FDB',
  infoDeep: '#1C4F9E',
  infoTint: '#EAF1FB',

  gold: '#C9A227',
  goldTint: '#FBF4DA',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof colors;
