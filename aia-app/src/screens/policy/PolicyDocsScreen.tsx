import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow } from '../../tokens/shadows';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;

interface DocRow {
  icon: keyof typeof MaterialIcons.glyphMap;
  titleTh: string;
  titleEn: string;
  format: string;
  size: string;
}

const DOCS: DocRow[] = [
  { icon: 'description',   titleTh: 'สรุปผลประโยชน์กรมธรรม์',      titleEn: 'Benefit Summary',           format: 'PDF', size: '1.2 MB' },
  { icon: 'receipt',       titleTh: 'ใบเสร็จรับเงินเบี้ยฯ ปี 2569', titleEn: 'Premium Receipt 2026',      format: 'PDF', size: '328 KB' },
  { icon: 'verified-user', titleTh: 'หนังสือรับรองการชำระเบี้ย',    titleEn: 'Tax Deduction Certificate', format: 'PDF', size: '210 KB' },
  { icon: 'attach-file',   titleTh: 'เอกสารแนบท้ายกรมธรรม์',       titleEn: 'Endorsements',              format: 'PDF', size: '548 KB' },
];

export function PolicyDocsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: 6,
          gap: 8,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>
          {s.policy.docsTitle}
        </Text>
      </View>

      {/* Subtitle with policy number */}
      <Text
        style={{
          fontFamily: fontFamily.anuphan.regular,
          fontSize: 13,
          color: colors.textSecondary,
          paddingHorizontal: screenPadding,
          paddingBottom: 16,
        }}
      >
        {language === 'en' ? 'Download documents for AIA Health Happy · P-8842-0091' : 'ดาวน์โหลดเอกสารของกรมธรรม์ AIA Health Happy · P-8842-0091'}
      </Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 32,
          gap: cardGap,
        }}
      >
        {/* Document rows card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            overflow: 'hidden',
            ...cardShadow,
          }}
        >
          {DOCS.map((doc, i) => (
            <View key={i}>
              {i > 0 && (
                <View style={{ height: 1, backgroundColor: colors.hairline, marginLeft: 56 }} />
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  gap: 14,
                }}
              >
                {/* Icon box */}
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: colors.primaryTint,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <MaterialIcons name={doc.icon} size={20} color={colors.primary} />
                </View>

                {/* Name + meta */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: fontFamily.anuphan.semiBold,
                      fontSize: 14,
                      color: colors.ink2,
                    }}
                  >
                    {language === 'en' ? doc.titleEn : doc.titleTh}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.jakarta.regular,
                      fontSize: 11,
                      color: colors.textSecondary,
                      marginTop: 2,
                    }}
                  >
                    {doc.format} · {doc.size}
                  </Text>
                </View>

                {/* Download icon */}
                <TouchableOpacity
                  onPress={() => Alert.alert(s.common.download, language === 'en' ? doc.titleEn : doc.titleTh)}
                  hitSlop={12}
                >
                  <MaterialIcons name="file-download" size={22} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Blue info note */}
        <View
          style={{
            backgroundColor: colors.infoTint,
            borderRadius: radius.card,
            padding: 14,
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: 10,
          }}
        >
          <MaterialIcons name="email" size={18} color={colors.info} style={{ marginTop: 1 }} />
          <Text
            style={{
              flex: 1,
              fontFamily: fontFamily.anuphan.regular,
              fontSize: 12,
              color: colors.infoDeep,
              lineHeight: 18,
            }}
          >
            {language === 'en' ? 'Documents will also be sent to your registered email.' : 'เอกสารจะถูกส่งไปยังอีเมลที่ลงทะเบียนไว้ด้วย'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
