import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

function TypingDots() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const makePulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.delay(600 - delay),
        ])
      );

    const a1 = makePulse(dot1, 0);
    const a2 = makePulse(dot2, 200);
    const a3 = makePulse(dot3, 400);
    a1.start();
    a2.start();
    a3.start();
    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 2 }}>
      {[dot1, dot2, dot3].map((anim, i) => (
        <Animated.View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.textTertiary,
            opacity: anim,
          }}
        />
      ))}
    </View>
  );
}

export function AssistantTypingScreen() {
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
          paddingBottom: 14,
          gap: 10,
          backgroundColor: colors.screenBg,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons name="smart-toy" size={22} color={colors.white} />
        </View>

        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.titleLg,
            color: colors.ink,
            flex: 1,
          }}
        >
          ผู้ช่วย AIA
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.successTint,
            borderRadius: radius.pill,
            paddingHorizontal: 10,
            paddingVertical: 4,
            gap: 5,
          }}
        >
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 99,
              backgroundColor: colors.successDot,
            }}
          />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.medium,
              fontSize: fontSize.caption,
              color: colors.success,
            }}
          >
            ออนไลน์
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Chat area */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: screenPadding,
            paddingTop: 8,
            paddingBottom: 16,
            gap: cardGap,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* User bubble */}
          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 16,
                borderBottomRightRadius: 4,
                paddingHorizontal: 14,
                paddingVertical: 10,
                maxWidth: '78%',
                ...primaryButtonShadow,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.bodyMd,
                  color: colors.white,
                  lineHeight: 22,
                }}
              >
                เช็คว่าฉันต้องจ่ายเท่าไหร่
              </Text>
            </View>
          </View>

          {/* Bot typing bubble */}
          <View style={{ alignItems: 'flex-start' }}>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                borderBottomLeftRadius: 4,
                paddingHorizontal: 14,
                paddingVertical: 12,
                ...cardShadow,
              }}
            >
              <TypingDots />
            </View>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textTertiary,
                marginTop: 5,
                marginLeft: 4,
              }}
            >
              กำลังพิมพ์...
            </Text>
          </View>
        </ScrollView>

        {/* Bottom input bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: screenPadding,
            paddingTop: 10,
            paddingBottom: insets.bottom + 10,
            backgroundColor: colors.screenBg,
            gap: 10,
            borderTopWidth: 1,
            borderTopColor: colors.hairline2,
          }}
        >
          <TextInput
            placeholder="พิมพ์ข้อความ..."
            placeholderTextColor={colors.textTertiary}
            style={{
              flex: 1,
              height: 46,
              backgroundColor: colors.card,
              borderRadius: radius.input,
              paddingHorizontal: 14,
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.bodyMd,
              color: colors.ink,
              borderWidth: 1,
              borderColor: colors.hairline2,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.82}
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              ...primaryButtonShadow,
            }}
          >
            <MaterialIcons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
