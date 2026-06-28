import React, { useState } from 'react';
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
import {
  colors,
  fontFamily,
  fontSize,
  radius,
  screenPadding,
  cardGap,
  cardPadding,
} from '../../tokens';
import { ClaimStepHeader } from '../../components/ClaimStepHeader';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

const STEP = 1;

export function ClaimDetailsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [amount, setAmount] = useState('18,500');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <ClaimStepHeader step={STEP} title="ยื่นเคลมใหม่" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 100,
          gap: cardGap,
        }}
      >
        {/* Helper text */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.caption,
            color: colors.textSecondary,
          }}
        >
          กรอกรายละเอียดการเคลม ง่าย เร็ว เต็มเม็ด
        </Text>

        {/* Form Card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            paddingHorizontal: cardPadding,
            ...cardShadow,
          }}
        >
          {/* วันที่รับบริการ */}
          <DropdownRow
            label="วันที่รับบริการ"
            value="15 ส.ค. 2569"
            rightIcon="calendar-today"
            onPress={() => {}}
          />
          <Divider />

          {/* ผู้รับเคลม */}
          <DropdownRow
            label="ผู้รับเคลม"
            value="สมชาย ใจดี"
            rightIcon="expand-more"
            onPress={() => {}}
          />
          <Divider />

          {/* ประเภทการเคลม */}
          <DropdownRow
            label="ประเภทการเคลม"
            value="ค่ารักษาผู้ป่วยนอก"
            rightIcon="expand-more"
            onPress={() => {}}
          />
          <Divider />

          {/* ประกันอะไร */}
          <DropdownRow
            label="ประกันอะไร"
            value="ผู้ป่วยนอกเฉพาะทาง"
            rightIcon="expand-more"
            onPress={() => {}}
          />
          <Divider />

          {/* จำนวนเงินที่เคลม — navigates to ClaimAmount */}
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('ClaimAmount')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 14,
              gap: 10,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: colors.textSecondary,
                  marginBottom: 2,
                }}
              >
                จำนวนเงินที่เคลม
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.jakarta.semiBold,
                  fontSize: 17,
                  color: colors.ink,
                }}
              >
                ฿{amount}
              </Text>
            </View>
            <MaterialIcons name="apps" size={22} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Attachment Section */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: cardPadding,
            gap: 12,
            ...cardShadow,
          }}
        >
          {/* Header row: label + count */}
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.semiBold,
                fontSize: fontSize.bodyMd,
                color: colors.ink2,
              }}
            >
              แนบใบเสร็จ
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textTertiary,
              }}
            >
              สูงสุด 5 ใบ · แนบแล้ว
            </Text>
          </View>

          {/* Upload slots row */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            {/* Already-uploaded slot (green check) */}
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                backgroundColor: colors.successTint,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="check-circle" size={28} color={colors.success} />
            </View>
            {/* Already-uploaded slot 2 */}
            <View
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                backgroundColor: colors.successTint,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaterialIcons name="check-circle" size={28} color={colors.success} />
            </View>
            {/* Add new slot */}
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 64,
                height: 64,
                borderRadius: 12,
                borderWidth: 1.5,
                borderColor: colors.hairline2,
                borderStyle: 'dashed',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: colors.screenBg,
                gap: 4,
              }}
            >
              <MaterialIcons name="camera-alt" size={20} color={colors.textTertiary} />
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: 10,
                  color: colors.textTertiary,
                }}
              >
                เพิ่ม
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Button */}
      <View
        style={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 16,
          paddingTop: 12,
          backgroundColor: colors.screenBg,
          borderTopWidth: 1,
          borderTopColor: colors.hairline2,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ClaimDocs')}
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.button,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            ...primaryButtonShadow,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: fontFamily.anuphan.bold,
              fontSize: 16,
            }}
          >
            ถัดไป
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function DropdownRow({
  label,
  value,
  rightIcon,
  onPress,
}: {
  label: string;
  value: string;
  rightIcon: keyof typeof MaterialIcons.glyphMap;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        gap: 10,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.caption,
            color: colors.textSecondary,
            marginBottom: 2,
          }}
        >
          {label}
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.medium,
            fontSize: fontSize.bodyMd,
            color: colors.ink,
          }}
        >
          {value}
        </Text>
      </View>
      <MaterialIcons name={rightIcon} size={22} color={colors.textTertiary} />
    </TouchableOpacity>
  );
}

function Divider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.hairline2,
      }}
    />
  );
}
