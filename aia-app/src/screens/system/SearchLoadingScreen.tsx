import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';

// Widths of skeleton lines (mimics 3 FAQ result cards)
const SKELETON_ROWS = [
  [0.85, 0.55],  // card 1: title + subtitle
  [0.70, 0.40],  // card 2
  [0.90, 0.60],  // card 3
];

function SkeletonCard({ shimmerOpacity }: { shimmerOpacity: Animated.AnimatedInterpolation<number> }) {
  return (
    <Animated.View
      style={{
        backgroundColor: colors.card,
        borderRadius: radius.card,
        padding: 16,
        gap: 10,
        opacity: shimmerOpacity,
      }}
    >
      {SKELETON_ROWS[0].map((w, i) => (
        <View
          key={i}
          style={{
            height: i === 0 ? 14 : 11,
            width: `${w * 100}%` as any,
            backgroundColor: colors.hairline2,
            borderRadius: 6,
          }}
        />
      ))}
    </Animated.View>
  );
}

export function SearchLoadingScreen() {
  const shimmer = useRef(new Animated.Value(0.45)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 0.9, duration: 800, useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(shimmer, { toValue: 0.45, duration: 800, useNativeDriver: Platform.OS !== 'web' }),
      ])
    ).start();
  }, []);

  const WIDTHS = [
    [0.85, 0.55],
    [0.70, 0.42],
    [0.90, 0.60],
    [0.65, 0.38],
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Search bar (filled, non-interactive) */}
      <View style={{ paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 10 }}>
        <View style={{
          flexDirection: 'row', alignItems: 'center', gap: 10,
          backgroundColor: colors.card,
          borderRadius: radius.input,
          borderWidth: 1, borderColor: colors.hairline2,
          paddingHorizontal: 14, paddingVertical: 12,
        }}>
          <MaterialIcons name="search" size={18} color={colors.textTertiary} />
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: fontSize.body, color: colors.inkBody2, flex: 1 }}>
            เปลี่ยนรอบ
          </Text>
        </View>
      </View>

      {/* "กำลังค้นหา..." with small spinner */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: screenPadding, paddingBottom: 14 }}>
        <Animated.View style={{ opacity: shimmer }}>
          <View style={{
            width: 14, height: 14, borderRadius: 7,
            borderWidth: 2,
            borderTopColor: colors.primary,
            borderRightColor: colors.primary,
            borderBottomColor: 'transparent',
            borderLeftColor: 'transparent',
          }} />
        </Animated.View>
        <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: fontSize.body, color: colors.textSecondary }}>
          กำลังค้นหา...
        </Text>
      </View>

      {/* Skeleton rows */}
      <View style={{ paddingHorizontal: screenPadding, gap: 10 }}>
        {WIDTHS.map((widths, cardIdx) => (
          <Animated.View
            key={cardIdx}
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 16,
              gap: 10,
              opacity: shimmer,
            }}
          >
            {widths.map((w, lineIdx) => (
              <View
                key={lineIdx}
                style={{
                  height: lineIdx === 0 ? 14 : 11,
                  width: `${w * 100}%` as any,
                  backgroundColor: colors.hairline2,
                  borderRadius: 6,
                }}
              />
            ))}
          </Animated.View>
        ))}
      </View>
    </SafeAreaView>
  );
}
