import React, { useEffect, useState } from 'react';
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
import { IllustrationGiftPremium } from '../../components/illustrations';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;

export function PaySuccessScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [countdown, setCountdown] = useState(3);
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  useEffect(() => {
    // After 2s auto-launch AI Celebration popup
    const timer = setTimeout(() => {
      navigation.navigate('Celebration');
    }, 2000);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [navigation]);

  const infoRows = [
    { label: language === 'en' ? 'Amount' : 'จำนวนเงิน', value: language === 'en' ? '฿17,380.00' : '17,380.00 บาท' },
    { label: language === 'en' ? 'Date' : 'วันที่ทำรายการ', value: language === 'en' ? '16 May 2025' : '16 พ.ค. 2568' },
    { label: language === 'en' ? 'Payment Method' : 'วิธีชำระเงิน', value: language === 'en' ? 'QR Code' : 'QR code' },
    { label: language === 'en' ? 'Policy Number' : 'เลขกรมธรรม์', value: 'P8842XXXXX' },
    { label: language === 'en' ? 'Reference No. (1/2)' : 'เลขที่อ้างอิง (1/2)', value: '92XXXXXXXX' },
    { label: language === 'en' ? 'Reference No. (2/2)' : 'เลขที่อ้างอิง (2/2)', value: '83XXXXX' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header — no back, only title */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: 16,
        }}
      >
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
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 100,
          gap: cardGap,
          alignItems: 'center',
        }}
      >
        {/* Success illustration */}
        <IllustrationGiftPremium width={220} height={200} />

        {/* Title */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: 22,
            color: colors.ink,
            textAlign: 'center',
          }}
        >
          {s.payment.successTitle}
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.bodyMd,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: fontSize.bodyMd * 1.5,
            paddingHorizontal: 16,
          }}
        >
          {language === 'en' ? 'A temporary receipt will be sent to you via SMS and your registered email.' : 'ลูกค้าจะได้รับใบเสร็จชั่วคราวผ่านทาง SMS\nและอีเมลที่ลงทะเบียนไว้'}
        </Text>

        {/* Info card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            alignSelf: 'stretch',
            ...cardShadow,
          }}
        >
          {infoRows.map((row, i) => (
            <View key={i}>
              {i > 0 && (
                <View style={{ height: 1, backgroundColor: colors.hairline, marginHorizontal: 16 }} />
              )}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 13,
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
                    fontFamily: fontFamily.jakarta.medium,
                    fontSize: fontSize.body,
                    color: colors.ink2,
                  }}
                >
                  {row.value}
                </Text>
              </View>
            </View>
          ))}
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
          onPress={() => navigation.navigate('Home')}
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
              fontSize: fontSize.title,
            }}
          >
            {s.payment.backToApp(String(countdown))}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
