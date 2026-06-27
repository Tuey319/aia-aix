import React from 'react';
import { Text as RNText, TextProps, TextStyle } from 'react-native';
import { colors, fontFamily, fontSize } from '../tokens';
import { useAppStore } from '../store';

type Variant =
  | 'screenTitle'
  | 'sectionLabel'
  | 'cardTitle'
  | 'body'
  | 'bodyMd'
  | 'caption'
  | 'heroNumber'
  | 'mono';

interface ATextProps extends TextProps {
  variant?: Variant;
  color?: string;
  isThai?: boolean;
}

const variantStyles: Record<Variant, TextStyle> = {
  screenTitle: {
    fontSize: fontSize.titleLg,
    fontFamily: fontFamily.jakarta.extraBold,
    color: colors.ink,
  },
  sectionLabel: {
    fontSize: fontSize.caption,
    fontFamily: fontFamily.jakarta.bold,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  cardTitle: {
    fontSize: fontSize.bodyMd,
    fontFamily: fontFamily.jakarta.bold,
    color: colors.ink2,
  },
  body: {
    fontSize: fontSize.body,
    fontFamily: fontFamily.jakarta.regular,
    color: colors.inkBody,
    lineHeight: fontSize.body * 1.45,
  },
  bodyMd: {
    fontSize: fontSize.bodyMd,
    fontFamily: fontFamily.jakarta.medium,
    color: colors.inkBody,
    lineHeight: fontSize.bodyMd * 1.45,
  },
  caption: {
    fontSize: fontSize.caption,
    fontFamily: fontFamily.jakarta.medium,
    color: colors.textSecondary,
    lineHeight: fontSize.caption * 1.4,
  },
  heroNumber: {
    fontSize: 36,
    fontFamily: fontFamily.jakarta.extraBold,
    color: colors.ink2,
    letterSpacing: -1.0,
  },
  mono: {
    fontSize: fontSize.xs,
    fontFamily: fontFamily.mono.semiBold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
};

export function Text({ variant = 'body', color, isThai, style, ...props }: ATextProps) {
  const lang = useAppStore((s) => s.language);
  const useThai = isThai ?? lang === 'th';

  const baseStyle = variantStyles[variant];
  const fontOverride = useThai && variant !== 'mono'
    ? { fontFamily: getFontForVariant(variant, true) }
    : {};

  return (
    <RNText
      style={[baseStyle, fontOverride, color ? { color } : undefined, style]}
      {...props}
    />
  );
}

function getFontForVariant(variant: Variant, thai: boolean): string {
  if (!thai) return variantStyles[variant].fontFamily as string;
  switch (variant) {
    case 'screenTitle': return fontFamily.anuphan.bold;
    case 'sectionLabel': return fontFamily.anuphan.bold;
    case 'cardTitle': return fontFamily.anuphan.bold;
    case 'heroNumber': return fontFamily.anuphan.bold;
    case 'body': return fontFamily.anuphan.regular;
    case 'bodyMd': return fontFamily.anuphan.medium;
    case 'caption': return fontFamily.anuphan.medium;
    default: return fontFamily.anuphan.regular;
  }
}
