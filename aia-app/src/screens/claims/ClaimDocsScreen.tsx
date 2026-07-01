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
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;

const STEP = 2;

interface DocRow {
  id: string;
  label: string;
  labelEn: string;
  uploaded: boolean;
}

export function ClaimDocsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  const INITIAL_DOCS: DocRow[] = [
    { id: 'receipt', label: 'ใบเสร็จรับเงินตัวจริง', labelEn: 'Original Receipt', uploaded: true },
    { id: 'expense', label: 'ใบแสดงรายการค่าใช้จ่าย', labelEn: 'Itemised Expense Statement', uploaded: true },
    { id: 'cert', label: 'ใบรับรองแพทย์', labelEn: 'Medical Certificate', uploaded: false },
  ];

  const [docs, setDocs] = useState<DocRow[]>(INITIAL_DOCS);
  const [idUploaded, setIdUploaded] = useState(false);

  function toggleDoc(id: string) {
    setDocs((prev) =>
      prev.map((d) => (d.id === id ? { ...d, uploaded: !d.uploaded } : d)),
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <ClaimStepHeader step={STEP} title={s.claims.docsTitle} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 100,
          gap: cardGap,
        }}
      >
        {/* Required Docs */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            paddingHorizontal: cardPadding,
            ...cardShadow,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.bodyMd,
              color: colors.inkBody2,
              paddingVertical: 14,
            }}
          >
            {language === 'en' ? 'Required Documents for Medical Claim' : 'เอกสารที่จำเป็นสำหรับการเคลมค่ารักษา'}
          </Text>
          <View style={{ height: 1, backgroundColor: colors.hairline2 }} />

          {docs.map((doc, index) => (
            <React.Fragment key={doc.id}>
              <TouchableOpacity
                activeOpacity={0.75}
                onPress={() => toggleDoc(doc.id)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 14,
                  gap: 12,
                }}
              >
                {/* Status icon */}
                {doc.uploaded ? (
                  <MaterialIcons name="check-circle" size={22} color={colors.success} />
                ) : (
                  <View
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 11,
                      borderWidth: 1.5,
                      borderColor: colors.hairline2,
                      backgroundColor: colors.screenBg,
                    }}
                  />
                )}

                <Text
                  style={{
                    flex: 1,
                    fontFamily: fontFamily.anuphan.medium,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink2,
                  }}
                >
                  {language === 'en' ? doc.labelEn : doc.label}
                </Text>

                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.medium,
                    fontSize: fontSize.caption,
                    color: doc.uploaded ? colors.success : colors.primary,
                  }}
                >
                  {doc.uploaded
                    ? (language === 'en' ? 'Attached' : 'แนบแล้ว')
                    : (language === 'en' ? 'Attach' : 'แนบใหม่')}
                </Text>
              </TouchableOpacity>
              {index < docs.length - 1 && (
                <View style={{ height: 1, backgroundColor: colors.hairline2 }} />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* ID Document */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: cardPadding,
            gap: 14,
            ...cardShadow,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.bodyMd,
              color: colors.inkBody2,
            }}
          >
            {s.claims.idCard}{' '}
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                color: colors.textSecondary,
              }}
            >
              {language === 'en' ? '(for identity verification)' : '(เพื่อยืนยันตัวตน)'}
            </Text>
          </Text>

          {/* Upload box */}
          <TouchableOpacity
            activeOpacity={0.75}
            onPress={() => setIdUploaded(!idUploaded)}
            style={{
              height: 120,
              borderRadius: 12,
              borderWidth: 1.5,
              borderColor: idUploaded ? colors.success : colors.hairline2,
              borderStyle: 'dashed',
              backgroundColor: idUploaded ? colors.successTint : colors.screenBg,
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            <MaterialIcons
              name={idUploaded ? 'check-circle' : 'credit-card'}
              size={32}
              color={idUploaded ? colors.success : colors.primary}
            />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.body,
                color: idUploaded ? colors.success : colors.ink2,
              }}
            >
              {idUploaded
                ? (language === 'en' ? 'Uploaded' : 'อัปโหลดแล้ว')
                : (language === 'en' ? 'Capture / Upload ID Card' : 'ถ่าย / อัปโหลดบัตรประชาชน')}
            </Text>
            {!idUploaded && (
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: colors.textTertiary,
                }}
              >
                {language === 'en' ? 'Supports JPG, PNG, PDF' : 'รองรับ JPG, PNG, PDF'}
              </Text>
            )}
          </TouchableOpacity>
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
            {s.common.next}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
