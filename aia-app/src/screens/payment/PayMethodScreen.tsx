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
} from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

export function PayMethodScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

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
          paddingBottom: insets.bottom + 100,
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
          4/7
        </Text>

        {/* Info card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 16,
            gap: 10,
            ...cardShadow,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <MaterialIcons name="description" size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: colors.textSecondary,
                }}
              >
                เลขกรมธรรม์
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.semiBold,
                  fontSize: fontSize.bodyMd,
                  color: colors.ink,
                }}
              >
                P8842XXXXX
              </Text>
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: colors.hairline }} />

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <MaterialIcons name="payments" size={20} color={colors.primary} />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: colors.textSecondary,
                }}
              >
                จำนวนเงินที่ต้องชำระ
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.bold,
                  fontSize: 20,
                  color: colors.primary,
                  letterSpacing: -0.5,
                }}
              >
                ฿17,380.00 บาท
              </Text>
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: colors.hairline }} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 8,
              backgroundColor: colors.amberTint,
              borderRadius: radius.icon,
              padding: 10,
            }}
          >
            <MaterialIcons name="info-outline" size={16} color={colors.amberDeep} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.amberDeeper,
                flex: 1,
                lineHeight: fontSize.caption * 1.5,
              }}
            >
              ระบบจะดึงเงินออกจากบัญชีฯ เมื่อได้รับการยืนยัน
            </Text>
          </View>
        </View>

        {/* Section title */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.title,
            color: colors.ink,
            marginTop: 4,
          }}
        >
          เลือกวิธีชำระเงิน
        </Text>

        {/* Payment method cards */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {/* Credit card */}
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.navigate('PayCard')}
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 20,
              alignItems: 'center',
              gap: 10,
              borderWidth: 2,
              borderColor: colors.hairline2,
              ...cardShadow,
            }}
          >
            <MaterialIcons name="credit-card" size={36} color={colors.primary} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.bodyMd,
                color: colors.ink,
                textAlign: 'center',
              }}
            >
              บัตรเครดิต
            </Text>
          </TouchableOpacity>

          {/* QR code */}
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => navigation.navigate('PayQr')}
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 20,
              alignItems: 'center',
              gap: 10,
              borderWidth: 2,
              borderColor: colors.hairline2,
              ...cardShadow,
            }}
          >
            <MaterialIcons name="qr-code" size={36} color={colors.primary} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.bodyMd,
                color: colors.ink,
                textAlign: 'center',
              }}
            >
              QR code
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom sticky button */}
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
        }}
      >
        <TouchableOpacity
          activeOpacity={0.82}
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.button,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0.4,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: fontFamily.anuphan.bold,
              fontSize: fontSize.title,
            }}
          >
            ถัดไป
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
