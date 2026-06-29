/**
 * AIA-style rotating arc spinner — matches Figma payProcessing / claimSubmitting.
 * Partial red arc on a light grey track, rotating continuously.
 */
import React, { useEffect, useRef } from 'react';
import { Animated, Platform, View } from 'react-native';
import { colors } from '../tokens';

interface Props {
  size?: number;
  color?: string;
  trackColor?: string;
  thickness?: number;
}

export function SpinnerArc({
  size = 56,
  color = colors.primary,
  trackColor = colors.hairline2,
  thickness = 3.5,
}: Props) {
  const spin = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spin, {
        toValue: 1,
        duration: 900,
        useNativeDriver: Platform.OS !== 'web',
      })
    ).start();
  }, []);

  const rotation = spin.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      {/* Track (full circle, light grey) */}
      <View
        style={{
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: thickness,
          borderColor: trackColor,
        }}
      />
      {/* Spinning arc (partial — top + right sides colored, others transparent) */}
      <Animated.View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: thickness,
          borderTopColor: color,
          borderRightColor: color,
          borderBottomColor: 'transparent',
          borderLeftColor: 'transparent',
          transform: [{ rotate: rotation }],
        }}
      />
    </View>
  );
}
