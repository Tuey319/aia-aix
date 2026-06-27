import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
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
import { SectionGroup } from '../../components/SectionGroup';

type Nav = NativeStackNavigationProp<any>;

const CURRENT_POINTS = 12_400;
const NEXT_TIER = 15_000;
const progressPct = CURRENT_POINTS / NEXT_TIER;

interface EarnItem {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  points: string;
}

const EARN_ITEMS: EarnItem[] = [
  {
    icon: 'fitness-center',
    title: 'ออกกำลังกาย',
    subtitle: 'เชื่อมต่อแอปออกกำลังกาย สูงสุด 300/สัปดาห์',
    points: '+50',
  },
  {
    icon: 'health-and-safety',
    title: 'ตรวจสุขภาพประจำปี',
    subtitle: 'รับผลออนไลน์ผ่านแอป',
    points: '+1,000',
  },
  {
    icon: 'restaurant',
    title: 'เลือกรับประทานอาหารสุขภาพ',
    subtitle: 'สแกนที่ร้านที่ร่วมรายการ',
    points: '+100',
  },
];

function PointsPill({ label }: { label: string }) {
  return (
    <View
      style={{
        backgroundColor: colors.successTint,
        borderRadius: radius.pill,
        paddingHorizontal: 10,
        paddingVertical: 4,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.jakarta.bold,
          fontSize: fontSize.body,
          color: colors.successDeep,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

export function VitalityScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

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
          AIA Vitality
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
        {/* Large green hero card */}
        <View
          style={{
            backgroundColor: colors.success,
            borderRadius: radius.cardLg,
            padding: 20,
            gap: 16,
            ...cardShadow,
          }}
        >
          {/* Status row */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.body,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              สถานะเงิน
            </Text>
            <View
              style={{
                backgroundColor: colors.gold,
                borderRadius: radius.pill,
                paddingHorizontal: 12,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.bold,
                  fontSize: fontSize.caption,
                  color: colors.white,
                  letterSpacing: 0.4,
                }}
              >
                Gold
              </Text>
            </View>
          </View>

          {/* Big points */}
          <View>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.extraBold,
                fontSize: 40,
                color: colors.white,
                letterSpacing: -1,
                lineHeight: 44,
              }}
            >
              {CURRENT_POINTS.toLocaleString('en-US')}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.bodyMd,
                color: 'rgba(255,255,255,0.75)',
                marginTop: 2,
              }}
            >
              คะแนน
            </Text>
          </View>

          {/* Progress bar to next tier */}
          <View style={{ gap: 8 }}>
            <View
              style={{
                height: 8,
                backgroundColor: 'rgba(255,255,255,0.25)',
                borderRadius: radius.pill,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${(progressPct * 100).toFixed(1)}%` as any,
                  height: '100%',
                  backgroundColor: colors.white,
                  borderRadius: radius.pill,
                }}
              />
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {CURRENT_POINTS.toLocaleString('en-US')} คะแนน
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.caption,
                  color: colors.white,
                }}
              >
                เหลืออีก {(NEXT_TIER - CURRENT_POINTS).toLocaleString('en-US')} → Platinum
              </Text>
            </View>
          </View>

          {/* Discount row */}
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}
          >
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: radius.button,
                padding: 12,
                gap: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                ส่วนลดปีนี้
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.bold,
                  fontSize: fontSize.title,
                  color: colors.white,
                }}
              >
                ฿4,200
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: radius.button,
                padding: 12,
                gap: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: 'rgba(255,255,255,0.65)',
                }}
              >
                ส่วนลดสูงสุด
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.bold,
                  fontSize: fontSize.title,
                  color: colors.white,
                }}
              >
                15%
              </Text>
            </View>
          </View>
        </View>

        {/* Earn more points */}
        <SectionGroup label="สะสมคะแนนเพิ่ม">
          {EARN_ITEMS.map((item) => (
            <TouchableOpacity
              key={item.title}
              activeOpacity={0.75}
              onPress={() => Alert.alert(item.title, item.subtitle)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingVertical: 14,
                paddingHorizontal: 16,
                gap: 12,
              }}
            >
              <MaterialIcons name={item.icon} size={22} color={colors.success} />
              <View style={{ flex: 1, gap: 2 }}>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.semiBold,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink2,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.regular,
                    fontSize: fontSize.caption,
                    color: colors.textSecondary,
                    lineHeight: fontSize.caption * 1.4,
                  }}
                >
                  {item.subtitle}
                </Text>
              </View>
              <PointsPill label={item.points} />
            </TouchableOpacity>
          ))}
        </SectionGroup>
      </ScrollView>
    </SafeAreaView>
  );
}
