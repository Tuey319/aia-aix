import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
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
const UPLOAD_SLOTS = 5;

export function ClaimDetailsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [agreed, setAgreed] = useState(false);

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
        {/* Form Card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: cardPadding,
            gap: 0,
            ...cardShadow,
          }}
        >
          {/* วันที่รับบริการ */}
          <FormRow
            label="วันที่รับบริการ"
            icon="calendar-today"
            value="12 มิ.ย. 2569"
            onPress={() => {}}
          />
          <Divider />

          {/* ผู้เอาประกัน */}
          <FormRow
            label="ผู้เอาประกัน"
            icon="person"
            value="สมชาย มีทอง"
            onPress={() => {}}
          />
          <Divider />

          {/* ประเภทการเคลม */}
          <FormRow
            label="ประเภทการเคลม"
            icon="local-hospital"
            value="ค่ารักษาผู้ป่วยนอก"
            onPress={() => {}}
          />
          <Divider />

          {/* จำนวนเงินที่เคลม */}
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
            <MaterialIcons name="payments" size={20} color={colors.primary} />
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
                ฿3,200.00
              </Text>
            </View>
            <MaterialIcons name="edit" size={18} color={colors.primary} />
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
              color: colors.textSecondary,
              marginTop: -6,
            }}
          >
            อัปโหลดได้สูงสุด {UPLOAD_SLOTS} ไฟล์
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
            {Array.from({ length: UPLOAD_SLOTS }).map((_, i) => (
              <TouchableOpacity
                key={i}
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
                }}
              >
                <MaterialIcons
                  name={i === 0 ? 'camera-alt' : 'add'}
                  size={24}
                  color={colors.textTertiary}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* T&C Checkbox */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setAgreed(!agreed)}
          style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}
        >
          <View
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              borderWidth: 1.5,
              borderColor: agreed ? colors.primary : colors.hairline2,
              backgroundColor: agreed ? colors.primaryTint : colors.white,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 1,
            }}
          >
            {agreed && (
              <MaterialIcons name="check" size={14} color={colors.primary} />
            )}
          </View>
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.inkBody2,
              flex: 1,
              lineHeight: 19,
            }}
          >
            ข้าพเจ้ายืนยันว่าข้อมูลข้างต้นถูกต้องและยอมรับเงื่อนไขการเคลม
          </Text>
        </TouchableOpacity>
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

function FormRow({
  label,
  icon,
  value,
  onPress,
}: {
  label: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  value: string;
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
      <MaterialIcons name={icon} size={20} color={colors.primary} />
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
      <MaterialIcons name="chevron-right" size={20} color={colors.textTertiary} />
    </TouchableOpacity>
  );
}

function Divider() {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.hairline2,
        marginHorizontal: -2,
      }}
    />
  );
}
