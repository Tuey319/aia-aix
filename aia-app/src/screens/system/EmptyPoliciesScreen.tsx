import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, screenPadding } from '../../tokens';
import { primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

export function EmptyPoliciesScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>ความคุ้มครอง</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: screenPadding, gap: 16 }}>
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.hairline, alignItems: 'center', justifyContent: 'center' }}>
          <MaterialIcons name="shield" size={44} color={colors.textTertiary} />
        </View>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 20, color: colors.ink2, textAlign: 'center' }}>ยังไม่มีกรมธรรม์ที่ใช้งาน</Text>
        <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 }}>
          เริ่มต้นความคุ้มครองที่เหมาะกับคุณ ปรึกษาตัวแทนเพื่อรับคำแนะนำ{'\n'}ที่เหมาะสมกับความต้องการของคุณ
        </Text>
      </View>

      <View style={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 16 }}>
        <TouchableOpacity activeOpacity={0.82}
          style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}>
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>ปรึกษาตัวแทน</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
