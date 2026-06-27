import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { colors, fontFamily, fontSize, radius } from '../tokens';
import { cardShadow } from '../tokens/shadows';

interface SectionGroupProps {
  label: string;
  children: React.ReactNode;
  style?: ViewStyle;
}

export function SectionGroup({ label, children, style }: SectionGroupProps) {
  return (
    <View style={style}>
      <Text
        style={{
          fontFamily: fontFamily.jakarta.bold,
          fontSize: 12,
          color: colors.textSecondary,
          textTransform: 'uppercase',
          letterSpacing: 0.6,
          marginBottom: 8,
          marginLeft: 4,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          backgroundColor: colors.card,
          borderRadius: radius.card,
          overflow: 'hidden',
          ...cardShadow,
        }}
      >
        {React.Children.map(children, (child, i) => (
          <View key={i}>
            {i > 0 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.hairline,
                  marginLeft: 50,
                }}
              />
            )}
            {child}
          </View>
        ))}
      </View>
    </View>
  );
}
