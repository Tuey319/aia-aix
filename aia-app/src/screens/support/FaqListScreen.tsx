import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding } from '../../tokens';
import { cardShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

const FILTER_CHIPS = ['ทั้งหมด', 'AIA Prestige', 'AIA+', 'Vitality', 'AIA+ Point'];

interface FaqItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  actionLabel?: string;
  actionRoute?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    category: 'AIA Prestige',
    question: 'ตรวจสอบประวัติสิทธิประโยชน์ได้อย่างไร?',
    answer:
      'ดูรายละเอียดทั้งหมดได้ที่เมนู "คู่ของของฉัน" ในหน้าโปรไฟล์ของคุณ',
    actionLabel: 'ดูโปรไฟล์ →',
    actionRoute: 'ProfileEdit',
  },
  {
    id: '2',
    category: 'AIA+',
    question: 'ดาวน์โหลดหนังสือรับรองการชำระเบี้ยฯ ได้อย่างไร?',
    answer:
      'ไปที่แท็บ "กรมธรรม์" แล้วเลือก "ขอเอกสารกรมธรรม์" คุณสามารถดาวน์โหลด PDF หรือขอให้ส่งทางอีเมลได้',
  },
  {
    id: '3',
    category: 'AIA+ Point',
    question: 'AIA+ Point คืออะไร?',
    answer:
      'AIA+ Point คือระบบแต้มสะสมจากการใช้งานแอป สามารถแลกเป็นสิทธิพิเศษต่างๆ ได้',
  },
  {
    id: '4',
    category: 'AIA+',
    question: 'เปลี่ยนรหัสผ่าน AIA+ อย่างไร?',
    answer:
      'ไปที่แท็บ "บัญชี" แล้วเลือก "เปลี่ยนรหัสผ่าน" กรอกรหัสเก่าและรหัสใหม่ จากนั้นกดยืนยัน',
  },
  {
    id: '5',
    category: 'AIA+ Point',
    question: 'จะเปลี่ยนงวดชำระเบี้ยฯ ได้อย่างไร?',
    answer:
      'คุณสามารถเปลี่ยนงวดการชำระได้ผ่านแอป AIA+ ที่เมนู "การจัดการเบี้ย" → "ค่าใช้จ่าย & การผ่อน"',
    actionLabel: 'เปลี่ยนได้เลย →',
    actionRoute: 'ChangeFreq',
  },
];

export function FaqListScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [activeChip, setActiveChip] = useState('ทั้งหมด');
  const [openId, setOpenId] = useState<string | null>('1');

  const filtered = activeChip === 'ทั้งหมด'
    ? FAQ_ITEMS
    : FAQ_ITEMS.filter((f) => f.category === activeChip);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header — centered title + X close */}
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: screenPadding,
        paddingTop: 14,
        paddingBottom: 14,
      }}>
        <View style={{ width: 36 }} />
        <Text style={{
          fontFamily: fontFamily.anuphan.bold,
          fontSize: fontSize.titleLg,
          color: colors.ink,
        }}>
          คำถามที่พบบ่อย
        </Text>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="close" size={22} color={colors.ink} />
        </TouchableOpacity>
      </View>

      {/* Inline search bar — tapping navigates to FaqSearch */}
      <TouchableOpacity
        onPress={() => navigation.navigate('FaqSearch')}
        activeOpacity={0.8}
        style={{
          marginHorizontal: screenPadding,
          marginBottom: 14,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.card,
          borderRadius: radius.input,
          borderWidth: 1,
          borderColor: colors.hairline2,
          paddingHorizontal: 12,
          paddingVertical: 10,
          gap: 8,
        }}
      >
        <MaterialIcons name="search" size={20} color={colors.textTertiary} />
        <Text style={{
          fontFamily: fontFamily.anuphan.regular,
          fontSize: fontSize.body,
          color: colors.textTertiary,
          flex: 1,
        }}>
          ค้นหาคำถาม เช่น 'เปลี่ยนรอบชำระ'
        </Text>
      </TouchableOpacity>

      {/* Filter chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={{ paddingHorizontal: screenPadding, gap: 8, paddingBottom: 14 }}
      >
        {FILTER_CHIPS.map((chip) => {
          const isActive = chip === activeChip;
          return (
            <TouchableOpacity
              key={chip}
              onPress={() => { setActiveChip(chip); setOpenId(null); }}
              activeOpacity={0.75}
              style={{
                height: 34,
                paddingHorizontal: 16,
                borderRadius: radius.pill,
                backgroundColor: isActive ? colors.primary : colors.card,
                borderWidth: 1,
                borderColor: isActive ? colors.primary : colors.hairline2,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.caption,
                color: isActive ? colors.white : colors.inkBody2,
              }}>
                {chip}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* FAQ accordion list */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 32,
          gap: 0,
        }}
      >
        {filtered.map((item) => {
          const isOpen = openId === item.id;
          return (
            <View key={item.id} style={{ backgroundColor: colors.card, marginBottom: 8, borderRadius: radius.card, overflow: 'hidden', ...cardShadow }}>
              {/* Category label */}
              <View style={{ paddingHorizontal: 16, paddingTop: 11 }}>
                <Text style={{
                  fontFamily: fontFamily.jakarta.semiBold,
                  fontSize: 10,
                  color: colors.textSecondary,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  {item.category}
                </Text>
              </View>

              {/* Question row */}
              <TouchableOpacity
                onPress={() => setOpenId(isOpen ? null : item.id)}
                activeOpacity={0.8}
                style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 5, paddingBottom: 14, gap: 12 }}
              >
                <Text style={{
                  flex: 1,
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.bodyMd,
                  color: colors.ink2,
                  lineHeight: fontSize.bodyMd * 1.5,
                }}>
                  {item.question}
                </Text>
                <MaterialIcons
                  name={isOpen ? 'expand-less' : 'expand-more'}
                  size={22}
                  color={isOpen ? colors.primary : colors.textSecondary}
                />
              </TouchableOpacity>

              {/* Answer (expanded) */}
              {isOpen && (
                <View style={{ paddingHorizontal: 16, paddingBottom: 16, gap: 10, borderTopWidth: 1, borderTopColor: colors.hairline }}>
                  <Text style={{
                    fontFamily: fontFamily.anuphan.regular,
                    fontSize: fontSize.bodyMd,
                    color: colors.inkBody2,
                    lineHeight: fontSize.bodyMd * 1.6,
                    marginTop: 12,
                  }}>
                    {item.answer}
                  </Text>
                  {item.actionLabel && item.actionRoute && (
                    <TouchableOpacity onPress={() => (navigation as any).navigate(item.actionRoute)} activeOpacity={0.7}>
                      <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: fontSize.bodyMd, color: colors.primary }}>
                        {item.actionLabel}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
