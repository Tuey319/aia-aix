import React, { useState } from 'react';
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
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;

type Method = 'card' | 'qr';

export function PayMethodScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<Method | null>(null);
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  function handleNext() {
    if (selected === 'card') navigation.navigate('PayCard');
    else if (selected === 'qr') navigation.navigate('PayQr');
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
            fontSize: fontSize.titleLg,
            color: colors.ink,
            flex: 1,
          }}
        >
          {language === 'en' ? 'Payment' : 'ชำระเงิน'}
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
        {/* Policy + amount info card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 16,
            gap: 8,
            ...cardShadow,
          }}
        >
          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textSecondary,
              }}
            >
              {language === 'en' ? 'Policy Number' : 'เลขกรมธรรม์'}
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

          <View style={{ height: 1, backgroundColor: colors.hairline }} />

          <View style={{ gap: 2 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textSecondary,
              }}
            >
              {language === 'en' ? 'Amount to pay' : 'จำนวนเงินที่ต้องชำระ'}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 22,
                color: colors.primary,
                letterSpacing: -0.5,
              }}
            >
              {language === 'en' ? '฿17,380.00' : '17,380.00 บาท'}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 6,
              marginTop: 2,
            }}
          >
            <MaterialIcons name="info-outline" size={14} color={colors.textSecondary} style={{ marginTop: 1 }} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textSecondary,
                flex: 1,
                lineHeight: fontSize.caption * 1.5,
              }}
            >
              {language === 'en' ? 'Funds will be debited upon confirmation on the next business day.' : 'ระบบจะดึงเงินออกจากบัญชีฯ เมื่อได้รับการยืนยันในวันที่ทำการถัดไป'}
            </Text>
          </View>
        </View>

        {/* Section title */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.title,
            color: colors.ink,
          }}
        >
          {s.payment.methodTitle}
        </Text>

        {/* Payment method cards — side by side */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {/* Credit card */}
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => setSelected('card')}
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: radius.card,
              paddingVertical: 24,
              paddingHorizontal: 12,
              alignItems: 'center',
              gap: 10,
              borderWidth: 2,
              borderColor: selected === 'card' ? colors.primary : colors.hairline2,
              ...cardShadow,
            }}
          >
            {/* Credit card icon */}
            <View
              style={{
                width: 48,
                height: 32,
                borderRadius: 6,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="credit-card" size={22} color={colors.white} />
            </View>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.bodyMd,
                color: colors.ink,
                textAlign: 'center',
              }}
            >
              {s.payment.creditCard}
            </Text>
          </TouchableOpacity>

          {/* QR code */}
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => setSelected('qr')}
            style={{
              flex: 1,
              backgroundColor: colors.card,
              borderRadius: radius.card,
              paddingVertical: 24,
              paddingHorizontal: 12,
              alignItems: 'center',
              gap: 10,
              borderWidth: 2,
              borderColor: selected === 'qr' ? colors.primary : colors.hairline2,
              ...cardShadow,
            }}
          >
            <MaterialIcons name="qr-code-2" size={40} color={colors.inkBody2} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.bodyMd,
                color: colors.ink,
                textAlign: 'center',
              }}
            >
              {s.payment.qrCode}
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
          onPress={handleNext}
          disabled={!selected}
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.button,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: selected ? 1 : 0.4,
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
            {s.common.next}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
