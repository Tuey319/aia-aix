import React, { useRef } from 'react';
import { Animated, Pressable, Text, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { colors, radius, fontFamily, fontSize } from '../tokens';
import { primaryButtonShadow } from '../tokens/shadows';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export function PrimaryButton({
  title,
  onPress,
  style,
  textStyle,
  loading = false,
  disabled = false,
  variant = 'primary',
  size = 'lg',
}: PrimaryButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const isPrimary = variant === 'primary';
  const isOutline = variant === 'outline';
  const height = size === 'sm' ? 36 : size === 'md' ? 44 : 52;
  const textSize = size === 'sm' ? fontSize.body : size === 'md' ? fontSize.bodyMd : fontSize.title;

  function onPressIn() {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 50, bounciness: 0 }).start();
  }
  function onPressOut() {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 30, bounciness: 4 }).start();
  }

  return (
    <Animated.View style={{ transform: [{ scale }], ...(isPrimary ? primaryButtonShadow : {}) }}>
      <Pressable
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        disabled={disabled || loading}
        android_ripple={{ color: 'rgba(255,255,255,0.25)', borderless: false }}
        style={[
          {
            height,
            borderRadius: radius.button,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 20,
            backgroundColor: isPrimary ? colors.primary : 'transparent',
            borderWidth: isOutline ? 1.5 : 0,
            borderColor: isOutline ? colors.primary : undefined,
            opacity: disabled ? 0.48 : 1,
          },
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={isPrimary ? colors.white : colors.primary} />
        ) : (
          <Text
            style={[
              {
                color: isPrimary ? colors.white : colors.primary,
                fontFamily: fontFamily.jakarta.bold,
                fontSize: textSize,
                letterSpacing: 0.1,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        )}
      </Pressable>
    </Animated.View>
  );
}
