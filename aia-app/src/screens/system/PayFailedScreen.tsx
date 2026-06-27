import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding } from '../../tokens';
import { primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

export function PayFailedScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top', 'bottom']}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: screenPadding,
        }}
      >
        {/* Soft red circle with exclamation icon */}
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 36,
            backgroundColor: colors.primaryTint,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons name="error-outline" size={38} color={colors.primary} />
        </View>

        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.titleLg,
            color: colors.ink,
            marginTop: 20,
            marginBottom: 10,
            textAlign: 'center',
          }}
        >
          การชำระเงินไม่สำเร็จ
        </Text>

        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.bodyMd,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 22,
            marginBottom: 14,
          }}
        >
          ธนาคารปฏิเสธรายการนี้{'\n'}ยังไม่มีการตัดเงินจากบัญชีของคุณ
        </Text>

        {/* Reference code */}
        <Text
          style={{
            fontFamily: fontFamily.mono.regular,
            fontSize: fontSize.caption,
            color: colors.textTertiary,
            marginBottom: 36,
          }}
        >
          รหัสอ้างอิง · TXN-0095521
        </Text>

        {/* Retry button */}
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          activeOpacity={0.82}
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.button,
            height: 52,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 12,
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
            ลองอีกครั้ง
          </Text>
        </TouchableOpacity>

        {/* Back home outline button */}
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          activeOpacity={0.82}
          style={{
            borderWidth: 1.5,
            borderColor: colors.primary,
            borderRadius: radius.button,
            height: 52,
            width: '100%',
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
            กลับหน้าหลัก
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
