import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
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

const STEP = 3;

export function ClaimPaymentScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [bank, setBank] = useState('ธนาคารกรุงเทพ');
  const [accountNo, setAccountNo] = useState('888-0-12345-6');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <ClaimStepHeader step={STEP} title="ข้อมูลการรับเงิน" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 100,
          gap: cardGap,
        }}
      >
        {/* Info Note */}
        <View
          style={{
            backgroundColor: colors.infoTint,
            borderRadius: radius.card,
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: 12,
            gap: 10,
          }}
        >
          <MaterialIcons name="info-outline" size={18} color={colors.info} style={{ marginTop: 1 }} />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.infoDeep,
              flex: 1,
              lineHeight: 18,
            }}
          >
            เงินจะโอนเข้าบัญชีธนาคารที่ระบุในกรมธรรม์ของคุณเท่านั้น
          </Text>
        </View>

        {/* Bank Account Card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: cardPadding,
            gap: 14,
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
            ข้อมูลบัญชี (เจ้าของกรมธรรม์)
          </Text>

          {/* Bank dropdown */}
          <View style={{ gap: 6 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textSecondary,
              }}
            >
              ธนาคาร
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.screenBg,
                borderRadius: radius.input,
                borderWidth: 1,
                borderColor: colors.hairline2,
                paddingHorizontal: 14,
                paddingVertical: 12,
              }}
            >
              <Text
                style={{
                  flex: 1,
                  fontFamily: fontFamily.anuphan.medium,
                  fontSize: fontSize.bodyMd,
                  color: colors.ink,
                }}
              >
                {bank}
              </Text>
              <MaterialIcons name="expand-more" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
          </View>

          {/* Account number */}
          <View style={{ gap: 6 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textSecondary,
              }}
            >
              เลขบัญชี
            </Text>
            <TextInput
              value={accountNo}
              onChangeText={setAccountNo}
              keyboardType="numeric"
              style={{
                fontFamily: fontFamily.mono.regular,
                fontSize: fontSize.bodyMd,
                color: colors.ink,
                backgroundColor: colors.screenBg,
                borderRadius: radius.input,
                borderWidth: 1,
                borderColor: colors.hairline2,
                paddingHorizontal: 14,
                paddingVertical: 12,
                letterSpacing: 1,
              }}
              placeholderTextColor={colors.textTertiary}
            />
          </View>
        </View>

        {/* My Info Card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            paddingHorizontal: cardPadding,
            ...cardShadow,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.bodyMd,
              color: colors.inkBody2,
              paddingVertical: 14,
            }}
          >
            ข้อมูลของฉัน
          </Text>
          <View style={{ height: 1, backgroundColor: colors.hairline2 }} />

          <InfoRow label="เลขลูกค้า" value="910 1231 01123" />
          <View style={{ height: 1, backgroundColor: colors.hairline2 }} />
          <InfoRow label="อีเมล" value="somchai@gmail.com" />
          <View style={{ height: 1, backgroundColor: colors.hairline2 }} />
          <InfoRow label="แฮนด์โฟน" value="081 234 5678" />
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
          onPress={() => navigation.navigate('ClaimReview')}
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
            ถัดไป
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
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
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily.anuphan.medium,
          fontSize: fontSize.bodyMd,
          color: colors.ink2,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
