/**
 * Gratitude Letter — AI-generated personalised thank-you from AIA.
 * Delight Mak concept: "AI Thank you 💌" after milestone payment.
 */
import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

const LETTER_TEXT = `สวัสดีคุณสมชาย 💌

ขอบคุณที่ไว้วางใจ AIA ดูแลคุณและครอบครัวมาตลอด 6 เดือน ทุกครั้งที่คุณชำระเบี้ยตรงเวลา นั่นคือการรักษาคำสัญญาที่มีต่อคนที่คุณรัก

เราเห็นว่าคุณไม่เคยพลาดสักงวดเดียว นั่นไม่ใช่แค่การจ่ายเงิน — แต่คือความรับผิดชอบและความห่วงใยที่คุณมอบให้กับทุกคนในชีวิตของคุณ

AIA ภูมิใจที่ได้เป็นส่วนหนึ่งในการเดินทางนี้ และจะยืนอยู่เคียงข้างคุณเสมอ 🛡️

ด้วยความขอบคุณ
ทีม AIA ✨`;

export function GratitudeLetterScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 600, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF8F0' }} edges={['top']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>จดหมายจาก AIA</Text>
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 11, color: colors.textSecondary }}>AI Gratitude Letter 💌</Text>
        </View>
        <View style={{ backgroundColor: colors.primaryTint, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 3 }}>
          <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 10, color: colors.primary }}>AI Generated</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 32, gap: cardGap }}>
        {/* Envelope top decoration */}
        <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
          {/* Wax seal decoration */}
          <View style={{ alignItems: 'center', marginBottom: 8 }}>
            <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}>
              <MaterialIcons name="favorite" size={26} color={colors.white} />
            </View>
            <View style={{ width: 1, height: 20, backgroundColor: colors.hairline2, marginTop: 4 }} />
          </View>

          {/* Letter card */}
          <View style={{ backgroundColor: colors.white, borderRadius: 20, padding: 24, gap: 16, ...cardShadow, borderWidth: 1, borderColor: '#FFE4CC' }}>
            {/* Date + from */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={{ fontFamily: fontFamily.mono.regular, fontSize: 10, color: colors.textTertiary, letterSpacing: 0.8 }}>17 มิถุนายน 2569</Text>
              <Text style={{ fontFamily: fontFamily.mono.semiBold, fontSize: 10, color: colors.primary, letterSpacing: 0.5 }}>AIA+ · MILESTONE 6</Text>
            </View>

            <View style={{ height: 1, backgroundColor: '#FFE4CC' }} />

            {/* Letter body */}
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 15, color: colors.ink2, lineHeight: 26 }}>
              {LETTER_TEXT}
            </Text>

            <View style={{ height: 1, backgroundColor: '#FFE4CC' }} />

            {/* Signature */}
            <View style={{ alignItems: 'center', gap: 8 }}>
              <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 16, color: '#fff', letterSpacing: 0.5 }}>AIA</Text>
              </View>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 11, color: colors.textSecondary }}>
                AIA Thailand · "Every payment is a promise"
              </Text>
            </View>
          </View>

          {/* Milestone ribbon */}
          <View style={{ backgroundColor: colors.successTint, borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 4, borderWidth: 1, borderColor: colors.success + '40' }}>
            <MaterialIcons name="emoji-events" size={28} color={colors.gold} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 14, color: colors.successDeep }}>
                Always On Time Badge ปลดล็อคแล้ว! 🏅
              </Text>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.success }}>
                ชำระตรงเวลา 6 งวดต่อเนื่อง
              </Text>
            </View>
          </View>

          {/* Reward row */}
          <View style={{ backgroundColor: colors.goldTint, borderRadius: 12, padding: 14, flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderColor: colors.gold + '40' }}>
            <MaterialIcons name="card-giftcard" size={26} color={colors.gold} />
            <View style={{ flex: 1 }}>
              <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 14, color: colors.amberDeeper }}>
                สิทธิพิเศษจาก AIA
              </Text>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.amberDeep }}>
                ส่วนลดเบี้ย 5% · AIA Vitality +100 คะแนน
              </Text>
            </View>
            <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 20, color: colors.gold }}>5%</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Share footer */}
      <View style={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 12, paddingTop: 12, backgroundColor: '#FFF8F0', borderTopWidth: 1, borderTopColor: '#FFE4CC', gap: 10 }}>
        <TouchableOpacity onPress={() => navigation.navigate('SharePride')} activeOpacity={0.82}
          style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, ...primaryButtonShadow }}>
          <MaterialIcons name="share" size={18} color={colors.white} />
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 15 }}>แชร์ความภาคภูมิใจ</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BadgeCollection')} activeOpacity={0.7}
          style={{ height: 40, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 13, color: colors.primary }}>ดู Badges ทั้งหมด →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
