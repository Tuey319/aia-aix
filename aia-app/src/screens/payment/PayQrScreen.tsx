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

/** Minimal fake QR grid rendered with Views */
function FakeQrCode() {
  // 7x7 pattern of cells, 1 = dark
  const pattern = [
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1],
    [1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1],
    [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1],
  ];
  const cell = 13;
  return (
    <View
      style={{
        backgroundColor: colors.white,
        padding: 12,
        borderRadius: 12,
        alignSelf: 'center',
      }}
    >
      {pattern.map((row, ri) => (
        <View key={ri} style={{ flexDirection: 'row' }}>
          {row.map((v, ci) => (
            <View
              key={ci}
              style={{
                width: cell,
                height: cell,
                backgroundColor: v ? '#000000' : '#FFFFFF',
              }}
            />
          ))}
        </View>
      ))}
    </View>
  );
}

export function PayQrScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  const infoRows = [
    { label: 'บริษัท', value: 'เอไอเอ จำกัด' },
    { label: 'ผู้ชำระเงิน', value: 'Somchai Meethong' },
    { label: 'เลขที่อ้างอิง (1/2)', value: '92XXXXXXXX' },
    { label: 'เลขที่อ้างอิง (2/2)', value: '83XXXXX' },
  ];

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
          6b/7
        </Text>

        {/* Title */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.title,
            color: colors.ink,
          }}
        >
          QR เพื่อจ่ายผ่านบัญชีธนาคาร
        </Text>

        {/* Dark THAI QR banner */}
        <View
          style={{
            backgroundColor: '#1A2A4A',
            borderRadius: radius.card,
            padding: 14,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
          }}
        >
          <MaterialIcons name="qr-code-2" size={28} color={colors.white} />
          <View>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: fontSize.bodyMd,
                color: colors.white,
                letterSpacing: 1.5,
              }}
            >
              THAI QR PAYMENT
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.regular,
                fontSize: fontSize.caption,
                color: 'rgba(255,255,255,0.6)',
                marginTop: 2,
              }}
            >
              PromptPay · พร้อมเพย์
            </Text>
          </View>
        </View>

        {/* QR code card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 20,
            alignItems: 'center',
            gap: 16,
            ...cardShadow,
          }}
        >
          <FakeQrCode />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.bodyMd,
              color: colors.inkBody,
            }}
          >
            สแกน QR เพื่อชำระเงิน
          </Text>
        </View>

        {/* Info rows card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
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
                  paddingVertical: 12,
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

          {/* Mobile banking icons row */}
          <View style={{ height: 1, backgroundColor: colors.hairline, marginHorizontal: 16 }} />
          <View
            style={{
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.body,
                color: colors.textSecondary,
                marginRight: 4,
              }}
            >
              ชำระผ่าน
            </Text>
            {/* Bank icon placeholders */}
            {['SCB', 'KTB', 'BBL', 'BAY'].map((bank) => (
              <View
                key={bank}
                style={{
                  backgroundColor: colors.pageBg,
                  borderRadius: 6,
                  paddingHorizontal: 6,
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.jakarta.bold,
                    fontSize: 10,
                    color: colors.inkBody2,
                  }}
                >
                  {bank}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Amount */}
        <View style={{ alignItems: 'center', gap: 4, paddingVertical: 8 }}>
          <Text
            style={{
              fontFamily: fontFamily.jakarta.bold,
              fontSize: 36,
              color: colors.ink,
              letterSpacing: -1,
            }}
          >
            17,380.00
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.body,
              color: colors.textSecondary,
            }}
          >
            บาท
          </Text>
        </View>

        {/* Expiry */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: colors.amberTint,
            borderRadius: radius.icon,
            padding: 10,
          }}
        >
          <MaterialIcons name="schedule" size={16} color={colors.amberDeep} />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.medium,
              fontSize: fontSize.body,
              color: colors.amberDeeper,
              flex: 1,
            }}
          >
            คุณต้องทำการชำระเงินใน 16 พ.ค. 2568, 13:53 น.
          </Text>
        </View>

        {/* Disclaimer */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.caption,
            color: colors.textTertiary,
            lineHeight: fontSize.caption * 1.6,
            textAlign: 'center',
          }}
        >
          QR Code นี้ใช้ได้เพียงครั้งเดียวและมีอายุตามที่ระบุด้านบน
          บริษัทขอสงวนสิทธิ์ยกเลิกรายการหากไม่ได้รับการยืนยันภายในเวลาที่กำหนด
        </Text>
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
          flexDirection: 'row',
          gap: 10,
        }}
      >
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
          onPress={() => navigation.navigate('PaySuccess')}
          style={{
            flex: 2,
            height: 52,
            borderRadius: radius.button,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            gap: 6,
            ...primaryButtonShadow,
          }}
        >
          <MaterialIcons name="share" size={18} color={colors.white} />
          <Text
            style={{
              color: colors.white,
              fontFamily: fontFamily.anuphan.bold,
              fontSize: fontSize.title,
            }}
          >
            แชร์รูปภาพ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
