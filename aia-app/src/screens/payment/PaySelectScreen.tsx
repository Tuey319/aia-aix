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
import { StatusPill } from '../../components/StatusPill';

type Nav = NativeStackNavigationProp<any>;

export function PaySelectScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [selected, setSelected] = useState<0 | 1>(1);

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
          จ่ายเบี้ยฯ
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
        <View style={{ gap: 4, marginBottom: 4 }}>
          <Text
            style={{
              fontFamily: fontFamily.jakarta.semiBold,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
              letterSpacing: 0.3,
            }}
          >
            1/7
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.anuphan.bold,
              fontSize: fontSize.title,
              color: colors.ink,
            }}
          >
            เลือกกรมธรรม์ที่ต้องการชำระเบี้ย
          </Text>
        </View>

        {/* Policy Card 1 — unselected */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setSelected(0)}
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 16,
            gap: 8,
            borderWidth: 2,
            borderColor: selected === 0 ? colors.primary : colors.hairline2,
            ...cardShadow,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {/* Radio */}
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selected === 0 ? colors.primary : colors.textTertiary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selected === 0 && (
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
            <View style={{ flex: 1, gap: 2 }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.bodyMd,
                  color: selected === 0 ? colors.ink : colors.inkBody2,
                }}
              >
                AIA สมาร์ท เวลท์ (ยูนิต ลิงค์)
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.regular,
                  fontSize: fontSize.caption,
                  color: colors.textSecondary,
                }}
              >
                U-2291-8844
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: fontSize.bodyMd,
                color: selected === 0 ? colors.ink : colors.inkBody2,
                letterSpacing: -0.3,
              }}
            >
              ฿13,930
            </Text>
          </View>

          <View style={{ paddingLeft: 30 }}>
            <StatusPill label="ครบกำหนดใน 16 วัน" variant="amber" />
          </View>
        </TouchableOpacity>

        {/* Policy Card 2 — selected */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setSelected(1)}
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 16,
            gap: 14,
            borderWidth: 2,
            borderColor: selected === 1 ? colors.primary : colors.hairline2,
            ...cardShadow,
          }}
        >
          {/* Radio + name */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 10,
                borderWidth: 2,
                borderColor: selected === 1 ? colors.primary : colors.textTertiary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {selected === 1 && (
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
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.bodyMd,
                color: colors.ink,
                flex: 1,
              }}
            >
              AIA เพย์ ไลฟ์ พลัส 20 ปี
            </Text>
          </View>

          {/* Policy no */}
          <Text
            style={{
              fontFamily: fontFamily.jakarta.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
              marginLeft: 30,
            }}
          >
            P-8842-8891
          </Text>

          {/* Premium breakdown rows */}
          <View style={{ gap: 6 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.body,
                  color: colors.inkBody2,
                }}
              >
                เบี้ยก่อนหักส่วนลด
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.medium,
                  fontSize: fontSize.body,
                  color: colors.inkBody2,
                }}
              >
                15,647.20
              </Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.body,
                  color: colors.primary,
                }}
              >
                ส่วนลด Vitality
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.medium,
                  fontSize: fontSize.body,
                  color: colors.primary,
                }}
              >
                -1,267.20
              </Text>
            </View>

            <View
              style={{
                height: 1,
                backgroundColor: colors.hairline2,
                marginVertical: 2,
              }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.bodyMd,
                  color: colors.ink,
                }}
              >
                ยอดชำระ
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.bold,
                  fontSize: 20,
                  color: colors.primary,
                  letterSpacing: -0.5,
                }}
              >
                ฿14,380
              </Text>
            </View>
          </View>
        </TouchableOpacity>
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
          onPress={() => navigation.navigate('PayCoverage')}
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
            ถัดไป
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
