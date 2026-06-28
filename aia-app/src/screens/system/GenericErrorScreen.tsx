import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding } from '../../tokens';
import { primaryButtonShadow } from '../../tokens/shadows';
import { IllustrationError } from '../../components/illustrations';

type Nav = NativeStackNavigationProp<any>;

export function GenericErrorScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top', 'bottom']}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: screenPadding, gap: 16 }}>
        <IllustrationError width={220} height={180} color={colors.primary} variant="error" />
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 22, color: colors.ink2, textAlign: 'center' }}>
          เกิดข้อผิดพลาดบางอย่าง
        </Text>
        <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: fontSize.bodyMd, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 }}>
          เราไม่สามารถดำเนินการตามคำขอของคุณได้{'\n'}ในขณะนี้ โปรดลองอีกครั้ง
        </Text>
      </View>

      <View style={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 16, gap: 10 }}>
        <TouchableOpacity activeOpacity={0.82}
          style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}>
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: fontSize.title }}>ลองอีกครั้ง</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.7}
          style={{ height: 44, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.textSecondary, fontFamily: fontFamily.anuphan.semiBold, fontSize: fontSize.bodyMd }}>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
