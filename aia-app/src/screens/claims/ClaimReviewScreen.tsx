import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  colors,
  fontFamily,
  fontSize,
  radius,
  screenPadding,
  cardGap,
  cardPadding,
} from '../../tokens';
import { ClaimStepHeader } from '../../components/ClaimStepHeader';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;

const STEP = 4;

interface SummaryRow {
  label: string;
  value: string;
}

export function ClaimReviewScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  const SUMMARY_ROWS: SummaryRow[] = [
    { label: language === 'en' ? 'Claim Type' : 'ประเภทการเคลม', value: language === 'en' ? 'Specialist Out-patient' : 'ผู้ป่วยนอกเฉพาะทาง' },
    { label: language === 'en' ? 'Treatment Date' : 'วันที่รักษา', value: '15 ส.ค. 2569' },
    { label: language === 'en' ? 'Claimant' : 'ผู้เคลม', value: language === 'en' ? 'Somchai Jaidee' : 'สมชาย ใจดี' },
    { label: language === 'en' ? 'Receipts' : 'ใบเสร็จ', value: language === 'en' ? '2 receipts' : '2 ใบ' },
    { label: language === 'en' ? 'Payout Account' : 'บัญชีรับเงิน', value: 'ธ.กรุงเทพ ••••45–6' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <ClaimStepHeader step={STEP} title={s.claims.reviewTitle} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 100,
          gap: cardGap,
        }}
      >
        {/* Summary Card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            paddingHorizontal: cardPadding,
            ...cardShadow,
          }}
        >
          {SUMMARY_ROWS.map((row, index) => (
            <React.Fragment key={row.label}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 13,
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.regular,
                    fontSize: fontSize.bodyMd,
                    color: colors.textSecondary,
                  }}
                >
                  {row.label}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.medium,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink2,
                  }}
                >
                  {row.value}
                </Text>
              </View>
              {index < SUMMARY_ROWS.length - 1 && (
                <View style={{ height: 1, backgroundColor: colors.hairline2 }} />
              )}
            </React.Fragment>
          ))}

          {/* Divider before amount */}
          <View style={{ height: 1, backgroundColor: colors.hairline2 }} />

          {/* Amount row — large bold */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingVertical: 16,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.bodyMd,
                color: colors.ink2,
              }}
            >
              {language === 'en' ? 'Amount Claimed' : 'ยอดที่ยื่นเคลม'}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 22,
                color: colors.ink,
                letterSpacing: -0.5,
              }}
            >
              ฿3,200.00
            </Text>
          </View>
        </View>

        {/* Green success note */}
        <View
          style={{
            backgroundColor: colors.successTint,
            borderRadius: radius.card,
            flexDirection: 'row',
            alignItems: 'center',
            padding: 14,
            gap: 10,
          }}
        >
          <MaterialIcons name="check-circle" size={20} color={colors.success} />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.body,
              color: colors.successDeep,
              flex: 1,
              lineHeight: 19,
            }}
          >
            {language === 'en' ? 'Information verified. Ready to submit.' : 'ตรวจสอบข้อมูลถูกต้องแล้ว พร้อมส่งเคลม'}
          </Text>
        </View>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View
        style={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 16,
          paddingTop: 12,
          backgroundColor: colors.screenBg,
          borderTopWidth: 1,
          borderTopColor: colors.hairline2,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => {
            navigation.navigate('ClaimSubmitting');
            setTimeout(() => navigation.navigate('ClaimSuccess'), 2500);
          }}
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.button,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            ...primaryButtonShadow,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: fontFamily.anuphan.bold,
              fontSize: 16,
            }}
          >
            {s.claims.submitBtn}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
