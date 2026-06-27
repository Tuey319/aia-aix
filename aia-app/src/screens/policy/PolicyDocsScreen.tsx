import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

interface DocRow {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  format: string;
  size: string;
}

const DOCS: DocRow[] = [
  { icon: 'description',       title: 'สรุปผลประโยชน์กรมธรรม์',          format: 'PDF', size: '1.2 MB' },
  { icon: 'receipt',           title: 'ใบเสร็จรับเงินเบี้ยฯ ปี 2569',     format: 'PDF', size: '328 KB' },
  { icon: 'verified-user',     title: 'หนังสือรับรองการชำระเบี้ย',        format: 'PDF', size: '210 KB' },
  { icon: 'attach-file',       title: 'เอกสารแนบท้ายกรมธรรม์',           format: 'PDF', size: '548 KB' },
];

export function PolicyDocsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 6, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>เอกสารกรมธรรม์</Text>
      </View>
      <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 13, color: colors.textSecondary, paddingHorizontal: screenPadding, paddingBottom: 16 }}>
        ดาวน์โหลดเอกสารของกรมธรรม์ AIA Health Happy · P-8842-0091
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 32, gap: cardGap }}>

        <View style={{ backgroundColor: colors.card, borderRadius: radius.card, overflow: 'hidden', ...cardShadow }}>
          {DOCS.map((doc, i) => (
            <View key={i}>
              {i > 0 && <View style={{ height: 1, backgroundColor: colors.hairline, marginLeft: 56 }} />}
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 14 }}>
                <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: colors.primaryTint, alignItems: 'center', justifyContent: 'center' }}>
                  <MaterialIcons name={doc.icon} size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 14, color: colors.ink2 }}>{doc.title}</Text>
                  <Text style={{ fontFamily: fontFamily.jakarta.regular, fontSize: 11, color: colors.textSecondary, marginTop: 2 }}>
                    {doc.format} · {doc.size}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => Alert.alert('ดาวน์โหลด', `${doc.title}`)} hitSlop={12}>
                  <MaterialIcons name="file-download" size={22} color={colors.primary} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        {/* Info note */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingHorizontal: 4 }}>
          <MaterialIcons name="info-outline" size={16} color={colors.info} style={{ marginTop: 1 }} />
          <Text style={{ flex: 1, fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.info, lineHeight: 18 }}>
            เอกสารจะถูกส่งไปยังอีเมลที่ลงทะเบียนไว้ด้วย
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
