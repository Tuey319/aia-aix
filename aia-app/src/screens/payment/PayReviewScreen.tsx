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

export function PayReviewScreen() {
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
          3/7
        </Text>

        {/* Section title */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.title,
            color: colors.ink,
          }}
        >
          ยืนยันรายละเอียดการชำระเงิน
        </Text>

        {/* Review card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          {/* Row: เบี้ยประกันชีวิตต่อปี */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.body,
                color: colors.inkBody,
              }}
            >
              เบี้ยประกันชีวิตต่อปี
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.medium,
                fontSize: fontSize.body,
                color: colors.ink2,
              }}
            >
              14,380.00 บาท
            </Text>
          </View>

          <View style={{ height: 1, backgroundColor: colors.hairline, marginHorizontal: 16 }} />

          {/* Row: เบี้ยเพิ่มเติม */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 14,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.body,
                color: colors.inkBody,
              }}
            >
              เบี้ยเพิ่มเติม
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.medium,
                fontSize: fontSize.body,
                color: colors.ink2,
              }}
            >
              3,000.00 บาท
            </Text>
          </View>

          {/* Thick divider */}
          <View style={{ height: 1, backgroundColor: colors.hairline2 }} />

          {/* Total row */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 16,
              paddingVertical: 18,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: fontSize.bodyMd,
                color: colors.ink,
              }}
            >
              จำนวนเงินทั้งหมด
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 22,
                color: colors.primary,
                letterSpacing: -0.5,
              }}
            >
              17,380.00 บาท
            </Text>
          </View>
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
          onPress={() => navigation.navigate('PayMethod')}
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
            ยืนยัน
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
