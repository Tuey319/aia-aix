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

type Nav = NativeStackNavigationProp<any>;

export function PaySuccessScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          navigation.navigate('Home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigation]);

  const infoRows = [
    { label: 'จำนวนเงิน', value: '17,380.00 บาท' },
    { label: 'วันที่ทำรายการ', value: '16 พ.ค. 2568' },
    { label: 'วิธีชำระเงิน', value: 'QR code' },
    { label: 'เลขกรมธรรม์', value: 'P8842XXXXX' },
    { label: 'เลขที่อ้างอิง (1/2)', value: '92XXXXXXXX' },
    { label: 'เลขที่อ้างอิง (2/2)', value: '83XXXXX' },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header — no back, only X */}
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
          alignItems: 'center',
        }}
      >
        {/* Step counter */}
        <Text
          style={{
            fontFamily: fontFamily.jakarta.semiBold,
            fontSize: fontSize.caption,
            color: colors.textSecondary,
            letterSpacing: 0.3,
            alignSelf: 'flex-start',
            marginBottom: 4,
          }}
        >
          7/7
        </Text>

        {/* Green success circle */}
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: colors.successTint,
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 8,
          }}
        >
          <MaterialIcons name="check-circle" size={48} color={colors.success} />
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: 22,
            color: colors.ink,
            textAlign: 'center',
          }}
        >
          ชำระเงินสำเร็จ
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
          ลูกค้าจะได้รับใบเสร็จชั่วคราวผ่านทาง SMS และอีเมลที่ลงทะเบียนไว้
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
            กลับไปยัง AIA+ ({countdown} วินาที)
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
