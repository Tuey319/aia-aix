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
} from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

export function PayCardScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [autoPaySelected, setAutoPaySelected] = useState<'yes' | 'no'>('yes');

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
            fontSize: fontSize.titleLg,
            color: colors.ink,
            flex: 1,
          }}
        >
          ชำระเงิน
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} hitSlop={16}>
          <MaterialIcons name="close" size={22} color={colors.ink} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 120,
          gap: cardGap,
        }}
      >
        {/* Step counter */}
        <Text
          style={{
            fontFamily: fontFamily.jakarta.semiBold,
            fontSize: fontSize.caption,
            color: colors.textSecondary,
            letterSpacing: 0.3,
            marginBottom: 4,
          }}
        >
          6a/7
        </Text>

        {/* Card brand icons */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 16,
            gap: 12,
            ...cardShadow,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            {/* VISA */}
            <View
              style={{
                backgroundColor: '#1A1F71',
                borderRadius: 6,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.bold,
                  fontSize: 14,
                  color: colors.white,
                  letterSpacing: 1,
                }}
              >
                VISA
              </Text>
            </View>
            {/* Mastercard */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: '#EB001B',
                  opacity: 0.9,
                }}
              />
              <View
                style={{
                  width: 26,
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: '#F79E1B',
                  marginLeft: -10,
                  opacity: 0.9,
                }}
              />
            </View>
            {/* JCB */}
            <View
              style={{
                backgroundColor: '#003087',
                borderRadius: 6,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.bold,
                  fontSize: 14,
                  color: colors.white,
                  letterSpacing: 1,
                }}
              >
                JCB
              </Text>
            </View>
          </View>
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
            }}
          >
            รับบัตรของแบบ Visa, Mastercard และ JCB เท่านั้น
          </Text>
        </View>

        {/* Card form */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 16,
            gap: 14,
            ...cardShadow,
          }}
        >
          {/* Card number */}
          <View style={{ gap: 6 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.body,
                color: colors.inkBody,
              }}
            >
              เลขบัตรเครดิต
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.hairline2,
                borderRadius: radius.input,
                paddingHorizontal: 12,
                height: 48,
                gap: 8,
              }}
            >
              <TextInput
                placeholder="0000 0000 0000 0000"
                placeholderTextColor={colors.textTertiary}
                keyboardType="numeric"
                maxLength={19}
                style={{
                  flex: 1,
                  fontFamily: fontFamily.jakarta.regular,
                  fontSize: fontSize.bodyMd,
                  color: colors.ink,
                }}
              />
              <MaterialIcons name="credit-card" size={20} color={colors.textTertiary} />
            </View>
          </View>

          {/* Expiry + CVV row */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <View style={{ flex: 1, gap: 6 }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.medium,
                  fontSize: fontSize.body,
                  color: colors.inkBody,
                }}
              >
                วันที่หมดอายุ
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.hairline2,
                  borderRadius: radius.input,
                  paddingHorizontal: 12,
                  height: 48,
                  justifyContent: 'center',
                }}
              >
                <TextInput
                  placeholder="MM/YY"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="numeric"
                  maxLength={5}
                  style={{
                    fontFamily: fontFamily.jakarta.regular,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink,
                  }}
                />
              </View>
            </View>
            <View style={{ flex: 1, gap: 6 }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.medium,
                  fontSize: fontSize.body,
                  color: colors.inkBody,
                }}
              >
                เลขหลังบัตร
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: colors.hairline2,
                  borderRadius: radius.input,
                  paddingHorizontal: 12,
                  height: 48,
                  justifyContent: 'center',
                }}
              >
                <TextInput
                  placeholder="CVV"
                  placeholderTextColor={colors.textTertiary}
                  keyboardType="numeric"
                  maxLength={4}
                  secureTextEntry
                  style={{
                    fontFamily: fontFamily.jakarta.regular,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink,
                  }}
                />
              </View>
            </View>
          </View>

          {/* Name on card */}
          <View style={{ gap: 6 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.body,
                color: colors.inkBody,
              }}
            >
              ชื่อ-นามสกุลตามที่ปรากฏบนบัตร (ภาษาอังกฤษ)
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.hairline2,
                borderRadius: radius.input,
                paddingHorizontal: 12,
                height: 48,
                justifyContent: 'center',
              }}
            >
              <TextInput
                placeholder="FIRSTNAME LASTNAME"
                placeholderTextColor={colors.textTertiary}
                autoCapitalize="characters"
                style={{
                  fontFamily: fontFamily.jakarta.regular,
                  fontSize: fontSize.bodyMd,
                  color: colors.ink,
                }}
              />
            </View>
          </View>
        </View>

        {/* AutoPay section */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 16,
            gap: 14,
            ...cardShadow,
          }}
        >
          <View style={{ gap: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: fontSize.bodyMd,
                color: colors.ink,
              }}
            >
              สมัครบริการหักบัญชีบัตรเครดิตอัตโนมัติ
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textSecondary,
              }}
            >
              ไม่พลาดทุกกำหนดชำระเบี้ย
            </Text>
          </View>

          {/* Radio: สมัคร */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setAutoPaySelected('yes')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: autoPaySelected === 'yes' ? colors.primary : colors.textTertiary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {autoPaySelected === 'yes' && (
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
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.bodyMd,
                color: colors.ink,
              }}
            >
              สมัครบริการในบิลนี้
            </Text>
          </TouchableOpacity>

          {/* Radio: ไม่สมัคร */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setAutoPaySelected('no')}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}
          >
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: autoPaySelected === 'no' ? colors.primary : colors.textTertiary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {autoPaySelected === 'no' && (
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
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.bodyMd,
                color: colors.inkBody2,
              }}
            >
              ไม่ต้องการสมัครบริการ*
            </Text>
          </TouchableOpacity>

          {/* Disclaimer */}
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textTertiary,
              lineHeight: fontSize.caption * 1.6,
            }}
          >
            *การสมัครบริการหักบัญชีอัตโนมัติจะมีผลในรอบบิลถัดไป บริษัทจะส่งแจ้งเตือนก่อนหักบัญชีล่วงหน้า 3 วันทำการ
            ท่านสามารถยกเลิกบริการได้ตลอดเวลาผ่านแอปหรือติดต่อ AIA Contact Center
          </Text>
        </View>
      </ScrollView>

      {/* Bottom footer */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.screenBg,
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: insets.bottom + 16,
          borderTopWidth: 1,
          borderTopColor: colors.hairline,
          gap: 10,
        }}
      >
        {/* Amount summary */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.body,
              color: colors.textSecondary,
            }}
          >
            ยอดชำระ
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.jakarta.bold,
              fontSize: 18,
              color: colors.primary,
              letterSpacing: -0.5,
            }}
          >
            17,380.00 บาท
          </Text>
        </View>

        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.goBack()}
            style={{
              flex: 1,
              height: 52,
              borderRadius: radius.button,
              borderWidth: 1.5,
              borderColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                color: colors.primary,
                fontFamily: fontFamily.anuphan.bold,
                fontSize: fontSize.title,
              }}
            >
              ยกเลิก
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.navigate('PayChecking')}
            style={{
              flex: 2,
              height: 52,
              borderRadius: radius.button,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              ...primaryButtonShadow,
            }}
          >
            <Text
              style={{
                color: colors.white,
                fontFamily: fontFamily.anuphan.bold,
                fontSize: fontSize.title,
              }}
            >
              ชำระเงิน
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
