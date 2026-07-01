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
} from '../../tokens';
import { cardShadow } from '../../tokens/shadows';
import { SectionGroup } from '../../components/SectionGroup';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;

const CURRENT_POINTS = 12_400;
const NEXT_TIER = 15_000;
const progressPct = CURRENT_POINTS / NEXT_TIER;

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
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  const EARN_ITEMS = [
    { icon: 'fitness-center' as const, title: s.vitality.exercise, subtitle: s.vitality.exerciseSub, points: '+50' },
    { icon: 'health-and-safety' as const, title: s.vitality.checkup, subtitle: s.vitality.checkupSub, points: '+1,000' },
    { icon: 'restaurant' as const, title: s.vitality.food, subtitle: s.vitality.foodSub, points: '+100' },
  ];

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
          {/* "สถานะ Gold" label + Gold badge */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.body,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {language === 'en' ? 'Gold Status' : 'สถานะ Gold'}
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

          {/* Big points — "12,400 คะแนน" on one line */}
          <Text
            style={{
              fontFamily: fontFamily.jakarta.extraBold,
              fontSize: 38,
              color: colors.white,
              letterSpacing: -1,
              lineHeight: 44,
            }}
          >
            {CURRENT_POINTS.toLocaleString('en-US')}{' '}
            <Text
              style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: 22,
                color: 'rgba(255,255,255,0.85)',
                letterSpacing: 0,
              }}
            >
              {s.vitality.points}
            </Text>
          </Text>

          {/* Progress bar to next tier */}
          <View style={{ gap: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {language === 'en' ? 'Next tier' : 'ระดับถัดไป'}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.caption,
                  color: colors.white,
                }}
              >
                {s.vitality.remainingTo('Platinum', (NEXT_TIER - CURRENT_POINTS).toLocaleString('en-US'))}
              </Text>
            </View>
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
          </View>

          {/* Two mini panels: discount this year / max discount */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
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
                {s.vitality.discountThisYear}
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
                {s.vitality.maxDiscount}
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

        {/* Earn more points section */}
        <SectionGroup label={s.vitality.earnMore}>
          {EARN_ITEMS.map((item, index) => (
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
                borderTopWidth: index > 0 ? 1 : 0,
                borderTopColor: colors.hairline,
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
