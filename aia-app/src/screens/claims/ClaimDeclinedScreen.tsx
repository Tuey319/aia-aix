import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

export function ClaimDeclinedScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>สถานะการเคลม</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 100, gap: cardGap, alignItems: 'center', paddingTop: 24 }}>

        {/* Amber shield icon */}
        <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: colors.amberTint, alignItems: 'center', justifyContent: 'center' }}>
          <MaterialIcons name="gpp-bad" size={44} color={colors.amber} />
        </View>

        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 22, color: colors.ink, textAlign: 'center', marginTop: 4 }}>
          เคลมไม่ได้รับการอนุมัติ
        </Text>

        {/* eClaim ref */}
        <Text style={{ fontFamily: fontFamily.mono.regular, fontSize: 11, color: colors.textSecondary, letterSpacing: 1.2, textTransform: 'uppercase' }}>
          eClaim Ref : E0053728
        </Text>

        {/* Reason card */}
        <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 16, width: '100%', gap: 10, ...cardShadow }}>
          <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8 }}>เหตุผล</Text>
          <View style={{ height: 1, backgroundColor: colors.hairline }} />
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.inkBody, lineHeight: 22 }}>
            เอกสารประกอบไม่ครบถ้วน — ไม่พบใบรับรองแพทย์ฉบับจริง กรุณาแนบเอกสารเพิ่มเติมและส่งเคลมอีกครั้ง
          </Text>
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.screenBg, paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: insets.bottom + 16, borderTopWidth: 1, borderTopColor: colors.hairline, gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('ClaimDocs')} activeOpacity={0.82}
          style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}>
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>แก้ไขและส่งใหม่</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ContactAgent')} activeOpacity={0.7}
          style={{ height: 48, alignItems: 'center', justifyContent: 'center', borderRadius: radius.button, borderWidth: 1.5, borderColor: colors.primary }}>
          <Text style={{ color: colors.primary, fontFamily: fontFamily.anuphan.semiBold, fontSize: 15 }}>ติดต่อเจ้าหน้าที่</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
