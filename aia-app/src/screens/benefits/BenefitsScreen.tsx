import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { shadows } from '../../tokens/shadows';
import { AiaLogo } from '../../components/AiaLogo';

const CATEGORIES = ['ทั้งหมด', 'สุขภาพ', 'ไลฟ์สไตล์', 'อาหาร', 'ท่องเที่ยว', 'ช้อปปิ้ง'];

interface Benefit {
  id: string;
  category: string;
  brand: string;
  title: string;
  discount: string;
  tag?: string;
  monogram: string;
  logo?: number;
  iconBg: string;
  iconColor: string;
  expiry?: string;
}

const BENEFITS: Benefit[] = [
  {
    id: '1',
    category: 'สุขภาพ',
    brand: 'Bumrungrad Hospital',
    title: 'ส่วนลดค่าตรวจสุขภาพประจำปี',
    discount: '15% OFF',
    tag: 'AIA Vitality',
    monogram: 'BH',
    logo: require('../../../assets/partners/bumrungrad.webp'),
    iconBg: '#EAF7F0',
    iconColor: colors.success,
    expiry: '31 ธ.ค. 2569',
  },
  {
    id: '2',
    category: 'สุขภาพ',
    brand: 'Synphaet Hospital',
    title: 'ส่วนลดค่า Lab & X-Ray',
    discount: '20% OFF',
    monogram: 'SH',
    logo: require('../../../assets/partners/synphaet.png'),
    iconBg: '#EAF7F0',
    iconColor: colors.success,
  },
  {
    id: '3',
    category: 'ไลฟ์สไตล์',
    brand: 'Virgin Active',
    title: 'ฟิตเนสไม่จำกัดครั้ง / เดือน',
    discount: '฿499/เดือน',
    tag: 'ยอดนิยม',
    monogram: 'VA',
    logo: require('../../../assets/partners/virgin-active.webp'),
    iconBg: '#EAF1FB',
    iconColor: colors.info,
  },
  {
    id: '4',
    category: 'ไลฟ์สไตล์',
    brand: 'Lemon Farm',
    title: 'ส่วนลดสินค้าออร์แกนิค',
    discount: '10% OFF',
    monogram: 'LF',
    logo: require('../../../assets/partners/lemon-farm.jpg'),
    iconBg: '#EAF7F0',
    iconColor: colors.success,
  },
  {
    id: '5',
    category: 'อาหาร',
    brand: 'After You',
    title: 'เครื่องดื่มฟรี 1 แก้ว เมื่อสั่งครบ ฿200',
    discount: 'FREE Drink',
    monogram: 'AY',
    logo: require('../../../assets/partners/after-you.jpeg'),
    iconBg: '#FBF4DA',
    iconColor: colors.gold,
    expiry: '30 มิ.ย. 2569',
  },
  {
    id: '6',
    category: 'อาหาร',
    brand: 'The Pizza Company',
    title: 'ส่วนลดพิซซ่า L ฟรีเครื่องดื่ม',
    discount: '฿99 ลด',
    monogram: 'PZ',
    logo: require('../../../assets/partners/pizza-company.webp'),
    iconBg: '#FFF3E4',
    iconColor: colors.amber,
  },
  {
    id: '7',
    category: 'ท่องเที่ยว',
    brand: 'Agoda',
    title: 'ส่วนลดที่พักทั่วโลก',
    discount: '12% OFF',
    tag: 'ใหม่',
    monogram: 'AG',
    logo: require('../../../assets/partners/agoda.webp'),
    iconBg: '#EAF1FB',
    iconColor: colors.info,
  },
  {
    id: '8',
    category: 'ท่องเที่ยว',
    brand: 'Thai Airways',
    title: 'ส่วนลดตั๋วเครื่องบินภายในประเทศ',
    discount: '8% OFF',
    monogram: 'TG',
    logo: require('../../../assets/partners/thai-airways.webp'),
    iconBg: '#EAF1FB',
    iconColor: colors.info,
  },
  {
    id: '9',
    category: 'ช้อปปิ้ง',
    brand: 'Central Department Store',
    title: 'ส่วนลดสินค้าแฟชั่น & ไลฟ์สไตล์',
    discount: '5% + 5%',
    monogram: 'CD',
    logo: require('../../../assets/partners/central.webp'),
    iconBg: '#FCEDF1',
    iconColor: colors.primary,
  },
  {
    id: '10',
    category: 'ช้อปปิ้ง',
    brand: 'Watson',
    title: 'แต้มสะสมพิเศษจาก AIA Vitality',
    discount: '2X Points',
    tag: 'AIA Vitality',
    monogram: 'WT',
    logo: require('../../../assets/partners/watson.webp'),
    iconBg: '#EAF7F0',
    iconColor: colors.success,
  },
];

