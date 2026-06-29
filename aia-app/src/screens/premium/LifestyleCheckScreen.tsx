import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../navigation/types';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<HomeStackParamList, 'LifestyleCheck'>;
type Route = RouteProp<HomeStackParamList, 'LifestyleCheck'>;

interface Question {
  id: string;
  question: string;
  options: string[];
}

const QUESTIONS: Question[] = [
  {
    id: 'smoking',
    question: 'คุณสูบบุหรี่หรือไม่?',
    options: ['ไม่สูบ', 'สูบเป็นครั้งคราว', 'สูบประจำ'],
  },
  {
    id: 'exercise',
    question: 'ออกกำลังกายบ่อยแค่ไหน?',
    options: ['ไม่ออกกำลังกาย', '1–2 ครั้ง/สัปดาห์', '3 ครั้ง/สัปดาห์ขึ้นไป'],
  },
  {
    id: 'alcohol',
    question: 'ดื่มแอลกอฮอล์บ่อยแค่ไหน?',
    options: ['ไม่ดื่ม', 'ดื่มเป็นครั้งคราว', 'ดื่มเป็นประจำ'],
  },
];

export function LifestyleCheckScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<Route>();
  const insets = useSafeAreaInsets();

  const [answers, setAnswers] = useState<Record<string, string>>({});

  const allAnswered = QUESTIONS.every((q) => answers[q.id]);

  function handleContinue() {
    navigation.navigate('AdjustPlan', { category: route.params?.category });
  }

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
          ตรวจสอบไลฟ์สไตล์
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
        {/* Progressive Underwriting banner */}
        <View
          style={{
            backgroundColor: colors.infoTint,
            borderRadius: 12,
            padding: 13,
            flexDirection: 'row',
            gap: 10,
            alignItems: 'flex-start',
          }}
        >
          <MaterialIcons name="fact-check" size={18} color={colors.info} style={{ marginTop: 1 }} />
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 10,
                color: colors.info,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
              }}
            >
              Progressive Underwriting
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: 12,
                color: colors.infoDeep,
                lineHeight: 18,
              }}
            >
              ก่อนปรับแผนคุ้มครอง ขอทราบไลฟ์สไตล์ปัจจุบันของคุณก่อน เพื่อให้คำแนะนำความคุ้มครองที่เหมาะสมที่สุด
            </Text>
          </View>
        </View>

        {/* Questions */}
        {QUESTIONS.map((q) => (
          <View
            key={q.id}
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 16,
              gap: 12,
              ...cardShadow,
            }}
          >
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: 14,
                color: colors.ink2,
              }}
            >
              {q.question}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {q.options.map((opt) => {
                const isSelected = answers[q.id] === opt;
                return (
                  <TouchableOpacity
                    key={opt}
                    onPress={() => setAnswers((prev) => ({ ...prev, [q.id]: opt }))}
                    activeOpacity={0.75}
                    style={{
                      paddingHorizontal: 14,
                      height: 36,
                      borderRadius: radius.pill,
                      backgroundColor: isSelected ? colors.primary : colors.screenBg,
                      borderWidth: 1,
                      borderColor: isSelected ? colors.primary : colors.hairline2,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: fontFamily.anuphan.semiBold,
                        fontSize: 13,
                        color: isSelected ? colors.white : colors.inkBody2,
                      }}
                    >
                      {opt}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Sticky Footer */}
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
          onPress={handleContinue}
          disabled={!allAnswered}
          activeOpacity={0.82}
          style={{
            backgroundColor: allAnswered ? colors.primary : colors.textTertiary,
            borderRadius: radius.button,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            ...(allAnswered ? primaryButtonShadow : {}),
          }}
        >
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>
            ดำเนินการต่อ
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
