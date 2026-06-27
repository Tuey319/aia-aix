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

type Nav = NativeStackNavigationProp<any>;

const STEP = 4;

const SUMMARY_ROWS = [
  { label: 'วันที่รับบริการ', value: '12 มิ.ย. 2569', bold: false },
  { label: 'ผู้เอาประกัน', value: 'สมชาย มีทอง', bold: false },
  { label: 'ประเภทการเคลม', value: 'ค่ารักษาผู้ป่วยนอก', bold: false },
  { label: 'จำนวนเงิน', value: '฿3,200.00', bold: true },
  { label: 'บัญชีรับเงิน', value: 'ธ.ไทยพาณิชย์ xxx123', bold: false },
];

const DOCS_UPLOADED = [
  'ใบรับรองแพทย์',
  'ใบเสร็จค่ารักษา',
  'บัตรประชาชน/พาสปอร์ต',
];

export function ClaimReviewScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <ClaimStepHeader step={STEP} title="ตรวจสอบและส่งเคลม" />

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
            padding: cardPadding,
            gap: 0,
            ...cardShadow,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.bodyMd,
              color: colors.inkBody2,
              marginBottom: 12,
            }}
          >
            รายละเอียดการเคลม
          </Text>

          {SUMMARY_ROWS.map((row, index) => (
            <React.Fragment key={row.label}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingVertical: 11,
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.regular,
                    fontSize: fontSize.body,
                    color: colors.textSecondary,
                  }}
                >
                  {row.label}
                </Text>
                <Text
                  style={{
                    fontFamily: row.bold
                      ? fontFamily.jakarta.bold
                      : fontFamily.anuphan.medium,
                    fontSize: row.bold ? 16 : fontSize.bodyMd,
                    color: row.bold ? colors.ink : colors.ink2,
                  }}
                >
                  {row.value}
                </Text>
              </View>
              {index < SUMMARY_ROWS.length - 1 && (
                <View
                  style={{
                    height: 1,
                    backgroundColor: colors.hairline2,
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Docs Uploaded Card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: cardPadding,
            gap: 10,
            ...cardShadow,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.bodyMd,
              color: colors.inkBody2,
            }}
          >
            เอกสารที่อัปโหลด
          </Text>

          {DOCS_UPLOADED.map((doc) => (
            <View
              key={doc}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <MaterialIcons name="check-circle" size={18} color={colors.success} />
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.bodyMd,
                  color: colors.ink2,
                }}
              >
                {doc}
              </Text>
            </View>
          ))}
        </View>

        {/* T&C */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.caption,
            color: colors.textTertiary,
            lineHeight: 18,
            textAlign: 'center',
            paddingHorizontal: 8,
          }}
        >
          การส่งเคลมนี้ถือว่าคุณยืนยันว่าข้อมูลทั้งหมดถูกต้องและยอมรับเงื่อนไขการเคลมของ AIA
        </Text>
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
            // Simulate processing then navigate to success
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
            ส่งเคลม
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
