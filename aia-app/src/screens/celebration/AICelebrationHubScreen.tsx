/**
 * AI Celebration Hub — main entry point for the full AI Celebration ecosystem.
 * Delight Mak doc: Left panel "AI CELEBRATION ECOSYSTEM" with 4 sections.
 * Accessible from Home → "AI Celebration" card or BadgeCollection header.
 */
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { AIRobotMascot } from '../../components/illustrations';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;

interface HubSection {
  num: string;
  title: string;
  titleEn: string;
  desc: string;
  descEn: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
  bg: string;
  screen: string;
}

const SECTIONS: HubSection[] = [
  {
    num: '01',
    title: 'ฉลองความสำเร็จ',
    titleEn: 'Milestone Celebration',
    desc: 'ฉลองทุกครั้งที่ชำระตรงเวลา พร้อม confetti และ AI ร่วมยินดี',
    descEn: 'Celebrate every on-time payment with confetti and AI congratulations.',
    icon: 'celebration',
    color: colors.primary,
    bg: colors.primaryTint,
    screen: 'Celebration',
  },
  {
    num: '02',
    title: 'เรื่องราวการคุ้มครอง',
    titleEn: 'Protection Story',
    desc: 'ย้อนดูการเดินทางและสิ่งที่ AIA ปกป้องคุณมาทั้งปี',
    descEn: 'Look back at your journey and what AIA has protected you from all year.',
    icon: 'timeline',
    color: colors.info,
    bg: colors.infoTint,
    screen: 'ProtectionJourney',
  },
  {
    num: '03',
    title: 'สะสมเหรียญรางวัล',
    titleEn: 'Badge Collection',
    desc: 'สะสม badge จากพฤติกรรมดี เช่น Always On Time, Health Lover',
    descEn: 'Collect badges for good behaviour — Always On Time, Health Lover, and more.',
    icon: 'emoji-events',
    color: colors.gold,
    bg: colors.goldTint,
    screen: 'BadgeCollection',
  },
  {
    num: '04',
    title: 'จดหมายขอบคุณ',
    titleEn: 'Gratitude Letters',
    desc: 'รับจดหมายส่วนตัวจาก AI ที่บอกเล่าสิ่งที่คุณทำเพื่อคนที่รัก',
    descEn: 'Receive a personal AI letter sharing what you have done for your loved ones.',
    icon: 'mail',
    color: '#E91E8C',
    bg: '#FFF0F5',
    screen: 'GratitudeLetter',
  },
];

export function AICelebrationHubScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const language = useAppStore((state) => state.language);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8FC' }} edges={['top']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>AI Celebration ✨</Text>
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 11, color: colors.textSecondary }}>{language === 'en' ? 'Every payment is a promise.' : 'ทุกการชำระคือคำสัญญา'}</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 32, gap: cardGap }}>
        {/* Hero */}
        <LinearGradient colors={[colors.primary, '#8B0030']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={{ borderRadius: 22, padding: 24, alignItems: 'center', gap: 14 }}>
          <AIRobotMascot size={90} animated />
          <View style={{ alignItems: 'center', gap: 6 }}>
            <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 24, color: '#fff', textAlign: 'center', letterSpacing: -0.5 }}>
              AI Celebration
            </Text>
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 13, color: 'rgba(255,255,255,0.75)', textAlign: 'center' }}>
              "Every payment is a promise."
            </Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 10, width: '100%' }}>
            <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, alignItems: 'center' }}>
              <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 22, color: '#fff' }}>6</Text>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>{language === 'en' ? 'On-time payments' : 'งวดตรงเวลา'}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, alignItems: 'center' }}>
              <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 22, color: '#fff' }}>3</Text>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>{language === 'en' ? 'Badges earned' : 'Badges ที่ได้'}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 12, padding: 12, alignItems: 'center' }}>
              <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 22, color: '#fff' }}>5%</Text>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 10, color: 'rgba(255,255,255,0.65)' }}>{language === 'en' ? 'Discount' : 'ส่วนลด'}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Reward shortcut */}
        <TouchableOpacity onPress={() => navigation.navigate('RewardPrivilege')} activeOpacity={0.85}
          style={{ backgroundColor: colors.goldTint, borderRadius: radius.card, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: colors.gold + '50' }}>
          <MaterialIcons name="card-giftcard" size={26} color={colors.gold} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 14, color: colors.amberDeeper }}>{language === 'en' ? 'Privileges waiting for you 🎁' : 'สิทธิพิเศษที่รอคุณอยู่ 🎁'}</Text>
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.amberDeep }}>{language === 'en' ? '5% discount + Vitality +100 + AI letter' : 'ส่วนลด 5% + Vitality +100 + จดหมาย AI'}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color={colors.gold} />
        </TouchableOpacity>

        {/* 4 sections */}
        <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 12, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginLeft: 2 }}>
          {language === 'en' ? 'Full Ecosystem' : 'Ecosystem ทั้งหมด'}
        </Text>

        {SECTIONS.map((s) => (
          <TouchableOpacity key={s.num} onPress={() => (navigation as any).navigate(s.screen)} activeOpacity={0.85}
            style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 18, flexDirection: 'row', alignItems: 'center', gap: 14, ...cardShadow }}>
            <View style={{ width: 52, height: 52, borderRadius: 15, backgroundColor: s.bg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MaterialIcons name={s.icon} size={26} color={s.color} />
            </View>
            <View style={{ flex: 1, gap: 3 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontFamily: fontFamily.mono.regular, fontSize: 9, color: s.color, letterSpacing: 1 }}>{s.num}</Text>
                <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 15, color: colors.ink2 }}>{language === 'en' ? s.titleEn : s.title}</Text>
              </View>
              {language === 'th' && <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 11, color: colors.textSecondary }}>{s.titleEn}</Text>}
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.inkBody, lineHeight: 17, marginTop: 2 }}>{language === 'en' ? s.descEn : s.desc}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={20} color={colors.textTertiary} />
          </TouchableOpacity>
        ))}

        {/* Tagline */}
        <View style={{ alignItems: 'center', paddingVertical: 8, gap: 4 }}>
          <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 11, color: colors.textTertiary, letterSpacing: 1.5, textTransform: 'uppercase' }}>
            AIA+ · AI Celebration
          </Text>
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.textTertiary }}>
            "Every payment is a promise." ❤️
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
