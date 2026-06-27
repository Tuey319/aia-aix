import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

interface TimelineStep {
  label: string;
  sub: string;
  status: 'done' | 'active' | 'pending';
}

const STEPS: TimelineStep[] = [
  { label: 'ได้รับคำขอเคลมแล้ว', sub: '18 มิ.ย. 2569 · CH-41ย.', status: 'done' },
  { label: 'AIA กำลังพิจารณา', sub: 'ดำเนินการภายใน 5 วันทำการ', status: 'active' },
  { label: 'อนุมัติและโอนเงิน', sub: 'รอดำเนินการ', status: 'pending' },
];

function StepDot({ status }: { status: TimelineStep['status'] }) {
  const bg = status === 'done' ? colors.success : status === 'active' ? colors.amber : colors.hairline2;
  return (
    <View style={{ width: 18, height: 18, borderRadius: 9, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      {status === 'done' && <MaterialIcons name="check" size={12} color={colors.white} />}
      {status === 'active' && <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.white }} />}
    </View>
  );
}

export function ClaimHistoryScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>ประวัติการเคลม</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 32, gap: cardGap }}>
        {/* Status banner */}
        <View style={{ backgroundColor: colors.amberTint, borderRadius: radius.card, padding: 16, gap: 6, borderLeftWidth: 3, borderLeftColor: colors.amber }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 13, color: colors.amberDeep }}>กำลังดำเนินการ</Text>
            <Text style={{ fontFamily: fontFamily.mono.regular, fontSize: 10, color: colors.amberDeep, letterSpacing: 1 }}>E0053728</Text>
          </View>
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 13, color: colors.amberDeeper }}>
            ค่ารักษาผู้ป่วยนอก · สมชาย มีทอง · 01 มิ.ย. 2569
          </Text>
        </View>

        {/* Amount */}
        <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 18, ...cardShadow }}>
          <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 12, color: colors.textSecondary, marginBottom: 4 }}>จำนวนที่เคลม</Text>
          <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 36, color: colors.ink, letterSpacing: -1 }}>฿3,200.00</Text>
        </View>

        {/* Timeline */}
        <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 18, gap: 0, ...cardShadow }}>
          <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 16 }}>
            สถานะการดำเนินการ
          </Text>
          {STEPS.map((step, i) => (
            <View key={i} style={{ flexDirection: 'row', gap: 14, paddingBottom: i < STEPS.length - 1 ? 20 : 0 }}>
              <View style={{ alignItems: 'center', gap: 0 }}>
                <StepDot status={step.status} />
                {i < STEPS.length - 1 && (
                  <View style={{ width: 2, flex: 1, backgroundColor: step.status === 'done' ? colors.success : colors.hairline2, marginTop: 4 }} />
                )}
              </View>
              <View style={{ flex: 1, paddingBottom: 4 }}>
                <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 14, color: step.status === 'pending' ? colors.textTertiary : colors.ink2, marginBottom: 2 }}>
                  {step.label}
                </Text>
                <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.textSecondary }}>{step.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{ alignItems: 'center', paddingVertical: 8 }}>
          <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 14, color: colors.primary }}>กลับหน้าหลัก</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
