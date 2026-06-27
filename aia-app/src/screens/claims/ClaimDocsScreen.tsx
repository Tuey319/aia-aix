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

const STEP = 2;

interface DocSlot {
  id: string;
  label: string;
  optional?: boolean;
  uploaded?: boolean;
}

const REQUIRED_DOCS: DocSlot[] = [
  { id: 'cert', label: 'ใบรับรองแพทย์' },
  { id: 'receipt', label: 'ใบเสร็จค่ารักษา' },
  { id: 'xray', label: 'ผลตรวจ/ฟิล์มเอกซเรย์', optional: true },
];

const ID_DOCS: DocSlot[] = [
  { id: 'id', label: 'บัตรประชาชน/พาสปอร์ต', uploaded: true },
];

export function ClaimDocsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [uploaded, setUploaded] = useState<Record<string, boolean>>({ id: true });

  function toggleUpload(id: string) {
    setUploaded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <ClaimStepHeader step={STEP} title="อัปโหลดเอกสาร" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 100,
          gap: cardGap,
        }}
      >
        {/* Required Docs */}
        <SectionLabel>เอกสารที่จำเป็น</SectionLabel>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: cardPadding,
            gap: 14,
            ...cardShadow,
          }}
        >
          {REQUIRED_DOCS.map((doc) => (
            <UploadSlot
              key={doc.id}
              label={doc.label}
              optional={doc.optional}
              uploaded={!!uploaded[doc.id]}
              onPress={() => toggleUpload(doc.id)}
            />
          ))}
        </View>

        {/* Identity Docs */}
        <SectionLabel>ยืนยันตัวตน</SectionLabel>
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: cardPadding,
            gap: 14,
            ...cardShadow,
          }}
        >
          {ID_DOCS.map((doc) => (
            <UploadSlot
              key={doc.id}
              label={doc.label}
              uploaded={!!uploaded[doc.id]}
              onPress={() => toggleUpload(doc.id)}
            />
          ))}
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
          onPress={() => navigation.navigate('ClaimPayment')}
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

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        fontFamily: fontFamily.anuphan.semiBold,
        fontSize: fontSize.bodyMd,
        color: colors.inkBody2,
        marginTop: 4,
      }}
    >
      {children}
    </Text>
  );
}

function UploadSlot({
  label,
  optional,
  uploaded,
  onPress,
}: {
  label: string;
  optional?: boolean;
  uploaded: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {/* Upload box */}
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: 12,
          borderWidth: uploaded ? 0 : 1.5,
          borderColor: colors.hairline2,
          borderStyle: 'dashed',
          backgroundColor: uploaded ? colors.successTint : colors.screenBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons
          name={uploaded ? 'check-circle' : 'add'}
          size={26}
          color={uploaded ? colors.success : colors.textTertiary}
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.medium,
            fontSize: fontSize.bodyMd,
            color: colors.ink2,
          }}
        >
          {label}
        </Text>
        {optional && (
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textTertiary,
              marginTop: 2,
            }}
          >
            (ถ้ามี)
          </Text>
        )}
        {uploaded && (
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.success,
              marginTop: 2,
            }}
          >
            อัปโหลดแล้ว
          </Text>
        )}
      </View>

      {!uploaded && (
        <MaterialIcons name="camera-alt" size={20} color={colors.primary} />
      )}
    </TouchableOpacity>
  );
}
