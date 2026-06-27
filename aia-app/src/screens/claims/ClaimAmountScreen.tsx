import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
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
} from '../../tokens';
import { primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

const KEYS = [
  '1', '2', '3',
  '4', '5', '6',
  '7', '8', '9',
  '.', '0', 'backspace',
];

export function ClaimAmountScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('3200.00');

  function handleKey(key: string) {
    if (key === 'backspace') {
      setAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      return;
    }
    if (key === '.' && amount.includes('.')) return;
    if (amount === '0' && key !== '.') {
      setAmount(key);
      return;
    }
    // Limit to 2 decimal places
    if (amount.includes('.')) {
      const decimals = amount.split('.')[1];
      if (decimals.length >= 2) return;
    }
    setAmount((prev) => prev + key);
  }

  const displayAmount = amount.includes('.')
    ? amount
    : amount;

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
          จำนวนเงิน
        </Text>
      </View>

      {/* Amount Display */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: screenPadding,
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily.jakarta.regular,
            fontSize: fontSize.caption,
            color: colors.textSecondary,
            marginBottom: 8,
          }}
        >
          จำนวนเงินที่เคลม
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.jakarta.bold,
            fontSize: 48,
            color: colors.ink,
            letterSpacing: -1.5,
          }}
        >
          ฿{displayAmount}
        </Text>
        <View
          style={{
            height: 2,
            width: 180,
            backgroundColor: colors.primary,
            borderRadius: 2,
            marginTop: 8,
          }}
        />
      </View>

      {/* Keypad */}
      <View
        style={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 100,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          {KEYS.map((key) => (
            <TouchableOpacity
              key={key}
              activeOpacity={0.7}
              onPress={() => handleKey(key)}
              style={{
                width: '30%',
                height: 60,
                borderRadius: 14,
                backgroundColor: colors.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {key === 'backspace' ? (
                <MaterialIcons name="backspace" size={22} color={colors.inkBody2} />
              ) : (
                <Text
                  style={{
                    fontFamily: fontFamily.jakarta.semiBold,
                    fontSize: 22,
                    color: colors.ink,
                  }}
                >
                  {key}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Confirm Button */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
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
          onPress={() => navigation.goBack()}
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
            ยืนยัน
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
