import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { IllustrationHospital } from '../../components/illustrations';

type Nav = NativeStackNavigationProp<any>;

const COVERED_ROWS = [
  { label: 'ค่าห้องและค่าอาหาร / วัน', value: '฿8,000' },
  { label: 'ค่าห้อง ICU / วัน', value: '฿16,000' },
  { label: 'ค่าผ่าตัดและหัตถการ', value: 'ตามจริง' },
  { label: 'ค่าแพทย์ตรวจรักษา / วัน', value: '฿2,000' },
];

const NOT_COVERED = [
  'โรคที่เป็นมาก่อนทำประกัน',
  'การรักษาความงาม',
  'ยาหรือบริการที่ไม่จำเป็นทางการแพทย์',
];

export function CoverageDetailScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>ค่ารักษาผู้ป่วยใน</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 100, gap: cardGap }}>

        <View style={{ alignItems: 'center', paddingVertical: 4 }}>
          <IllustrationHospital width={200} height={160} />
        </View>

        {/* Hero card */}
        <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 20, gap: 8, ...cardShadow }}>
          <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 12, color: colors.textSecondary }}>วงเงินรักษาสะสมตลอดปี</Text>
          <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 36, color: colors.ink, letterSpacing: -1 }}>เต็มจำนวน</Text>
          <View style={{ gap: 6, marginTop: 4 }}>
            <View style={{ height: 6, backgroundColor: colors.hairline2, borderRadius: 3, overflow: 'hidden' }}>
              <View style={{ height: 6, width: '3.85%' as any, backgroundColor: colors.primary, borderRadius: 3 }} />
            </View>
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.textSecondary }}>ใช้แล้วปีนี้ ฿38,500</Text>
          </View>
          <View style={{ backgroundColor: colors.successTint, borderRadius: 10, padding: 10, flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 4 }}>
            <MaterialIcons name="check-circle" size={16} color={colors.success} />
            <Text style={{ flex: 1, fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.successDeep, lineHeight: 18 }}>
              เข้ารักษาในโรงพยาบาลคู่สัญญา 400 แห่งโดยไม่ต้องสำรองจ่าย
            </Text>
          </View>
        </View>

        {/* Coverage detail rows */}
        <View style={{ backgroundColor: colors.card, borderRadius: radius.card, overflow: 'hidden', ...cardShadow }}>
          <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 }}>
            <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8 }}>รายละเอียดความคุ้มครอง</Text>
          </View>
          {COVERED_ROWS.map((row, i) => (
            <View key={i}>
              <View style={{ height: 1, backgroundColor: colors.hairline, marginHorizontal: 16 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 13 }}>
                <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 14, color: colors.inkBody }}>{row.label}</Text>
                <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 14, color: colors.ink2 }}>{row.value}</Text>
              </View>
            </View>
          ))}
          <View style={{ height: 8 }} />
        </View>

        {/* Not covered */}
        <View style={{ backgroundColor: colors.card, borderRadius: radius.card, overflow: 'hidden', ...cardShadow }}>
          <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8 }}>
            <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8 }}>สิ่งที่ไม่ครอบคลุม</Text>
          </View>
          {NOT_COVERED.map((item, i) => (
            <View key={i}>
              <View style={{ height: 1, backgroundColor: colors.hairline, marginHorizontal: 16 }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 13, gap: 10 }}>
                <MaterialIcons name="remove-circle-outline" size={18} color={colors.textTertiary} />
                <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.textSecondary }}>{item}</Text>
              </View>
            </View>
          ))}
          <View style={{ height: 8 }} />
        </View>
      </ScrollView>

      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.screenBg, paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: insets.bottom + 16, borderTopWidth: 1, borderTopColor: colors.hairline }}>
        <TouchableOpacity activeOpacity={0.82}
          style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}>
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>ยื่นเคลมหมวดนี้</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
