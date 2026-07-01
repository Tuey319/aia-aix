import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { BarChart } from '../../components/BarChart';
import { useAppStore } from '../../store';
import { useStrings } from '../../i18n';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Illustration'>;

const CASH_VALUE_DATA = [
  { label: '40', value: 300000 },
  { label: '50', value: 650000 },
  { label: '60', value: 1020000 },
  { label: '75', value: 1840000 },
  { label: '90', value: 2650000, isLast: true, color: colors.successDeep },
];

interface ValueRowProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  iconColor: string;
  label: string;
  value: string;
}

function ValueRow({ icon, iconColor, label, value }: ValueRowProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 13,
        gap: 12,
      }}
    >
      <MaterialIcons name={icon} size={20} color={iconColor} />
      <Text
        style={{
          flex: 1,
          fontFamily: fontFamily.anuphan.medium,
          fontSize: 14,
          color: colors.inkBody,
        }}
      >
        {label}
      </Text>
      <Text
        style={{
          fontFamily: fontFamily.jakarta.bold,
          fontSize: 14,
          color: colors.ink2,
          letterSpacing: -0.2,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

export function IllustrationScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const s = useStrings();
  const policy = useAppStore((st) => st.selectedPolicy);

  const totalPremium20yr = policy.annualPremium * 20;

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
            fontSize: 17,
            color: colors.ink,
          }}
        >
          {s.illustration.title}
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
        {/* Dark gradient hero card */}
        <LinearGradient
          colors={[colors.ink, '#2a1020']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            borderRadius: radius.cardLg,
            padding: 20,
            gap: 14,
          }}
        >
          {/* Policy name + type */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                backgroundColor: 'rgba(211,17,69,0.25)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="shield" size={16} color={colors.primary} />
            </View>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: 13,
                color: 'rgba(255,255,255,0.7)',
              }}
            >
              {policy.nameTh} · {s.illustration.productType}
            </Text>
          </View>

          {/* "ทุนประกันชีวิต" label + big amount */}
          <View>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: 12,
                color: 'rgba(255,255,255,0.5)',
                marginBottom: 4,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}
            >
              {s.illustration.sumAssured}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.extraBold,
                fontSize: 38,
                color: colors.white,
                letterSpacing: -1.2,
              }}
            >
              ฿{policy.sumAssured.toLocaleString('en-US')}
            </Text>
          </View>

          {/* Two chips */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                borderRadius: radius.pill,
                paddingHorizontal: 12,
                paddingVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <MaterialIcons name="event" size={13} color="rgba(255,255,255,0.6)" />
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.medium,
                  fontSize: 12,
                  color: colors.white,
                }}
              >
                {s.illustration.payUntil('60')}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.12)',
                borderRadius: radius.pill,
                paddingHorizontal: 12,
                paddingVertical: 5,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <MaterialIcons name="hourglass-bottom" size={13} color="rgba(255,255,255,0.6)" />
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.medium,
                  fontSize: 12,
                  color: colors.white,
                }}
              >
                {s.illustration.matureAt('90')}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* Premium section */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 11,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}
            >
              {s.illustration.premiumSection}
            </Text>
          </View>
          <View style={{ height: 1, backgroundColor: colors.hairline, marginHorizontal: 16 }} />
          <View style={{ paddingHorizontal: 16 }}>
            <ValueRow
              icon="event-repeat"
              iconColor={colors.primary}
              label={s.illustration.annualPremium}
              value={`฿${policy.annualPremium.toLocaleString('en-US')}`}
            />
            <View style={{ height: 1, backgroundColor: colors.hairline }} />
            <ValueRow
              icon="savings"
              iconColor={colors.primary}
              label={s.illustration.totalPremium('20')}
              value={`฿${totalPremium20yr.toLocaleString('en-US')}`}
            />
          </View>
          <View style={{ height: 8 }} />
        </View>

        {/* Value & Benefits section with "Illustration" amber badge */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          <View
            style={{
              paddingHorizontal: 16,
              paddingTop: 14,
              paddingBottom: 4,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 11,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: 0.8,
              }}
            >
              {s.illustration.valueSection}
            </Text>
            {/* Amber "Illustration" badge */}
            <View
              style={{
                backgroundColor: colors.goldTint,
                borderRadius: 4,
                paddingHorizontal: 6,
                paddingVertical: 2,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.mono.semiBold,
                  fontSize: 9,
                  color: colors.gold,
                  letterSpacing: 1.2,
                  textTransform: 'uppercase',
                }}
              >
                Illustration
              </Text>
            </View>
          </View>

          <View style={{ height: 1, backgroundColor: colors.hairline, marginHorizontal: 16 }} />
          <View style={{ paddingHorizontal: 16 }}>
            <ValueRow
              icon="currency-exchange"
              iconColor={colors.info}
              label={s.illustration.cashSurrender}
              value="฿96,000"
            />
            <View style={{ height: 1, backgroundColor: colors.hairline }} />
            <ValueRow
              icon="trending-up"
              iconColor={colors.success}
              label={s.illustration.annualCashValue}
              value="~฿62,000"
            />
            <View style={{ height: 1, backgroundColor: colors.hairline }} />
            <ValueRow
              icon="star"
              iconColor={colors.gold}
              label={s.illustration.maturityValue('90')}
              value="฿2,650,000"
            />
          </View>
          <View style={{ height: 8 }} />
        </View>

        {/* Bar chart across 5 age points */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 18,
            gap: 14,
            ...cardShadow,
          }}
        >
          <View>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: 14,
                color: colors.ink2,
                marginBottom: 2,
              }}
            >
              {s.illustration.chartTitle}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: 12,
                color: colors.textSecondary,
              }}
            >
              {s.illustration.chartSub}
            </Text>
          </View>

          <BarChart
            data={CASH_VALUE_DATA}
            height={110}
            formatValue={(v) => `฿${(v / 1000000).toFixed(2)}M`}
            labelColor={colors.amberDeep}
          />

          {/* Disclaimer note */}
          <View
            style={{
              backgroundColor: colors.goldTint,
              borderRadius: 8,
              padding: 10,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: 11,
                color: colors.amberDeeper,
                lineHeight: 16,
              }}
            >
              {s.illustration.disclaimer}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Sticky footer button */}
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
            {s.illustration.adjustBtn}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
