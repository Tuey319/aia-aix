import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding } from '../../tokens';
import { cardShadow } from '../../tokens/shadows';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';
import { getFaqItems, FaqItem } from './faqData';

type Nav = NativeStackNavigationProp<any>;

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
  if (!query) return <Text style={style}>{text}</Text>;

  const lower = text.toLowerCase();
  const lowerQ = query.toLowerCase();
  const idx = lower.indexOf(lowerQ);
  if (idx === -1) return <Text style={style}>{text}</Text>;

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
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  const ALL_ITEMS: FaqItem[] = getFaqItems(language);

  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  const trimmed = query.trim();
  const results = trimmed.length > 0
    ? ALL_ITEMS.filter((item) => {
        const q = trimmed.toLowerCase();
        return (
          item.question.toLowerCase().includes(q) ||
          item.answer.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      })
    : [];

  const showEmpty = trimmed.length > 0 && results.length === 0;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header: back + live search input */}
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
            placeholder={s.support.searchPlaceholder}
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
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
      >
        {/* Result count */}
        {results.length > 0 && (
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
              paddingHorizontal: screenPadding,
              paddingBottom: 10,
            }}
          >
            {language === 'en'
              ? `${results.length} result${results.length !== 1 ? 's' : ''} found`
              : `ผลการค้นหา ${results.length} รายการ`}
          </Text>
        )}

        {/* Empty state */}
        {showEmpty && (
          <View style={{ alignItems: 'center', paddingVertical: 48, gap: 10 }}>
            <MaterialIcons name="search-off" size={40} color={colors.textTertiary} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.bodyMd,
                color: colors.textSecondary,
              }}
            >
              {language === 'en' ? 'No results found' : 'ไม่พบผลลัพธ์'}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textTertiary,
              }}
            >
              {language === 'en' ? 'Try a different search term' : 'ลองค้นหาด้วยคำอื่น'}
            </Text>
          </View>
        )}

        {/* Results */}
        {results.map((item, index) => (
          <React.Fragment key={item.id}>
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
                {/* Category badge */}
                <Text
                  style={{
                    fontFamily: fontFamily.jakarta.semiBold,
                    fontSize: 10,
                    color: colors.textTertiary,
                    textTransform: 'uppercase',
                    letterSpacing: 0.4,
                    marginBottom: 2,
                  }}
                >
                  {item.category}
                </Text>
                <HighlightedText
                  text={item.question}
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
              </View>
              <MaterialIcons name="chevron-right" size={20} color={colors.textTertiary} />
            </TouchableOpacity>
            {index < results.length - 1 && (
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
