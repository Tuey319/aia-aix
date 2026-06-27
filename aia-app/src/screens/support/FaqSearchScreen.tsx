import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
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
} from '../../tokens';
import { cardShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

interface FaqResult {
  id: string;
  title: string;
  excerpt: string;
}

const MOCK_RESULTS: FaqResult[] = [
  {
    id: '1',
    title: 'จะเปลี่ยนงวดชำระเบี้ยฯ ได้อย่างไร?',
    excerpt: 'สามารถเปลี่ยนได้ผ่านแอป AIA+ โดยไปที่เมนูการจัดการเบี้ย...',
  },
  {
    id: '2',
    title: 'วิธีเคลมค่ารักษาพยาบาล',
    excerpt: 'เคลมผ่านแอปได้ทันที อัปโหลดใบเสร็จและเอกสารการรักษา...',
  },
  {
    id: '3',
    title: 'ดาวน์โหลดเอกสารกรมธรรม์ได้ที่ไหน?',
    excerpt: 'ไปที่แท็บกรมธรรม์แล้วเลือกขอเอกสาร ดาวน์โหลด PDF ได้เลย...',
  },
];

function HighlightedText({
  text,
  query,
  style,
  boldStyle,
}: {
  text: string;
  query: string;
  style: object;
  boldStyle: object;
}) {
  if (!query) {
    return <Text style={style}>{text}</Text>;
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const idx = lowerText.indexOf(lowerQuery);

  if (idx === -1) {
    return <Text style={style}>{text}</Text>;
  }

  return (
    <Text style={style}>
      {text.slice(0, idx)}
      <Text style={boldStyle}>{text.slice(idx, idx + query.length)}</Text>
      {text.slice(idx + query.length)}
    </Text>
  );
}

export function FaqSearchScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(timer);
  }, []);

  const trimmed = query.trim();
  const filtered = trimmed
    ? MOCK_RESULTS.filter(
        (r) =>
          r.title.toLowerCase().includes(trimmed.toLowerCase()) ||
          r.excerpt.toLowerCase().includes(trimmed.toLowerCase()),
      )
    : [];

  const showEmpty = trimmed.length > 0 && filtered.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Search header row */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: 14,
          gap: 10,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.card,
            borderRadius: radius.input,
            paddingHorizontal: 12,
            paddingVertical: 10,
            gap: 8,
            ...cardShadow,
          }}
        >
          <MaterialIcons name="search" size={18} color={colors.textSecondary} />
          <TextInput
            ref={inputRef}
            style={{
              flex: 1,
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.bodyMd,
              color: colors.ink,
              padding: 0,
            }}
            placeholder="ค้นหา"
            placeholderTextColor={colors.textTertiary}
            value={query}
            onChangeText={setQuery}
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
              <MaterialIcons name="close" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 32,
          gap: 8,
        }}
      >
        {showEmpty && (
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 48,
              gap: 10,
            }}
          >
            <MaterialIcons name="search-off" size={40} color={colors.textTertiary} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.bodyMd,
                color: colors.textSecondary,
              }}
            >
              ไม่พบผลลัพธ์
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textTertiary,
              }}
            >
              ลองค้นหาด้วยคำอื่น
            </Text>
          </View>
        )}

        {filtered.map((result) => (
          <TouchableOpacity
            key={result.id}
            activeOpacity={0.8}
            onPress={() => navigation.navigate('FaqAnswer')}
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 16,
              gap: 6,
              ...cardShadow,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
              <View style={{ flex: 1, gap: 4 }}>
                <HighlightedText
                  text={result.title}
                  query={trimmed}
                  style={{
                    fontFamily: fontFamily.anuphan.semiBold,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink2,
                    lineHeight: fontSize.bodyMd * 1.5,
                  }}
                  boldStyle={{
                    fontFamily: fontFamily.anuphan.bold,
                    color: colors.primary,
                  }}
                />
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.regular,
                    fontSize: fontSize.caption,
                    color: colors.textSecondary,
                    lineHeight: fontSize.caption * 1.5,
                  }}
                  numberOfLines={2}
                >
                  {result.excerpt}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.textTertiary} />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
