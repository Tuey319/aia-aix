import React, { useRef } from 'react';
import { Animated, Pressable, View, Text, ViewStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, fontSize } from '../tokens';

interface ListRowProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  right?: React.ReactNode;
  style?: ViewStyle;
  showChevron?: boolean;
  badge?: string;
  iconColor?: string;
}

export function ListRow({
  icon,
  title,
  subtitle,
  onPress,
  right,
  style,
  showChevron = true,
  badge,
  iconColor,
}: ListRowProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  function onPressIn() {
    Animated.timing(opacity, { toValue: 0.7, duration: 80, useNativeDriver: true }).start();
  }
  function onPressOut() {
    Animated.timing(opacity, { toValue: 1, duration: 150, useNativeDriver: true }).start();
  }

  const inner = (
    <Animated.View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 14,
          paddingHorizontal: 16,
          gap: 12,
          opacity: onPress ? opacity : 1,
        },
        style,
      ]}
    >
      {icon && (
        <MaterialIcons name={icon} size={22} color={iconColor ?? colors.primary} />
      )}
      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.bodyMd,
              color: colors.ink2,
            }}
          >
            {title}
          </Text>
          {badge && (
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 99,
                paddingHorizontal: 6,
                paddingVertical: 1,
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.jakarta.bold,
                  fontSize: 9,
                  letterSpacing: 0.2,
                }}
              >
                {badge}
              </Text>
            </View>
          )}
        </View>
        {subtitle && (
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
              lineHeight: fontSize.caption * 1.4,
            }}
          >
            {subtitle}
          </Text>
        )}
      </View>
      {right}
      {showChevron && onPress && (
        <MaterialIcons name="chevron-right" size={20} color={colors.textTertiary} />
      )}
    </Animated.View>
  );

  if (!onPress) return inner;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      android_ripple={{ color: 'rgba(0,0,0,0.06)', borderless: false }}
    >
      {inner}
    </Pressable>
  );
}
