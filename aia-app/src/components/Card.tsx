import React from 'react';
import { View, ViewStyle } from 'react-native';
import { colors, radius } from '../tokens';
import { shadows } from '../tokens/shadows';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  radius?: number;
  dark?: boolean;
  elevation?: 'xs' | 'sm' | 'md' | 'lg';
  bordered?: boolean;
}

export function Card({
  children,
  style,
  padding = 16,
  radius: r = 18,
  dark = false,
  elevation = 'md',
  bordered = false,
}: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: dark ? colors.ink : colors.card,
          borderRadius: r,
          padding,
          borderWidth: bordered ? 1 : 0,
          borderColor: bordered ? colors.hairline : undefined,
          ...shadows[elevation],
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}
