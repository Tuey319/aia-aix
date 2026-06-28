import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { ListRow } from '../../components/ListRow';
import { useAppStore } from '../../store';

export function AffordabilityScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();
  const policy = useAppStore((s) => s.selectedPolicy);
  const income = useAppStore((s) => s.income);

  const annualIncome = income * 12;
  const annualPremium = policy.annualPremium;
  const currentPct = ((annualPremium / annualIncome) * 100).toFixed(1);

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
          สุขภาพการเงิน
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 100,
          gap: cardGap,
        }}
      >
        {/* Hero metric card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.cardLg,
            padding: 20,
            gap: 16,
            ...cardShadow,
          }}
        >
          {/* Label + "พอเหมาะ" pill */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.body,
                color: colors.textSecondary,
                flex: 1,
              }}
            >
              ตัวชี้วัดเบี้ยฯ สัดส่วนของรายได้ไม่ได้
            </Text>
            <View
              style={{
                backgroundColor: colors.amberTint,
                borderRadius: radius.pill,
                paddingHorizontal: 10,
                paddingVertical: 4,
                marginLeft: 8,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.caption,
                  color: colors.amberDeep,
                }}
              >
                พอเหมาะ
              </Text>
            </View>
          </View>

          {/* Big percentage */}
          <Text
            style={{
              fontFamily: fontFamily.jakarta.extraBold,
              fontSize: 52,
              color: colors.primary,
              letterSpacing: -2,
              lineHeight: 56,
            }}
          >
            {currentPct}%
          </Text>

          {/* Colored track bar */}
          <TrackBar currentPct={parseFloat(currentPct)} />

          {/* Legend dots */}
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <ZoneLegend color={colors.success} label={`คงอยู่ ${currentPct}%`} />
            <ZoneLegend color={colors.amber} label="ช่วง 7.4 - 15.2%" />
          </View>
        </View>

        {/* Blue info note */}
        <View
          style={{
            backgroundColor: colors.infoTint,
            borderRadius: radius.card,
            padding: 14,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <MaterialIcons name="info" size={18} color={colors.info} style={{ marginTop: 1 }} />
          <Text
            style={{
              flex: 1,
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.infoDeep,
              lineHeight: 18,
            }}
          >
            เบี้ยตัวชี้วัดนี้แสดงแบบไม่ใช่วิธีคำนวณเบี้ยจริง — เป็นเครื่องมือช่วยวางแผนงบประมาณ{' '}
            <Text style={{ color: colors.primary, fontFamily: fontFamily.anuphan.semiBold }}>
              ดูรายละเอียดกรมธรรม์
            </Text>
          </Text>
        </View>

        {/* Income + premium rows */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          <DataRow
            icon="person"
            label="รายได้ต่อปี (ประมาณ)"
            value={`฿${annualIncome.toLocaleString('en-US')}`}
          />
          <View style={{ height: 1, backgroundColor: colors.hairline, marginLeft: 50 }} />
          <DataRow
            icon="favorite-border"
            label="เบี้ยประกันต่อปี"
            value={`฿${annualPremium.toLocaleString('en-US')}`}
          />
        </View>

        {/* Amber warning card */}
        <View
          style={{
            backgroundColor: colors.amberTint,
            borderRadius: radius.card,
            padding: 16,
            flexDirection: 'row',
            gap: 12,
            alignItems: 'flex-start',
            ...cardShadow,
          }}
        >
          <MaterialIcons name="trending-up" size={22} color={colors.amber} style={{ marginTop: 2 }} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: fontSize.bodyMd,
                color: colors.amberDeeper,
              }}
            >
              ภายในปี 2574 เบี้ยจะเป็น 15.2% ของรายได้
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.amberDeep,
                lineHeight: 18,
              }}
            >
              หากรายได้เพิ่มขึ้นช้ากว่าเบี้ย อัตราส่วนจะเข้าสู่โซนระวัง
              แนะนำให้ปรับแผนก่อนถึงจุดนั้น — แต่ยังมีหลายทางเลือก
            </Text>
          </View>
        </View>

        {/* Action rows */}
        <View style={{ gap: 8 }}>
          <Text
            style={{
              fontFamily: fontFamily.jakarta.bold,
              fontSize: 11,
              color: colors.textSecondary,
              textTransform: 'uppercase',
              letterSpacing: 0.6,
              marginLeft: 4,
            }}
          >
            ทางเลือกสำหรับคุณ — ปรับได้ดีกว่าเลิกกรมธรรม์
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              overflow: 'hidden',
              ...cardShadow,
            }}
          >
            <ListRow
              icon="tune"
              title="ปรับแผนความคุ้มครองให้พอดี"
              subtitle="ลดเบี้ยโดยยังคงความคุ้มครองที่จำเป็น"
              onPress={() => navigation.navigate('AdjustPlan')}
            />
            <View style={{ height: 1, backgroundColor: colors.hairline, marginLeft: 50 }} />
            <ListRow
              icon="event-repeat"
              title="เปลี่ยนงวดการชำระ"
              subtitle="ชำระรายปีแทนรายเดือน ประหยัดสูงสุด ฿1,530/ปี"
              onPress={() => navigation.navigate('Costs')}
            />
          </View>
        </View>
      </ScrollView>

      {/* Sticky footer – red "ปรับแผนให้พอดีงบ" button */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.screenBg,
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: insets.bottom + 12,
          borderTopWidth: 1,
          borderTopColor: colors.hairline,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate('AdjustPlan')}
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
              fontSize: 16,
            }}
          >
            ปรับแผนให้พอดีงบ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ─── Sub-components ─── */

