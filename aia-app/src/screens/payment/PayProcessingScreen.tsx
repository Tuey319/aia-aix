import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fontFamily } from '../../tokens';

export function PayProcessingScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg, alignItems: 'center', justifyContent: 'center', gap: 16 }}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 18, color: colors.ink2 }}>กำลังดำเนินการ...</Text>
      <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.textSecondary, textAlign: 'center', paddingHorizontal: 40 }}>
        กรุณาอย่าปิดแอปหรือกดย้อนกลับ
      </Text>
    </SafeAreaView>
  );
}
