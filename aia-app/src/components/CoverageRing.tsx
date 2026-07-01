import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { colors, fontFamily } from '../tokens';

interface Props {
  pct: number; // 0–100
  size?: number;
  thickness?: number;
  color?: string;
  trackColor?: string;
}

export function CoverageRing({
  pct,
  size = 76,
  thickness = 7,
  color = colors.info,
  trackColor = colors.hairline2,
}: Props) {
  const clamped = Math.min(Math.max(pct, 0), 100);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - clamped / 100);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={trackColor} strokeWidth={thickness} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={thickness}
          fill="none"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </Svg>
      <View style={{ position: 'absolute', alignItems: 'center' }}>
        <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 15, color: colors.ink2 }}>
          {Math.round(clamped)}%
        </Text>
      </View>
    </View>
  );
}
