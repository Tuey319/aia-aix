import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { useAppStore } from '../../store';
import { useStrings } from '../../i18n';

type Nav = NativeStackNavigationProp<any>;
type BillingFreq = 'monthly' | 'quarterly' | 'annual';

interface FreqOption {
  id: BillingFreq;
  label: string;
  amount: number;
  note: string;
  badge?: string;
  isCurrent?: boolean;
}

export function ChangeFreqScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { billingFrequency, setBillingFrequency } = useAppStore();
  const [selected, setSelected] = useState<BillingFreq>(billingFrequency);
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  // Screenshot order: annual (top) → quarterly → monthly (selected/current, bottom)
  const OPTIONS: FreqOption[] = [
    { id: 'annual',    label: language === 'en' ? 'Annual' : 'รายปี',        amount: 49800, note: language === 'en' ? 'Best savings · 2% discount' : 'ประหยัดสูงสุด · ส่วนลด 2%' },
    { id: 'quarterly', label: language === 'en' ? 'Quarterly' : 'ราย 3 เดือน', amount: 12700, note: language === 'en' ? '4 installments/year' : '4 งวด/ปี' },
    { id: 'monthly',   label: language === 'en' ? 'Monthly' : 'รายเดือน',    amount: 4250,  note: language === 'en' ? '12 installments/year' : '12 งวด/ปี', badge: language === 'en' ? 'Current' : 'ปัจจุบัน' },
  ];

  function handleSave() {
    setBillingFrequency(selected);
    navigation.navigate('FreqConfirm');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>{s.support.changeFreqTitle}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 100, gap: cardGap }}>

        <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.textSecondary }}>
          {language === 'en' ? 'Choose a premium payment frequency that suits you.' : 'เลือกความถี่ในการชำระเบี้ยประกันที่เหมาะกับคุณ'}
        </Text>

        {OPTIONS.map((opt) => {
          const isSelected = selected === opt.id;
          return (
            <TouchableOpacity key={opt.id} onPress={() => setSelected(opt.id)} activeOpacity={0.85}
              style={{ backgroundColor: colors.card, borderRadius: radius.card, borderWidth: 2, borderColor: isSelected ? colors.primary : colors.hairline2, ...cardShadow }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, gap: 14 }}>
                {/* Radio */}
                <View style={{ width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: isSelected ? colors.primary : colors.textTertiary, alignItems: 'center', justifyContent: 'center' }}>
                  {isSelected && <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: colors.primary }} />}
                </View>

                <View style={{ flex: 1, gap: 3 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                    <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 15, color: isSelected ? colors.primaryDeep : colors.ink2 }}>
                      {opt.label}
                    </Text>
                    {opt.badge && (
                      <View style={{ backgroundColor: isSelected ? colors.primary : colors.hairline2, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2 }}>
                        <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 10, color: isSelected ? colors.white : colors.textSecondary }}>
                          {opt.badge}
                        </Text>
                      </View>
                    )}
                  </View>
                  <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: isSelected ? colors.primary : colors.textSecondary }}>
                    {opt.note}
                  </Text>
                </View>

                <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 16, color: isSelected ? colors.primary : colors.ink }}>
                  ฿{opt.amount.toLocaleString('en-US')}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.screenBg, paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: insets.bottom + 16, borderTopWidth: 1, borderTopColor: colors.hairline }}>
        <TouchableOpacity onPress={handleSave} activeOpacity={0.82}
          style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}>
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>{s.common.save}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
