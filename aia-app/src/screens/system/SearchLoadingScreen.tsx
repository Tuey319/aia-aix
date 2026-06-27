import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';

function SkeletonRow({ pct }: { pct: number }) {
  return (
    <View
      style={{
        height: 18,
        width: `${pct}%` as any,
        backgroundColor: colors.hairline2,
        borderRadius: radius.pill,
      }}
    />
  );
}

export function SearchLoadingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top', 'bottom']}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: screenPadding,
          gap: 24,
        }}
      >
        {/* Spinner + label */}
        <View style={{ alignItems: 'center', gap: 14 }}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.medium,
              fontSize: fontSize.bodyMd,
              color: colors.textSecondary,
            }}
          >
            กำลังค้นหา...
          </Text>
        </View>

        {/* Skeleton rows */}
        <View
          style={{
            width: '100%',
            gap: cardGap,
            paddingTop: 8,
          }}
        >
          {/* Row 1 */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 16,
              gap: 10,
            }}
          >
            <SkeletonRow pct={75} />
            <SkeletonRow pct={55} />
          </View>

          {/* Row 2 */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 16,
              gap: 10,
            }}
          >
            <SkeletonRow pct={85} />
            <SkeletonRow pct={60} />
          </View>

          {/* Row 3 */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 16,
              gap: 10,
            }}
          >
            <SkeletonRow pct={65} />
            <SkeletonRow pct={45} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
