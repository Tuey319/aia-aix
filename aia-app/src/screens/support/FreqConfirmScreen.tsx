import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, screenPadding } from '../../tokens';
import { primaryButtonShadow } from '../../tokens/shadows';
import { useAppStore } from '../../store';
import { useStrings } from '../../i18n';

type Nav = NativeStackNavigationProp<any>;

export function FreqConfirmScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const billingFrequency = useAppStore((s) => s.billingFrequency);
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  const FREQ_LABELS: Record<string, { label: string; amount: string }> = {
    monthly:   { label: language === 'en' ? 'Monthly' : 'รายเดือน',       amount: '฿4,250' },
    quarterly: { label: language === 'en' ? 'Quarterly' : 'ราย 3 เดือน', amount: '฿12,700' },
    annual:    { label: language === 'en' ? 'Annual' : 'รายปี',           amount: '฿49,800' },
  };

  const freq = FREQ_LABELS[billingFrequency] ?? FREQ_LABELS.monthly;

  function handleConfirm() {
    // pop back to the screen before ChangeFreq
    navigation.popToTop();
  }

  return (
    // Transparent overlay background
    <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'flex-end' }}>
      {/* Bottom sheet */}
      <View style={{
        backgroundColor: colors.card,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingHorizontal: screenPadding,
        paddingTop: 24,
        paddingBottom: insets.bottom + 24,
        gap: 20,
        alignItems: 'center',
      }}>
        {/* Drag handle */}
        <View style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: colors.hairline2, marginTop: -8 }} />

        {/* Icon */}
        <View style={{ width: 56, height: 56, borderRadius: 16, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' }}>
          <MaterialIcons name="event-repeat" size={28} color={colors.primary} />
        </View>

        {/* Title */}
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 18, color: colors.ink, textAlign: 'center' }}>
          {s.support.confirmTitle}
        </Text>

        {/* Detail */}
        <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.inkBody, textAlign: 'center', lineHeight: 22 }}>
          {language === 'en' ? 'Change billing frequency to ' : 'เปลี่ยนงวดการชำระเป็น'}
          {language === 'en' ? '' : ' '}
          <Text style={{ fontFamily: fontFamily.anuphan.bold, color: colors.ink }}>{freq.label} {freq.amount}</Text>
          {'\n'}{s.support.confirmNote}
        </Text>

        {/* Buttons */}
        <View style={{ width: '100%', gap: 10 }}>
          <TouchableOpacity onPress={handleConfirm} activeOpacity={0.82}
            style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}>
            <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>{s.common.confirm}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.7}
            style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 15, color: colors.textSecondary }}>{s.common.cancel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
