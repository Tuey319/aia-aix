export const fontFamily = {
  jakarta: {
    regular: 'PlusJakartaSans_400Regular',
    medium: 'PlusJakartaSans_500Medium',
    semiBold: 'PlusJakartaSans_600SemiBold',
    bold: 'PlusJakartaSans_700Bold',
    extraBold: 'PlusJakartaSans_800ExtraBold',
  },
  anuphan: {
    regular: 'Anuphan_400Regular',
    medium: 'Anuphan_500Medium',
    semiBold: 'Anuphan_600SemiBold',
    bold: 'Anuphan_700Bold',
  },
  mono: {
    regular: 'IBMPlexMono_400Regular',
    medium: 'IBMPlexMono_500Medium',
    semiBold: 'IBMPlexMono_600SemiBold',
  },
} as const;

export const fontSize = {
  xs: 9,
  sm: 11,
  caption: 12,
  body: 13,
  bodyMd: 14,
  title: 15,
  titleLg: 17,
  hero: 34,
  heroLg: 42,
} as const;

export const lineHeight = {
  tight: 1.2,
  normal: 1.4,
  relaxed: 1.5,
} as const;
