import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, fontSize, radius, screenPadding } from '../../tokens';
import { primaryButtonShadow } from '../../tokens/shadows';
import { useAppStore } from '../../store';

export function SessionTimeoutScreen() {
  const insets = useSafeAreaInsets();
  const setLoggedIn = useAppStore((s) => s.setLoggedIn);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top', 'bottom']}>
      {/* Centered content */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: screenPadding,
        }}
      >
        {/* Lock-clock icon in grey circle */}
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: colors.hairline2,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20,
          }}
        >
          <MaterialIcons name="lock-clock" size={44} color={colors.textTertiary} />
        </View>

        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.titleLg,
            color: colors.ink2,
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          เซสชันหมดอายุ
        </Text>

        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.bodyMd,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 22,
          }}
        >
          เพื่อความปลอดภัย ระบบได้ออกจากระบบโดยอัตโนมัติ{'\n'}กรุณาเข้าสู่ระบบอีกครั้ง
        </Text>
      </View>

      {/* Bottom — single login button */}
      <View
        style={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 16,
          paddingTop: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => setLoggedIn(false)}
          activeOpacity={0.82}
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
            เข้าสู่ระบบอีกครั้ง
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
