import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SpinnerArc } from '../../components/SpinnerArc';
import { colors, fontFamily, screenPadding, radius } from '../../tokens';

export function ClaimSubmittingScreen() {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animate progress bar to ~70% over 3s (simulating 3-doc upload)
    Animated.timing(progress, {
      toValue: 0.72,
      duration: 3200,
      useNativeDriver: false, // width animation needs JS driver
    }).start();
  }, []);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top', 'bottom']}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: screenPadding, gap: 24 }}>

        {/* Rotating arc spinner */}
        <SpinnerArc size={64} color={colors.primary} thickness={3.5} />

        {/* Title + subtitle */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 20, color: colors.ink, textAlign: 'center' }}>
            กำลังส่งเคลมของคุณ
          </Text>
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 21 }}>
            ระบบกำลังอัปโหลดเอกสาร 3 รายการ
          </Text>
        </View>

        {/* Progress bar */}
        <View style={{ width: '100%', maxWidth: 240 }}>
          {/* Track */}
          <View style={{ height: 4, backgroundColor: colors.hairline2, borderRadius: 2, overflow: 'hidden' }}>
            {/* Fill */}
            <Animated.View style={{ height: 4, width: barWidth, backgroundColor: colors.primary, borderRadius: 2 }} />
          </View>
        </View>
      </View>

      {/* Bottom note */}
      <View style={{ paddingBottom: 32, alignItems: 'center' }}>
        <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.textTertiary }}>
          โปรดอย่าปิดแอปจนกว่าจะอัปโหลดเสร็จ
        </Text>
      </View>
    </SafeAreaView>
  );
}
