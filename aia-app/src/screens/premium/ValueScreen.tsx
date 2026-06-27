import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow } from '../../tokens/shadows';
import { StatusPill } from '../../components/StatusPill';
import { useAppStore } from '../../store';

export function ValueScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();
  const policy = useAppStore((s) => s.selectedPolicy);

  const paidToDate = 148000;
  const multiplier = Math.round(policy.sumAssured / paidToDate);
  const claimReceived = 18400;
  const claimPct = Math.round((claimReceived / policy.annualPremium) * 100);

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
          คุณค่าที่ได้รับ
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 32,
          gap: cardGap,
        }}
      >
        {/* Green hero card */}
        <View
          style={{
            backgroundColor: colors.successDeep,
            borderRadius: radius.cardLg,
            padding: 20,
            gap: 14,
            ...cardShadow,
          }}
        >
          {/* Top row: shield icon + pill */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                backgroundColor: 'rgba(255,255,255,0.18)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="shield" size={22} color={colors.white} />
            </View>
            <StatusPill label="คุ้มครองอยู่" variant="success" />
          </View>

          {/* Paid label */}
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.body,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            คุณจ่ายเบี้ยสะสมแล้ว ฿{paidToDate.toLocaleString('en-US')} และได้รับความคุ้มครอง
          </Text>

          {/* Big number */}
          <Text
            style={{
              fontFamily: fontFamily.jakarta.extraBold,
              fontSize: 42,
              color: colors.white,
              letterSpacing: -1.5,
              lineHeight: 46,
            }}
          >
            ฿{policy.sumAssured.toLocaleString('en-US')}
          </Text>

          {/* Ratio row */}
          <View
            style={{
              backgroundColor: 'rgba(255,255,255,0.15)',
              borderRadius: 10,
              paddingHorizontal: 14,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <MaterialIcons name="show-chart" size={18} color="rgba(255,255,255,0.8)" />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.bodyMd,
                color: colors.white,
              }}
            >
              ทุก ฿1 ที่จ่าย = ฿{multiplier} ความคุ้มครอง
            </Text>
          </View>
        </View>

        {/* Coverage breakdown card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 10 }}>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 11,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
              }}
            >
              ความคุ้มครองที่คุณได้รับ
            </Text>
          </View>

          <View style={{ height: 1, backgroundColor: colors.hairline, marginHorizontal: 16 }} />

          <CoverageRow
            icon="shield"
            title="คุ้มครองชีวิต"
            subtitle="จ่ายเมื่อเสียชีวิตหรือทุพพลภาพ"
            value="฿2,000,000"
          />
          <View style={{ height: 1, backgroundColor: colors.hairline, marginLeft: 50 }} />
          <CoverageRow
            icon="local-hospital"
            title="ค่ารักษาพยาบาล"
            subtitle="ผู้ป่วยใน ผู้ป่วยนอก"
            value="฿1,000,000"
          />
          <View style={{ height: 1, backgroundColor: colors.hairline, marginLeft: 50 }} />
          <CoverageRow
            icon="favorite"
            title="โรคร้ายแรง"
            subtitle="เช็คมาตรฐานครบวงจร"
            value="฿500,000"
          />
          <View style={{ height: 8 }} />
        </View>

        {/* Claims card */}
        <View
          style={{
            backgroundColor: colors.successTint,
            borderRadius: radius.card,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            ...cardShadow,
          }}
        >
          <MaterialIcons name="check-circle" size={28} color={colors.success} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: fontSize.bodyMd,
                color: colors.successDeep,
              }}
            >
              เคลมที่ได้รับสมส่วนปีนี้ ฿{claimReceived.toLocaleString('en-US')}
            </Text>
            <StatusPill label={`${claimPct}% ของเบี้ยปีนี้`} variant="success" />
          </View>
        </View>

        {/* Motivational text */}
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 4,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.bodyMd,
              color: colors.textSecondary,
              textAlign: 'center',
              lineHeight: 22,
            }}
          >
            เบี้ยที่จ่ายไม่ได้หายไปไหน — มันคือความเตรียมพร้อม
            ปกป้องคุณและครอบครัวในวันที่ไม่มีใครคาดคิด
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ─── Sub-components ─── */

function CoverageRow({
  icon,
  title,
  subtitle,
  value,
}: {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
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
      <MaterialIcons name={icon} size={22} color={colors.primary} />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.semiBold,
            fontSize: fontSize.bodyMd,
            color: colors.ink2,
          }}
        >
          {title}
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.caption,
            color: colors.textSecondary,
          }}
        >
          {subtitle}
        </Text>
      </View>
      <Text
        style={{
          fontFamily: fontFamily.jakarta.bold,
          fontSize: fontSize.bodyMd,
          color: colors.ink2,
          letterSpacing: -0.3,
        }}
      >
        {value}
      </Text>
    </View>
  );
}
