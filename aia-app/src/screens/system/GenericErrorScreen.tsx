import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding } from '../../tokens';
import { primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

export function GenericErrorScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

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
        <MaterialIcons name="sentiment-dissatisfied" size={60} color={colors.textTertiary} />

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
          เกิดข้อผิดพลาดบางอย่าง
        </Text>

        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.bodyMd,
            color: colors.textSecondary,
            textAlign: 'center',
            lineHeight: 22,
            marginBottom: 36,
          }}
        >
          เราไม่สามารถดำเนินการตามคำขอของคุณได้ในขณะนี้{'\n'}โปรดลองอีกครั้ง
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
