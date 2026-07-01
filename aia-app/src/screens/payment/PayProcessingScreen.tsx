import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { SpinnerArc } from '../../components/SpinnerArc';
import { colors, fontFamily, fontSize, screenPadding } from '../../tokens';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';

export function PayProcessingScreen() {
  const language = useAppStore((state) => state.language);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top', 'bottom']}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: screenPadding, gap: 24 }}>

        {/* Rotating arc spinner */}
        <SpinnerArc size={64} color={colors.primary} thickness={3.5} />

        {/* Title + subtitle */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 20, color: colors.ink, textAlign: 'center' }}>
            {language === 'en' ? 'Processing payment...' : 'กำลังดำเนินการชำระเงิน'}
          </Text>
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 21 }}>
            {language === 'en' ? 'Please do not close this page.' : 'กรุณาอย่าปิดหน้านี้จนกว่าจะสำเร็จสิ้น'}
          </Text>
        </View>

        {/* Payment info chip */}
        <View style={{
          flexDirection: 'row', alignItems: 'center', gap: 8,
          backgroundColor: colors.card,
          borderRadius: 99,
          paddingHorizontal: 16, paddingVertical: 10,
          borderWidth: 1, borderColor: colors.hairline2,
        }}>
          <MaterialIcons name="lock" size={14} color={colors.textSecondary} />
          <Text style={{ fontFamily: fontFamily.jakarta.medium, fontSize: 13, color: colors.ink2 }}>
            ฿4,250.00 · PromptPay
          </Text>
        </View>
      </View>

      {/* Bottom security note */}
      <View style={{ paddingBottom: 32, alignItems: 'center' }}>
        <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.textTertiary }}>
          {language === 'en' ? 'Securely connected to your bank' : 'เชื่อมต่อกับธนาคารอย่างปลอดภัย'}
        </Text>
      </View>
    </SafeAreaView>
  );
}
