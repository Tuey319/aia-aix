import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { BarChart } from '../../components/BarChart';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Costs'>;

const FORECAST_DATA = [
  { label: '2569', value: 51000, color: colors.amber },
  { label: '2570', value: 54000, color: '#D9791A' },
  { label: '2571', value: 58000, color: '#C46A10' },
  { label: '2572', value: 63000, color: '#AE5A0E' },
  { label: '2573', value: 69000, color: colors.amberDeeper },
];

type BillingFreq = 'monthly' | 'quarterly' | 'annual';

interface FreqOption {
  id: BillingFreq;
  label: string;
  labelTh: string;
  perPeriod: number;
  note?: string;
  badge?: string;
  saving?: string;
}

const FREQ_OPTIONS: FreqOption[] = [
  {
    id: 'monthly',
    label: 'Monthly',
    labelTh: 'รายเดือน',
    perPeriod: 4250,
    note: '12 งวด/ปี',
    badge: 'ถูกสุด',
  },
  {
    id: 'quarterly',
    label: 'Quarterly',
    labelTh: 'ราย 3 เดือน',
    perPeriod: 12623,
    note: 'ประหยัด 1% · ฿510/ปี',
    saving: '฿510/ปี',
  },
  {
    id: 'annual',
    label: 'Annual',
    labelTh: 'รายปี',
    perPeriod: 49470,
    note: 'ประหยัด 3% · ฿1,530/ปี',
    badge: 'คุ้มสุด',
    saving: '฿1,530/ปี',
  },
];

export function CostsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const { billingFrequency, setBillingFrequency } = useAppStore((s) => ({
    billingFrequency: s.billingFrequency,
    setBillingFrequency: s.setBillingFrequency,
  }));

  const [localFreq, setLocalFreq] = useState<BillingFreq>(billingFrequency);

  function handleSave() {
    setBillingFrequency(localFreq);
    navigation.goBack();
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: 16,
          gap: 8,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: 17,
            color: colors.ink,
          }}
        >
          ค่าใช้จ่าย & การผ่อน
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 100,
          gap: cardGap,
        }}
      >
        {/* 5-Year Forecast Chart */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 18,
            gap: 14,
            ...cardShadow,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: 14,
                color: colors.ink2,
              }}
            >
              แนวโน้มเบี้ย 5 ปี
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.mono.regular,
                fontSize: 9,
                color: colors.textSecondary,
                letterSpacing: 0.8,
                textTransform: 'uppercase',
              }}
            >
              บาท
            </Text>
          </View>

          <BarChart
            data={FORECAST_DATA}
            height={100}
            formatValue={(v) => `฿${(v / 1000).toFixed(0)}k`}
            labelColor={colors.amberDeep}
          />

          <View
            style={{
              backgroundColor: colors.amberTint,
              borderRadius: 10,
              padding: 11,
              flexDirection: 'row',
              gap: 8,
              alignItems: 'flex-start',
            }}
          >
            <MaterialIcons name="trending-up" size={16} color={colors.amberDeep} style={{ marginTop: 1 }} />
            <Text
              style={{
                flex: 1,
                fontFamily: fontFamily.anuphan.regular,
                fontSize: 12,
                color: colors.amberDeeper,
                lineHeight: 18,
              }}
            >
              เบี้ยประกันมีแนวโน้มเพิ่มขึ้นตามอายุและต้นทุนทางการแพทย์ —
              วางแผนงบล่วงหน้าช่วยให้จัดการได้ง่ายขึ้น
            </Text>
          </View>
        </View>

        {/* Billing Frequency Selector */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          <View style={{ paddingHorizontal: 16, paddingTop: 16, paddingBottom: 10 }}>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 11,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}
            >
              เลือกงวดการชำระ
            </Text>
          </View>

          {FREQ_OPTIONS.map((opt, i) => {
            const isSelected = localFreq === opt.id;
            return (
              <View key={opt.id}>
                {i > 0 && (
                  <View style={{ height: 1, backgroundColor: colors.hairline, marginLeft: 56 }} />
                )}
                <TouchableOpacity
                  onPress={() => setLocalFreq(opt.id)}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 16,
                    gap: 14,
                    backgroundColor: isSelected ? colors.primaryTint : 'transparent',
                  }}
                >
                  {/* Radio */}
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 2,
                      borderColor: isSelected ? colors.primary : colors.textTertiary,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {isSelected && (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: colors.primary,
                        }}
                      />
                    )}
                  </View>

                  <View style={{ flex: 1, gap: 3 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                      <Text
                        style={{
                          fontFamily: fontFamily.anuphan.bold,
                          fontSize: 14,
                          color: isSelected ? colors.primaryDeep : colors.ink2,
                        }}
                      >
                        {opt.labelTh}
                      </Text>
                      {opt.badge && (
                        <View
                          style={{
                            backgroundColor: colors.success,
                            borderRadius: 99,
                            paddingHorizontal: 7,
                            paddingVertical: 2,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: fontFamily.jakarta.bold,
                              fontSize: 10,
                              color: colors.white,
                            }}
                          >
                            {opt.badge}
                          </Text>
                        </View>
                      )}
                    </View>
                    {opt.note && (
                      <Text
                        style={{
                          fontFamily: fontFamily.anuphan.regular,
                          fontSize: 12,
                          color: opt.saving ? colors.success : colors.textSecondary,
                        }}
                      >
                        {opt.note}
                      </Text>
                    )}
                  </View>

                  <Text
                    style={{
                      fontFamily: fontFamily.jakarta.bold,
                      fontSize: 15,
                      color: isSelected ? colors.primary : colors.ink2,
                    }}
                  >
                    ฿{opt.perPeriod.toLocaleString('en-US')}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}

          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              backgroundColor: colors.screenBg,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: 11,
                color: colors.textSecondary,
                lineHeight: 16,
              }}
            >
              * การเปลี่ยนงวดชำระจะมีผลในรอบบิลถัดไป
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Footer */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.screenBg,
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: insets.bottom + 12,
          borderTopWidth: 1,
          borderTopColor: colors.hairline,
        }}
      >
        <TouchableOpacity
          onPress={handleSave}
          activeOpacity={0.82}
          style={{
            backgroundColor: localFreq !== billingFrequency ? colors.primary : colors.textTertiary,
            borderRadius: radius.button,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            ...(localFreq !== billingFrequency ? primaryButtonShadow : {}),
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: fontFamily.anuphan.bold,
              fontSize: 16,
            }}
          >
            บันทึกงวดการชำระ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
