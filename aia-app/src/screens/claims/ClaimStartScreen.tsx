import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow } from '../../tokens/shadows';
import { StatusPill } from '../../components/StatusPill';
import { IllustrationMedicine } from '../../components/illustrations';

type Nav = NativeStackNavigationProp<any>;

const HISTORY = [
  {
    id: '1',
    icon: 'check-circle' as const,
    iconColor: colors.success,
    title: 'ค่ารักษาผู้ป่วยนอก',
    meta: '12 มิ.ย. 2569 · อนุมัติแล้ว',
    amount: '฿2,400',
    pillVariant: 'success' as const,
    pillLabel: 'อนุมัติแล้ว',
  },
  {
    id: '2',
    icon: 'pending' as const,
    iconColor: colors.amber,
    title: 'ค่ากักตกรรม',
    meta: '15 มิ.ย. 2569 · กำลังพิจารณา',
    amount: '฿1,800',
    pillVariant: 'amber' as const,
    pillLabel: 'กำลังพิจารณา',
  },
];

export function ClaimStartScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

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
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.titleLg,
            color: colors.ink,
            flex: 1,
          }}
        >
          เคลมของฉัน
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
        {/* New Claim CTA Card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ClaimDetails')}
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.cardLg,
            padding: 20,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 16,
            ...cardShadow,
          }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: 'rgba(255,255,255,0.18)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons name="upload-file" size={30} color={colors.white} />
          </View>

          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: 16,
                color: colors.white,
                lineHeight: 22,
              }}
            >
              ยื่นเคลมใหม่
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.body,
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 19,
              }}
            >
              กรอกรายละเอียดและอัปโหลดเอกสาร{'\n'}ได้รับเงินภายใน 5 วัน
            </Text>
          </View>

          <MaterialIcons name="arrow-forward" size={22} color="rgba(255,255,255,0.8)" />
        </TouchableOpacity>

        <View style={{ alignItems: 'center', paddingVertical: 4 }}>
          <IllustrationMedicine width={180} height={150} />
        </View>

        {/* History Section */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.semiBold,
            fontSize: fontSize.bodyMd,
            color: colors.inkBody2,
            marginTop: 4,
          }}
        >
          ประวัติการเคลม
        </Text>

        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          {HISTORY.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ClaimHistory')}
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  gap: 12,
                },
                index < HISTORY.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: colors.hairline2,
                },
              ]}
            >
              <MaterialIcons name={item.icon} size={24} color={item.iconColor} />

              <View style={{ flex: 1, gap: 3 }}>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.semiBold,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink2,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.regular,
                    fontSize: fontSize.caption,
                    color: colors.textSecondary,
                  }}
                >
                  {item.meta}
                </Text>
              </View>

              <View style={{ alignItems: 'flex-end', gap: 4 }}>
                <Text
                  style={{
                    fontFamily: fontFamily.jakarta.semiBold,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink,
                  }}
                >
                  {item.amount}
                </Text>
                <StatusPill label={item.pillLabel} variant={item.pillVariant} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
