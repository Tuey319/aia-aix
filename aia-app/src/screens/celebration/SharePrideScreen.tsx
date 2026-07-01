/**
 * Share Your Pride — share payment milestone achievement.
 * Delight Mak concept: "Share Your Pride" social sharing screen.
 */
import React from 'react';
import { View, Text, TouchableOpacity, Share, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { IllustrationFamilyInsurance } from '../../components/illustrations';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;


export function SharePrideScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const language = useAppStore((state) => state.language);

  const SHARE_CHANNELS = [
    { name: 'LINE', icon: 'chat' as const, color: '#06C755', bg: '#E8F8EE' },
    { name: 'Facebook', icon: 'facebook' as const, color: '#1877F2', bg: '#EAF1FB' },
    { name: 'Twitter/X', icon: 'alternate-email' as const, color: '#000', bg: '#F4F4F6' },
    { name: language === 'en' ? 'Copy' : 'คัดลอก', icon: 'content-copy' as const, color: colors.textSecondary, bg: colors.hairline2 },
  ];

  const shareMessage = language === 'en'
    ? '🎉 I have paid my AIA insurance premium for 6 consecutive instalments on time!\n\nEarned the "Always On Time" Badge 🏅\nEvery payment is a promise to protect those I love ❤️\n\n#AIA #AIACelebration #EveryPaymentIsAPromise'
    : '🎉 ฉันชำระเบี้ยประกัน AIA ครบ 6 งวดตรงเวลา!\n\nHappy ที่ได้รับ "Always On Time" Badge 🏅\nทุกการชำระคือการปกป้องคนที่รัก ❤️\n\n#AIA #AIACelebration #EveryPaymentIsAPromise';

  const shareTitle = language === 'en' ? 'Share Your Pride' : 'แชร์ความภาคภูมิใจ';

  async function handleShare() {
    try {
      await Share.share({ message: shareMessage, title: shareTitle });
    } catch {}
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink, flex: 1 }}>
          {language === 'en' ? 'Share Your Pride' : 'แชร์ความภาคภูมิใจ'}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 100, gap: cardGap }}>
        {/* Preview card */}
        <View style={{ backgroundColor: colors.ink, borderRadius: 20, padding: 24, alignItems: 'center', gap: 16, ...cardShadow }}>
          {/* Top AIA label */}
          <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 13, color: colors.primary, letterSpacing: 2 }}>AIA+ · CELEBRATION</Text>

          <IllustrationFamilyInsurance width={200} height={200} />

          <View style={{ alignItems: 'center', gap: 6 }}>
            <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 22, color: '#fff', textAlign: 'center' }}>
              {language === 'en' ? '12 instalments paid on time! 🎉' : 'ชำระตรงเวลา 12 งวดแล้ว! 🎉'}
            </Text>
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 13, color: 'rgba(255,255,255,0.65)', textAlign: 'center' }}>
              {language === 'en' ? 'Every payment protects those you love ❤️' : 'ทุกการชำระคือการปกป้องคนที่รัก ❤️'}
            </Text>
          </View>

          {/* Badge row */}
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 99, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <MaterialIcons name="schedule" size={12} color={colors.success} />
              <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 11, color: '#fff' }}>Always On Time</Text>
            </View>
            <View style={{ backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 99, paddingHorizontal: 12, paddingVertical: 6, flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <MaterialIcons name="verified" size={12} color={colors.info} />
              <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 11, color: '#fff' }}>Consistent Payer</Text>
            </View>
          </View>

          <Text style={{ fontFamily: fontFamily.mono.regular, fontSize: 9, color: 'rgba(255,255,255,0.3)', letterSpacing: 1.5 }}>
            #AIACelebration · #EveryPaymentIsAPromise
          </Text>
        </View>

        {/* Share channels */}
        <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 12, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginLeft: 4 }}>
          {language === 'en' ? 'Share via' : 'แชร์ผ่าน'}
        </Text>

        <View style={{ flexDirection: 'row', gap: 12 }}>
          {SHARE_CHANNELS.map((ch) => (
            <TouchableOpacity key={ch.name} onPress={handleShare} activeOpacity={0.8}
              style={{ flex: 1, backgroundColor: ch.bg, borderRadius: 14, paddingVertical: 14, alignItems: 'center', gap: 6 }}>
              {ch.lib === 'fa6'
                ? <FontAwesome6 name={ch.icon} size={20} color={ch.color} />
                : <MaterialIcons name={ch.icon} size={22} color={ch.color} />}
              <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 10, color: ch.color }}>{ch.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Message preview */}
        <View style={{ backgroundColor: colors.card, borderRadius: radius.card, padding: 14, gap: 6, ...cardShadow }}>
          <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.6 }}>
            {language === 'en' ? 'Message to share' : 'ข้อความที่จะแชร์'}
          </Text>
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 13, color: colors.inkBody, lineHeight: 20 }}>
            {shareMessage}
          </Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.screenBg, paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: insets.bottom + 16, borderTopWidth: 1, borderTopColor: colors.hairline }}>
        <TouchableOpacity onPress={handleShare} activeOpacity={0.82}
          style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, ...primaryButtonShadow }}>
          <MaterialIcons name="share" size={18} color={colors.white} />
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>{language === 'en' ? 'Share Now' : 'แชร์เลย'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
