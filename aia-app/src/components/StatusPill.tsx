import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { colors, fontFamily, radius } from '../tokens';

type PillVariant = 'amber' | 'success' | 'risk' | 'info' | 'mono' | 'red';

interface StatusPillProps {
  label: string;
  variant: PillVariant;
  style?: ViewStyle;
}

const pillConfig: Record<PillVariant, { bg: string; text: string }> = {
  amber: { bg: colors.amberTint, text: colors.amberDeep },
  success: { bg: colors.successTint, text: colors.successDeep },
  risk: { bg: colors.primaryTint, text: colors.primary },
  info: { bg: colors.infoTint, text: colors.infoDeep },
  mono: { bg: colors.amberTint, text: colors.amberDeeper },
  red: { bg: colors.primaryTint, text: colors.primary },
};

export function StatusPill({ label, variant, style }: StatusPillProps) {
  const config = pillConfig[variant];
  return (
    <View
      style={[
        {
          backgroundColor: config.bg,
          borderRadius: radius.pill,
          paddingHorizontal: 8,
          paddingVertical: 3,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      <Text
        style={{
          color: config.text,
          fontFamily: fontFamily.jakarta.semiBold,
          fontSize: 11,
          letterSpacing: 0.1,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
