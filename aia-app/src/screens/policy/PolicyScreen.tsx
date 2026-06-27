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

type Nav = NativeStackNavigationProp<any>;

export function PolicyScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const policy = useAppStore((s) => s.selectedPolicy);

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
        {/* Hero Card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.cardLg,
            padding: 18,
            gap: 10,
            ...cardShadow,
          }}
        >
          {/* Policy number + status */}
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
            <StatusPill label="คุ้มครองอยู่" variant="success" />
          </View>

          {/* Sum assured */}
          <Text
            style={{
              fontFamily: fontFamily.jakarta.extraBold,
              fontSize: 38,
              color: colors.ink,
              letterSpacing: -1,
              lineHeight: 42,
            }}
          >
            ฿{policy.sumAssured.toLocaleString('en-US')}
          </Text>
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
              marginTop: -6,
            }}
          >
            วงเงินคุ้มครองรวม
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
            มูลค่าความคุ้มครองต่อคุณในปีนี้
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.extraBold,
                fontSize: 30,
                color: colors.white,
                letterSpacing: -0.8,
              }}
            >
              ฿1:฿49
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: 'rgba(255,255,255,0.55)',
              }}
            >
              จากความคุ้มครองทั้งหมด
            </Text>
          </View>

          {/* Two columns */}
          <View style={{ flexDirection: 'row', gap: 12 }}>
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
                เคลมในปีนี้
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
                สิทธิ Vitality
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
                <MaterialIcons name="arrow-forward" size={14} color={colors.successDot} />
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
              คุณได้รับมากกว่าที่จ่ายในปีนี้
            </Text>
          </View>
        </View>

        {/* Coverage section */}
        <SectionGroup label="ความคุ้มครอง">
          <ListRow
            icon="local-hospital"
            title="ค่ารักษาผู้ป่วยใน"
            subtitle="เต็มจำนวน"
            onPress={() => navigation.navigate('CoverageDetail')}
          />
          <ListRow
            icon="favorite"
            title="โรคร้ายแรง"
            subtitle="฿1,000,000"
            onPress={() => {}}
          />
          <ListRow
            icon="verified-user"
            title="คุ้มครองชีวิต"
            subtitle="฿1,500,000"
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
            title="เอกสารกรมธรรม์"
            subtitle="ดาวน์โหลดเอกสารและใบเสร็จ"
            onPress={() => navigation.navigate('PolicyDocs')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
