import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  colors,
  fontFamily,
  fontSize,
  radius,
  screenPadding,
  cardGap,
  cardShadow,
} from '../../tokens';
import { StatusPill } from '../../components/StatusPill';
import { SectionGroup } from '../../components/SectionGroup';
import { ListRow } from '../../components/ListRow';
import { useAppStore } from '../../store';
import { useStrings } from '../../i18n';

type Nav = NativeStackNavigationProp<any>;

export function PolicyScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const policy = useAppStore((s) => s.selectedPolicy);
  const language = useAppStore((s) => s.language);
  const s = useStrings();

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
          {policy.name}
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
        {/* White hero card – policy info + sum assured */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.cardLg,
            padding: 18,
            gap: 6,
            ...cardShadow,
          }}
        >
          {/* Policy number + status on same row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: fontFamily.mono.regular,
                fontSize: fontSize.caption,
                color: colors.textSecondary,
                letterSpacing: 0.5,
              }}
            >
              {policy.policyNo}
            </Text>
            <StatusPill label={s.policy.activeStatus} variant="success" />
          </View>

          {/* Plan name */}
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
            }}
          >
            {language === 'en' ? 'Insurance Policy' : 'กรมประกัน'}
          </Text>

          {/* Sum assured – big */}
          <Text
            style={{
              fontFamily: fontFamily.jakarta.extraBold,
              fontSize: 38,
              color: colors.ink,
              letterSpacing: -1,
              lineHeight: 44,
              marginTop: 2,
            }}
          >
            ฿{policy.sumAssured.toLocaleString('en-US')}
          </Text>
        </View>

        {/* Dark hero card – value ratio */}
        <View
          style={{
            backgroundColor: colors.ink,
            borderRadius: radius.cardLg,
            padding: 18,
            gap: 14,
            ...cardShadow,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.bodyMd,
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            {s.policy.valueRatio}
          </Text>

          {/* ฿1:฿49 ratio */}
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.extraBold,
                fontSize: 30,
                color: colors.white,
                letterSpacing: -0.8,
              }}
            >
              ฿1 : ฿49
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              {language === 'en' ? 'from coverage' : 'จาก ความคุ้มครอง'}
            </Text>
          </View>

          {/* Two stat panels */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {/* เคลมในปีนี้ */}
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: radius.button,
                padding: 12,
                gap: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {s.policy.claimsThisYear}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.bold,
                  fontSize: fontSize.title,
                  color: colors.white,
                }}
              >
                ฿38,500
              </Text>
            </View>

            {/* สิทธิ Vitality – tappable */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('Vitality')}
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.08)',
                borderRadius: radius.button,
                padding: 12,
                gap: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: 'rgba(255,255,255,0.55)',
                }}
              >
                {s.policy.vitalityBenefit}
              </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Text
                  style={{
                    fontFamily: fontFamily.jakarta.bold,
                    fontSize: fontSize.title,
                    color: colors.successDot,
                  }}
                >
                  ฿4,200
                </Text>
                <MaterialIcons name="chevron-right" size={16} color={colors.successDot} />
              </View>
            </TouchableOpacity>
          </View>

          {/* Green accent row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              backgroundColor: 'rgba(91,227,160,0.12)',
              borderRadius: radius.button,
              paddingHorizontal: 12,
              paddingVertical: 10,
            }}
          >
            <MaterialIcons name="trending-up" size={18} color={colors.successDot} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.body,
                color: colors.successDot,
                flex: 1,
              }}
            >
              {language === 'en' ? 'You received more than you paid this year' : 'คุณได้รับมากกว่าที่จ่ายในปีนี้'}
            </Text>
          </View>
        </View>

        {/* Coverage section */}
        <SectionGroup label={s.policy.coverageSection}>
          <ListRow
            icon="local-hospital"
            iconColor={colors.primary}
            title={s.policy.inpatient}
            right={
              <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: fontSize.bodyMd, color: colors.ink2 }}>
                {language === 'en' ? 'Full' : 'เต็มจำนวน'}
              </Text>
            }
            onPress={() => navigation.navigate('CoverageDetail')}
          />
          <ListRow
            icon="favorite"
            iconColor={colors.primary}
            title={s.policy.criticalIllness}
            right={
              <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: fontSize.bodyMd, color: colors.ink2 }}>
                ฿1,000,000
              </Text>
            }
            onPress={() => {}}
          />
          <ListRow
            icon="verified-user"
            iconColor={colors.primary}
            title={s.policy.lifeInsurance}
            right={
              <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: fontSize.bodyMd, color: colors.ink2 }}>
                ฿1,500,000
              </Text>
            }
            onPress={() => {}}
          />
        </SectionGroup>

        {/* Policy docs row */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          <ListRow
            icon="description"
            title={s.policy.documents}
            onPress={() => navigation.navigate('PolicyDocs')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
