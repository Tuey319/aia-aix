import React, { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/types';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../tokens';
import { cardShadow, primaryButtonShadow } from '../tokens/shadows';
import { StatusPill } from '../components/StatusPill';
import { useAppStore } from '../store';
import { useStrings } from '../i18n';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_W = SCREEN_WIDTH - screenPadding * 2;
const BANNER_H = 150;

type Nav = NativeStackNavigationProp<HomeStackParamList, 'Home'>;

const AD_BANNERS = [
  { id: '1', color: '#D31145', accent: '#9E0E34', taglineTh: 'สุขภาพดีวันนี้\nเพื่อที่ดีกว่าในอนาคต', taglineEn: 'Better health today\nfor a better tomorrow', sub: 'AIA Vitality' },
  { id: '2', color: '#2A6FDB', accent: '#1C4F9E', taglineTh: 'เพิ่มทุนประกัน\nไม่ต้องตรวจสุขภาพ', taglineEn: 'Add coverage\nNo health exam required', sub: 'AIA Marketplace' },
  { id: '3', color: '#1B9E5A', accent: '#0E5A35', taglineTh: 'ครบกำหนดชำระ\nอย่าลืมชำระเบี้ย', taglineEn: 'Payment due\nDon\'t miss your premium', sub: 'Pay via app' },
];

function AdBanner({ color, accent, tagline, sub }: { color: string; accent: string; tagline: string; sub: string }) {
  return (
    <View style={{ width: BANNER_W, height: BANNER_H, borderRadius: 22, backgroundColor: color, overflow: 'hidden', padding: 20, justifyContent: 'flex-end' }}>
      <View style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: 70, backgroundColor: accent, opacity: 0.5 }} />
      <View style={{ position: 'absolute', right: 20, top: 20, width: 80, height: 80, borderRadius: 40, backgroundColor: colors.white, opacity: 0.08 }} />
      <View style={{ position: 'absolute', top: 16, left: 16 }}>
        <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 12, color: colors.white, letterSpacing: 1 }}>AIA</Text>
      </View>
      <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 18, color: colors.white, lineHeight: 26, marginBottom: 4 }}>{tagline}</Text>
      <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: 'rgba(255,255,255,0.80)' }}>{sub}</Text>
    </View>
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

  const SERVICES = [
    { icon: 'payment' as const, label: s.home.svcPay, screen: 'PaySelect' as const },
    { icon: 'shield' as const, label: s.home.svcCard, screen: 'PaySelect' as const },
    { icon: 'local-hospital' as const, label: s.home.svcClaim, screen: 'PaySelect' as const },
    { icon: 'location-on' as const, label: s.home.svcAddress, screen: 'PaySelect' as const },
    { icon: 'download' as const, label: s.home.svcDocs, screen: 'PaySelect' as const },
    { icon: 'smart-toy' as const, label: s.home.svcAll, screen: 'Assistant' as const },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16 }}>
          <View>
            <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 11, color: colors.primary, letterSpacing: 1.5, textTransform: 'uppercase' }}>AIA</Text>
            <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 20, color: colors.ink, marginTop: 1 }}>{s.home.greeting}</Text>
          </View>
          <TouchableOpacity style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: colors.card, alignItems: 'center', justifyContent: 'center', ...cardShadow }}>
            <MaterialIcons name="notifications-none" size={22} color={colors.ink2} />
          </TouchableOpacity>
        </View>

        {/* Ad Carousel */}
        <FlatList
          ref={flatRef}
          data={AD_BANNERS}
          horizontal pagingEnabled showsHorizontalScrollIndicator={false}
          snapToInterval={BANNER_W + 12} decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: screenPadding, gap: 12 }}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AdBanner
              color={item.color}
              accent={item.accent}
              tagline={language === 'th' ? item.taglineTh : item.taglineEn}
              sub={item.sub}
            />
          )}
          onScroll={onScroll}
          scrollEventThrottle={16}
        />

        {/* Dots */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 5, marginTop: 10 }}>
          {AD_BANNERS.map((_, i) => (
            <View key={i} style={{ width: i === activeIndex ? 16 : 6, height: 6, borderRadius: 3, backgroundColor: i === activeIndex ? colors.primary : colors.textTertiary }} />
          ))}
        </View>

        {/* Finance Hub */}
        <View style={{ paddingHorizontal: screenPadding, marginTop: 20 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 13, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.6 }}>{s.home.financeSection}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('PremiumMgmt')}>
              <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 13, color: colors.primary }}>{s.home.managePremium}</Text>
            </TouchableOpacity>
          </View>

          {/* Finance Card */}
          <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, ...cardShadow }}>
            <View style={{ width: 38, height: 38, borderRadius: 11, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons name="account-balance-wallet" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 12, color: colors.textSecondary }}>{s.home.amountDue}</Text>
                <StatusPill label={`ครบกำหนด ${policy.dueDate}`} variant="amber" />
              </View>
              <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 22, color: colors.ink, letterSpacing: -0.5 }}>
                ฿{policy.monthlyPremium.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('PaySelect')} activeOpacity={0.82}
              style={{ backgroundColor: colors.primary, borderRadius: 11, paddingHorizontal: 16, paddingVertical: 9, ...primaryButtonShadow }}>
              <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 13, letterSpacing: 0.1 }}>{s.home.pay}</Text>
            </TouchableOpacity>
          </View>

          {/* Coverage Expansion */}
          <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('PayCoverage')}
            style={{ backgroundColor: colors.primaryTint, borderRadius: radius.card, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: cardGap, borderWidth: 1, borderColor: colors.primaryTintDark }}>
            <View style={{ width: 34, height: 34, borderRadius: 10, backgroundColor: colors.primaryTintDark, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons name="add" size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 14, color: colors.primaryDeep, marginBottom: 2 }}>{s.home.addCoverage}</Text>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 11, color: colors.primary }}>{s.home.addCoverageSub}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Services Grid */}
        <View style={{ paddingHorizontal: screenPadding, marginTop: 24 }}>
          <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 13, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 14 }}>{s.home.services}</Text>
          <View style={{ backgroundColor: colors.card, borderRadius: radius.card, paddingVertical: 8, paddingHorizontal: 4, ...cardShadow }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {SERVICES.map((svc, i) => (
                <TouchableOpacity key={i} onPress={() => (navigation as any).navigate(svc.screen)} activeOpacity={0.7}
                  style={{ width: '33.33%', alignItems: 'center', paddingVertical: 16, gap: 8 }}>
                  <View style={{ width: 46, height: 46, borderRadius: 14, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialIcons name={svc.icon} size={24} color={colors.primary} />
                  </View>
                  <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 11, color: colors.inkBody2, textAlign: 'center' }}>{svc.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}
