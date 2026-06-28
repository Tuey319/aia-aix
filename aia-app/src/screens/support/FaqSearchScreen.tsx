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
  cardGap,
} from '../../tokens';
import { cardShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

interface FaqResult {
  id: string;
  title: string;
  subtitle: string;
}

const MOCK_RESULTS: FaqResult[] = [
  {
    id: '1',
    title: 'เปลี่ยนรอบ การชำระอย่างไร?',
    subtitle: 'การชำระเบี้ย',
  },
  {
    id: '2',
    title: 'การ เปลี่ยนรอบ มีผลเมื่อไหร่?',
    subtitle: 'การชำระเบี้ย',
  },
  {
    id: '3',
    title: 'เปลี่ยนรอบ แล้วเสียส่วนลดไหม?',
    subtitle: 'เบี้ยประกัน',
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
  const [query, setQuery] = useState('เปลี่ยนรอบ');
  const [isFocused, setIsFocused] = useState(true);
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
          r.subtitle.toLowerCase().includes(trimmed.toLowerCase()),
      )
    : [];

  const showEmpty = trimmed.length > 0 && filtered.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Search header row — back + active search input */}
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
            borderWidth: 1.5,
            borderColor: isFocused ? colors.primary : colors.hairline2,
            ...cardShadow,
          }}
        >
          <MaterialIcons
            name="search"
            size={18}
            color={isFocused ? colors.primary : colors.textSecondary}
          />
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
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            returnKeyType="search"
            autoFocus
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => setQuery('')} hitSlop={8}>
              <MaterialIcons name="cancel" size={18} color={colors.textSecondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: insets.bottom + 32,
        }}
      >
        {/* Result count label */}
        {filtered.length > 0 && (
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
              paddingHorizontal: screenPadding,
              paddingBottom: 10,
            }}
          >
            ผลการค้นหา {filtered.length} รายการ
          </Text>
        )}

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

        {/* Result rows — plain list with dividers */}
        {filtered.map((result, index) => (
          <React.Fragment key={result.id}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate('FaqAnswer')}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: screenPadding,
                paddingVertical: 16,
                gap: 10,
                backgroundColor: colors.card,
              }}
            >
              <View style={{ flex: 1, gap: 3 }}>
                <HighlightedText
                  text={result.title}
                  query={trimmed}
                  style={{
                    fontFamily: fontFamily.anuphan.medium,
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
                  }}
                >
                  {result.subtitle}
                </Text>
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
            {index < filtered.length - 1 && (
              <View
                style={{
                  height: 1,
                  backgroundColor: colors.hairline2,
                  marginHorizontal: screenPadding,
                }}
              />
            )}
          </React.Fragment>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
