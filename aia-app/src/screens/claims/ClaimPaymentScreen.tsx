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

const STEP = 3;

export function ClaimPaymentScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

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
            alignItems: 'center',
            padding: 14,
            gap: 10,
          }}
        >
          <MaterialIcons name="info-outline" size={20} color={colors.info} />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.body,
              color: colors.infoDeep,
              flex: 1,
              lineHeight: 19,
            }}
          >
            เงินค่าเคลมจะโอนเข้าบัญชีที่ระบุไว้ในกรมธรรม์
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
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 14,
            }}
          >
            {/* Bank logo placeholder */}
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: '#4E2D85',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="account-balance" size={26} color={colors.white} />
            </View>

            <View style={{ flex: 1, gap: 3 }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.bodyMd,
                  color: colors.ink2,
                }}
              >
                ธนาคารไทยพาณิชย์
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.mono.regular,
                  fontSize: fontSize.bodyMd,
                  color: colors.inkBody2,
                  letterSpacing: 1,
                }}
              >
                xxx-x-xx123-x
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: colors.textSecondary,
                }}
              >
                Somchai Meethong
              </Text>
            </View>

            {/* Selected indicator */}
            <View
              style={{
                width: 26,
                height: 26,
                borderRadius: 13,
                backgroundColor: colors.successTint,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="check" size={16} color={colors.success} />
            </View>
          </View>

          {/* Confirmed label */}
          <View
            style={{
              backgroundColor: colors.successTint,
              borderRadius: 10,
              paddingVertical: 8,
              paddingHorizontal: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <MaterialIcons name="verified" size={16} color={colors.success} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.caption,
                color: colors.successDeep,
              }}
            >
              ยืนยันบัญชีนี้
            </Text>
          </View>

          {/* Edit link */}
          <TouchableOpacity
            activeOpacity={0.7}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.caption,
                color: colors.primary,
              }}
            >
              แก้ไขข้อมูลบัญชี
            </Text>
            <MaterialIcons name="arrow-forward" size={14} color={colors.primary} />
          </TouchableOpacity>
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
