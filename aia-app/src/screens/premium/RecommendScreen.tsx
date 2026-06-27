import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { StatusPill } from '../../components/StatusPill';

interface RecommendCard {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  subtitle: string;
  pillLabel: string;
  pillVariant: 'success' | 'amber' | 'mono' | 'info' | 'risk' | 'red';
  buttonLabel: string;
  buttonColor: string;
  onPress: () => void;
}

export function RecommendScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();

  const cards: RecommendCard[] = [
    {
      icon: 'event-repeat',
      title: 'เปลี่ยนเป็นชำระรายปี',
      subtitle: 'หยุดจ่ายค่าธรรมเนียมรายเดือน ประหยัดทันที',
      pillLabel: 'ประหยัด ฿1,530/ปี',
      pillVariant: 'success',
      buttonLabel: 'ใช้คำแนะนำ',
      buttonColor: colors.primary,
      onPress: () => navigation.navigate('Costs'),
    },
    {
      icon: 'tune',
      title: 'ปรับความคุ้มครองให้พอดีงบ',
      subtitle: 'เลือกความคุ้มครองที่จำเป็น ลดเบี้ยได้ทันที',
      pillLabel: 'ลดลง ฿880/เดือน',
      pillVariant: 'amber',
      buttonLabel: 'ดำเนินการ',
      buttonColor: colors.amber,
      onPress: () => navigation.navigate('AdjustPlan'),
    },
    {
      icon: 'swap-horiz',
      title: 'เปลี่ยนเป็นแผนที่เบากว่า',
      subtitle: 'แผนสุขภาพพื้นฐานที่ครอบคลุมสิ่งจำเป็น',
      pillLabel: 'เริ่มต้น ฿2,400/เดือน',
      pillVariant: 'success',
      buttonLabel: 'ดูแผน',
      buttonColor: colors.success,
      onPress: () => navigation.navigate('AdjustPlan'),
    },
    {
      icon: 'favorite',
      title: 'เปิด AIA Vitality',
      subtitle: 'สะสมคะแนนสุขภาพ รับส่วนลดเบี้ยประกัน',
      pillLabel: 'ส่วนลดสูงสุด 15%',
      pillVariant: 'mono',
      buttonLabel: 'เริ่มเลย',
      buttonColor: colors.gold,
      onPress: () => {},
    },
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
          คำแนะนำเฉพาะคุณ
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
        {/* Dark red hero banner */}
        <View
          style={{
            backgroundColor: colors.primaryDeep,
            borderRadius: radius.cardLg,
            padding: 20,
            gap: 14,
            ...cardShadow,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 14 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                backgroundColor: 'rgba(255,255,255,0.15)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="auto-awesome" size={24} color={colors.white} />
            </View>
            <View style={{ flex: 1, gap: 6 }}>
              <View
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  borderRadius: radius.pill,
                  paddingHorizontal: 10,
                  paddingVertical: 3,
                  alignSelf: 'flex-start',
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.jakarta.semiBold,
                    fontSize: 10,
                    color: 'rgba(255,255,255,0.85)',
                    letterSpacing: 0.5,
                  }}
                >
                  AI · เฉพาะคุณ
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.bold,
                  fontSize: fontSize.title,
                  color: colors.white,
                  lineHeight: 22,
                }}
              >
                สร้างความมั่งคั่งจากรายได้ส่วนเกินและแนวโน้มเบี้ยของคุณ — เพิ่มผลตอบแทนสูงสุด
              </Text>
            </View>
          </View>
        </View>

        {/* Recommendation cards */}
        {cards.map((card, i) => (
          <View
            key={i}
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 16,
              gap: 12,
              ...cardShadow,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
              <MaterialIcons name={card.icon} size={22} color={colors.primary} style={{ marginTop: 2 }} />
              <View style={{ flex: 1, gap: 4 }}>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.bold,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink2,
                  }}
                >
                  {card.title}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.regular,
                    fontSize: fontSize.caption,
                    color: colors.textSecondary,
                    lineHeight: 18,
                  }}
                >
                  {card.subtitle}
                </Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <StatusPill label={card.pillLabel} variant={card.pillVariant} />
              <TouchableOpacity
                onPress={card.onPress}
                activeOpacity={0.8}
                style={{
                  backgroundColor: card.buttonColor,
                  borderRadius: radius.button,
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.bold,
                    fontSize: fontSize.body,
                    color: colors.white,
                  }}
                >
                  {card.buttonLabel}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        {/* Footer disclaimer */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.caption,
            color: colors.textTertiary,
            textAlign: 'center',
            lineHeight: 18,
            paddingHorizontal: 8,
          }}
        >
          คำแนะนำนี้สร้างจากข้อมูลและแนวโน้ม ไม่ใช่คำแนะนำทางการเงิน
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