function TrackBar({ currentPct }: { currentPct: number }) {
  const clampedPct = Math.min(Math.max(currentPct, 0), 20);
  const dotPositionPct = (clampedPct / 20) * 100;

  return (
    <View style={{ gap: 6 }}>
      {/* Colored zone bar + thumb dot */}
      <View style={{ height: 20, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row', height: 10, borderRadius: 6, overflow: 'hidden' }}>
          {/* Green 0–10% → 50% width */}
          <View style={{ flex: 50, backgroundColor: '#4ADE80' }} />
          {/* Amber 10–15% → 25% width */}
          <View style={{ flex: 25, backgroundColor: '#FBBF24' }} />
          {/* Red 15–20% → 25% width */}
          <View style={{ flex: 25, backgroundColor: colors.primary }} />
        </View>
        {/* Thumb dot */}
        <View
          style={{
            position: 'absolute',
            left: `${dotPositionPct}%` as any,
            transform: [{ translateX: -9 }],
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: colors.ink,
            borderWidth: 3,
            borderColor: colors.white,
            top: 1,
          }}
        />
      </View>
      {/* Axis labels */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={labelStyle}>0%</Text>
        <Text style={labelStyle}>ปลอดภัย≤10%</Text>
        <Text style={labelStyle}>เสี่ยง≥15%</Text>
        <Text style={labelStyle}>20%</Text>
      </View>
    </View>
  );
}

const labelStyle = {
  fontFamily: fontFamily.jakarta.medium,
  fontSize: 9,
  color: colors.textSecondary,
} as const;

function ZoneLegend({ color, label }: { color: string; label: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
      <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: color }} />
      <Text
        style={{
          fontFamily: fontFamily.anuphan.regular,
          fontSize: fontSize.caption,
          color: colors.textSecondary,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

function DataRow({
  icon,
  label,
  value,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  value: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
        gap: 12,
      }}
    >
      <MaterialIcons name={icon} size={20} color={colors.textSecondary} />
      <Text
        style={{
          flex: 1,
          fontFamily: fontFamily.anuphan.regular,
          fontSize: fontSize.bodyMd,
          color: colors.inkBody,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily.jakarta.bold,
          fontSize: fontSize.bodyMd,
          color: colors.ink2,
          letterSpacing: -0.2,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
