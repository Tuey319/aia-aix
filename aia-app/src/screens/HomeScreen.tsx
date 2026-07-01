import { useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../tokens';
import { cardShadow, primaryButtonShadow } from '../tokens/shadows';
import { StatusPill } from '../components/StatusPill';
import { AiaLogo } from '../components/AiaLogo';
import { useAppStore } from '../store';
import { useStrings } from '../i18n';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_W = SCREEN_WIDTH - screenPadding * 2;
const BANNER_H = Math.round(BANNER_W * (956 / 1746));

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const AD_BANNERS = [
  { id: '1', source: require('../../assets/ad-health.png') },
  { id: '2', source: require('../../assets/ad-life.png') },
  { id: '3', source: require('../../assets/ad-travel.png') },
];

function AdBanner({ source }: { source: number }) {
  return (
    <Image
      source={source}
      resizeMode="cover"
      style={{
        width: BANNER_W,
        height: BANNER_H,
        borderRadius: 22,
      }}
    />
  );
}

export function HomeScreen() {
  const navigation = useNavigation<Nav>();
  const policy = useAppStore((s) => s.selectedPolicy);
  const language = useAppStore((s) => s.language);
  const s = useStrings();
  const [activeIndex, setActiveIndex] = useState(0);
  const flatRef = useRef<FlatList>(null);

  function onScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    setActiveIndex(Math.round(e.nativeEvent.contentOffset.x / (BANNER_W + 12)));
  }

  // Exactly 6 services from design spec (Figma frame 41:532)
  const SERVICES = [
    { icon: 'payment' as const,        label: s.home.svcPay,     screen: 'PaySelect' as const },
    { icon: 'shield' as const,         label: s.home.svcCard,    screen: 'PaySelect' as const },
    { icon: 'local-hospital' as const, label: s.home.svcClaim,   screen: 'PaySelect' as const },
    { icon: 'location-on' as const,    label: s.home.svcAddress, screen: 'PaySelect' as const },
    { icon: 'download' as const,       label: s.home.svcDocs,    screen: 'PaySelect' as const },
    { icon: 'apps' as const,           label: s.home.svcAll,     screen: 'Assistant' as const },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* ── Header ─────────────────────────────────────────── */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: screenPadding,
            paddingTop: 12,
            paddingBottom: 16,
          }}
        >
          <View>
            <AiaLogo size={22} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: 20,
                color: colors.ink,
                marginTop: 1,
              }}
            >
              {s.home.greeting}
            </Text>
          </View>

          {/* Bell with red notification badge */}
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications' as any)}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: colors.card,
              alignItems: 'center',
              justifyContent: 'center',
              ...cardShadow,
            }}
          >
            <MaterialIcons name="notifications-none" size={22} color={colors.ink2} />
            {/* Red badge */}
            <View
              style={{
                position: 'absolute',
                top: 6,
                right: 6,
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 1.5,
                borderColor: colors.card,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.extraBold,
                  fontSize: 8,
                  color: colors.white,
                  lineHeight: 10,
                }}
              >
                5
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Ad Carousel ─────────────────────────────────────── */}
        <FlatList
          ref={flatRef}
          data={AD_BANNERS}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={BANNER_W + 12}
          snapToAlignment="start"
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: screenPadding, gap: 12 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <AdBanner source={item.source} />}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />

        {/* Dots */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
            marginTop: 10,
          }}
        >
          {AD_BANNERS.map((_, i) => (
            <View
              key={i}
              style={{
                width: i === activeIndex ? 16 : 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: i === activeIndex ? colors.primary : colors.textTertiary,
              }}
            />
          ))}
        </View>

        {/* ── Finance Hub ──────────────────────────────────────── */}
        <View style={{ paddingHorizontal: screenPadding, marginTop: 20 }}>
          {/* Section header */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: 16,
                color: colors.ink,
              }}
            >
              {s.home.financeSection}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('PremiumMgmt')}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: 13,
                  color: colors.primary,
                }}
              >
                {s.home.managePremium}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Finance Card */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              ...cardShadow,
            }}
          >
            <View
              style={{
                width: 38,
                height: 38,
                borderRadius: 11,
                backgroundColor: colors.primaryTint,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="account-balance-wallet" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  marginBottom: 2,
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.medium,
                    fontSize: 12,
                    color: colors.textSecondary,
                  }}
                >
                  {s.home.amountDue}
                </Text>
                <StatusPill label={`ครบกำหนด ${policy.dueDate}`} variant="amber" />
              </View>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.extraBold,
                  fontSize: 22,
                  color: colors.ink,
                  letterSpacing: -0.5,
                }}
              >
                ฿{policy.monthlyPremium.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('PaySelect')}
              activeOpacity={0.82}
              style={{
                backgroundColor: colors.primary,
                borderRadius: 11,
                paddingHorizontal: 16,
                paddingVertical: 9,
                ...primaryButtonShadow,
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.anuphan.bold,
                  fontSize: 13,
                  letterSpacing: 0.1,
                }}
              >
                {s.home.pay}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Coverage Expansion row */}
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => navigation.navigate('PayCoverage')}
            style={{
              backgroundColor: colors.primaryTint,
              borderRadius: radius.card,
              padding: 14,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              marginTop: cardGap,
              borderWidth: 1,
              borderColor: colors.primaryTintDark,
            }}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                backgroundColor: colors.primaryTintDark,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="add" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.bold,
                  fontSize: 14,
                  color: colors.primaryDeep,
                  marginBottom: 2,
                }}
              >
                {s.home.addCoverage}
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: 11,
                  color: colors.primary,
                }}
              >
                {s.home.addCoverageSub}
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* ── Services Grid ────────────────────────────────────── */}
        <View style={{ paddingHorizontal: screenPadding, marginTop: 24 }}>
          <Text
            style={{
              fontFamily: fontFamily.anuphan.bold,
              fontSize: 16,
              color: colors.ink,
              marginBottom: 14,
            }}
          >
            {s.home.services}
          </Text>
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              paddingVertical: 8,
              paddingHorizontal: 4,
              ...cardShadow,
            }}
          >
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {SERVICES.map((svc, i) => (
                <TouchableOpacity
                  key={i}
                  onPress={() => (navigation as any).navigate(svc.screen)}
                  activeOpacity={0.7}
                  style={{ width: '33.33%', alignItems: 'center', paddingVertical: 16, gap: 8 }}
                >
                  <View
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: 14,
                      backgroundColor: colors.primaryTint,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <MaterialIcons name={svc.icon} size={24} color={colors.primary} />
                  </View>
                  <Text
                    style={{
                      fontFamily: fontFamily.anuphan.semiBold,
                      fontSize: 11,
                      color: colors.inkBody2,
                      textAlign: 'center',
                    }}
                  >
                    {svc.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* ── AI Celebration section (below fold) ──────────────── */}
        <TouchableOpacity
          onPress={() => navigation.navigate('AICelebrationHub')}
          activeOpacity={0.88}
          style={{ marginHorizontal: screenPadding, marginBottom: 8 }}
        >
          <View style={{ backgroundColor: colors.ink, borderRadius: 18, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
            <View style={{ width: 46, height: 46, borderRadius: 13, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
              <AiaLogo size={32} />
            </View>
            <View style={{ flex: 1, gap: 2 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 14, color: colors.white }}>AI Celebration ✨</Text>
                <View style={{ backgroundColor: colors.primary, borderRadius: 99, paddingHorizontal: 7, paddingVertical: 2 }}>
                  <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 8, color: colors.white, letterSpacing: 0.3 }}>{language === 'en' ? 'New' : 'ใหม่'}</Text>
                </View>
              </View>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 11, color: 'rgba(255,255,255,0.55)' }}>
                {language === 'en' ? 'Badges · Journey · Gratitude Letter' : 'เหรียญรางวัล · การเดินทาง · จดหมายขอบคุณ'}
              </Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.4)" />
          </View>
        </TouchableOpacity>

        <View style={{ height: 24 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