function BenefitCard({ benefit }: { benefit: Benefit }) {
  return (
    <Pressable
      android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
      style={({ pressed }) => ({
        backgroundColor: colors.card,
        borderRadius: radius.card,
        overflow: 'hidden',
        opacity: pressed ? 0.92 : 1,
        ...shadows.md,
      })}
    >
      <View style={{ flexDirection: 'row', padding: 14, gap: 12, alignItems: 'center' }}>
        {/* Brand logo (falls back to a monogram if none provided) */}
        {benefit.logo ? (
          <View style={{ width: 48, height: 48, borderRadius: 14, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.hairline2, alignItems: 'center', justifyContent: 'center', flexShrink: 0, padding: 7 }}>
            <Image source={benefit.logo} style={{ width: '100%', height: '100%' }} contentFit="contain" />
          </View>
        ) : (
          <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: benefit.iconBg, alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 15, color: benefit.iconColor, letterSpacing: 0.2 }}>
              {benefit.monogram}
            </Text>
          </View>
        )}

        {/* Text */}
        <View style={{ flex: 1, gap: 3 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 11, color: colors.textSecondary }}>
              {benefit.brand}
            </Text>
            {benefit.tag && (
              <View style={{ backgroundColor: colors.primaryTint, borderRadius: 99, paddingHorizontal: 6, paddingVertical: 1 }}>
                <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 8, color: colors.primary, letterSpacing: 0.3 }}>
                  {benefit.tag}
                </Text>
              </View>
            )}
          </View>
          <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 13, color: colors.ink2, lineHeight: 19 }}>
            {benefit.title}
          </Text>
          {benefit.expiry && (
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 10, color: colors.textTertiary }}>
              ถึง {benefit.expiry}
            </Text>
          )}
        </View>

        {/* Discount badge */}
        <View style={{ alignItems: 'flex-end', gap: 4 }}>
          <View style={{ backgroundColor: colors.primary, borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5, minWidth: 56, alignItems: 'center' }}>
            <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 11, color: colors.white, letterSpacing: 0.3 }}>
              {benefit.discount}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

export function BenefitsScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('ทั้งหมด');

  const filtered = activeCategory === 'ทั้งหมด'
    ? BENEFITS
    : BENEFITS.filter((b) => b.category === activeCategory);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header */}
      <View style={{ paddingHorizontal: screenPadding, paddingTop: 14, paddingBottom: 12 }}>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 20, color: colors.ink }}>สิทธิพิเศษ</Text>
        <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 13, color: colors.textSecondary, marginTop: 2 }}>
          {BENEFITS.length} สิทธิประโยชน์สำหรับคุณ
        </Text>
      </View>

      {/* Category chips */}
      <View style={{ position: 'relative' }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}
          contentContainerStyle={{ paddingHorizontal: screenPadding, gap: 8, paddingBottom: 14 }}>
          {CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <TouchableOpacity key={cat} onPress={() => setActiveCategory(cat)} activeOpacity={0.75}
                style={{ height: 34, paddingHorizontal: 16, borderRadius: radius.pill, backgroundColor: isActive ? colors.primary : colors.card, borderWidth: 1, borderColor: isActive ? colors.primary : colors.hairline2, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: fontSize.caption, color: isActive ? colors.white : colors.inkBody2 }}>
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {/* Fade hint that the chip row scrolls */}
        <LinearGradient
          pointerEvents="none"
          colors={['transparent', colors.screenBg]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
          style={{ position: 'absolute', right: 0, top: 0, bottom: 14, width: 28 }}
        />
      </View>

      {/* Benefits list */}
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 32, gap: cardGap }}>

        {/* AIA Vitality promo banner */}
        <View style={{ backgroundColor: colors.primaryDeep, borderRadius: radius.card, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14 }}>
          <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: colors.white, alignItems: 'center', justifyContent: 'center' }}>
            <AiaLogo size={32} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 14, color: colors.white }}>AIA Vitality สะสมแต้ม</Text>
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>
              ใช้สิทธิ์ร่วมกับ Vitality เพื่อรับส่วนลดเพิ่มเติม
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.6)" />
        </View>

        {filtered.map((b) => <BenefitCard key={b.id} benefit={b} />)}
      </ScrollView>
    </SafeAreaView>
  );
}
