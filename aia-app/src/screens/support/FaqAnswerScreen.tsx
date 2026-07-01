import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
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
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;

type ThumbState = 'up' | 'down' | null;

export function FaqAnswerScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [thumb, setThumb] = useState<ThumbState>(null);
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  const ARTICLE_TITLE = language === 'en'
    ? 'How do I change my billing frequency?'
    : 'จะเปลี่ยนงวดชำระเบี้ยฯ ได้อย่างไร?';

  const ARTICLE_BODY = language === 'en'
    ? [
        'You can change your premium billing frequency yourself through the AIA+ app — no need to contact an agent.',
        'Steps to change:\n1. Open the AIA+ app\n2. Go to "Premium Management"\n3. Select "Expenses & Installments"\n4. Choose your preferred frequency (Monthly / Quarterly / Annual)\n5. Tap "Save Billing Frequency"',
        'The change takes effect from the next billing cycle, not the current one. For further questions, contact us at 1581 — available 24 hours.',
      ]
    : [
        'คุณสามารถเปลี่ยนงวดการชำระเบี้ยประกันได้ด้วยตนเองผ่านแอป AIA+ ได้ง่ายๆ โดยไม่ต้องติดต่อเจ้าหน้าที่',
        'วิธีการเปลี่ยน:\n1. เปิดแอป AIA+\n2. ไปที่หน้า "การจัดการเบี้ย"\n3. เลือก "ค่าใช้จ่าย & การผ่อน"\n4. เลือกงวดที่ต้องการ (รายเดือน / ราย 3 เดือน / รายปี)\n5. กด "บันทึกงวดการชำระ"',
        'การเปลี่ยนแปลงจะมีผลในรอบบิลถัดไป ไม่ใช่รอบบิลปัจจุบัน หากมีคำถามเพิ่มเติมสามารถติดต่อเจ้าหน้าที่ได้ที่ 1581 ตลอด 24 ชั่วโมง',
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
          {s.support.faqTitle}
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
        {/* Article card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 18,
            gap: 16,
            ...cardShadow,
          }}
        >
          {/* Article title */}
          <Text
            style={{
              fontFamily: fontFamily.anuphan.bold,
              fontSize: 20,
              color: colors.ink,
              lineHeight: 20 * 1.4,
            }}
          >
            {ARTICLE_TITLE}
          </Text>

          {/* Article body paragraphs */}
          {ARTICLE_BODY.map((para, idx) => (
            <Text
              key={idx}
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.bodyMd,
                color: colors.inkBody,
                lineHeight: fontSize.bodyMd * 1.7,
              }}
            >
              {para}
            </Text>
          ))}

          {/* Divider */}
          <View style={{ height: 1, backgroundColor: colors.hairline }} />

          {/* Helpful thumbs row */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.bodyMd,
                color: colors.textSecondary,
              }}
            >
              {language === 'en' ? 'Was this article helpful?' : 'บทความนี้มีประโยชน์ไหม?'}
            </Text>
            <View style={{ flexDirection: 'row', gap: 16 }}>
              <TouchableOpacity
                onPress={() => setThumb('up')}
                hitSlop={10}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="thumb-up"
                  size={24}
                  color={thumb === 'up' ? colors.success : colors.textTertiary}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setThumb('down')}
                hitSlop={10}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name="thumb-down"
                  size={24}
                  color={thumb === 'down' ? colors.primary : colors.textTertiary}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </ScrollView>

      {/* Sticky red CTA button */}
      <View style={{ paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 24, borderTopWidth: 1, borderTopColor: colors.hairline, backgroundColor: colors.screenBg }}>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('ChangeFreq')}
          style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}
        >
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>
            {language === 'en' ? 'Change Billing Frequency' : 'ไปที่เปลี่ยนงวดการชำระ'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
