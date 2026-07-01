import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
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
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';

type Nav = NativeStackNavigationProp<any>;

export function ProfileEditScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  const [phone, setPhone] = useState('081-234-5678');
  const [email, setEmail] = useState('somchai@email.com');
  const [address, setAddress] = useState('88/12 ถนนสุขุมวิท แขวงคลองเตย กรุงเทพฯ\n10110');
  const [emailFocused, setEmailFocused] = useState(true);
  const emailRef = useRef<TextInput>(null);

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
          gap: 8,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.titleLg,
            color: colors.ink,
            flex: 1,
          }}
        >
          {s.account.profileTitle}
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: insets.bottom + 100,
          }}
        >
          {/* Profile avatar + policy no */}
          <View style={{ alignItems: 'center', paddingVertical: 24, gap: 6 }}>
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 36,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                ...cardShadow,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.bold,
                  fontSize: 30,
                  color: colors.white,
                }}
              >
                ส
              </Text>
            </View>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textSecondary,
                marginTop: 4,
              }}
            >
              P-8842-8891
            </Text>
          </View>

          {/* Section label */}
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
              paddingHorizontal: screenPadding,
              paddingBottom: 8,
            }}
          >
            {language === 'en' ? 'Contact Information' : 'ข้อมูลติดต่อ'}
          </Text>

          {/* Form card */}
          <View
            style={{
              backgroundColor: colors.card,
              marginHorizontal: screenPadding,
              borderRadius: radius.card,
              ...cardShadow,
              gap: 0,
            }}
          >
            {/* Phone row — display value + pencil icon */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: cardPadding,
                paddingVertical: 14,
                gap: 12,
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
                  {s.account.phone}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.medium,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink,
                  }}
                >
                  {phone}
                </Text>
              </View>
              <TouchableOpacity hitSlop={12} onPress={() => {}}>
                <MaterialIcons name="edit" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>

            <View style={{ height: 1, backgroundColor: colors.hairline2, marginHorizontal: cardPadding }} />

            {/* Email — active TextInput with red border */}
            <View
              style={{
                paddingHorizontal: cardPadding,
                paddingVertical: 14,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: colors.textSecondary,
                  marginBottom: 6,
                }}
              >
                {s.account.email}
              </Text>
              <View
                style={{
                  borderWidth: 1.5,
                  borderColor: emailFocused ? colors.primary : colors.hairline2,
                  borderRadius: radius.input,
                  paddingHorizontal: 12,
                  paddingVertical: 10,
                  backgroundColor: colors.card,
                }}
              >
                <TextInput
                  ref={emailRef}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  style={{
                    fontFamily: fontFamily.anuphan.regular,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink,
                    padding: 0,
                  }}
                  placeholderTextColor={colors.textTertiary}
                />
              </View>
            </View>

            <View style={{ height: 1, backgroundColor: colors.hairline2, marginHorizontal: cardPadding }} />

            {/* Address row — display value + pencil icon */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                paddingHorizontal: cardPadding,
                paddingVertical: 14,
                gap: 12,
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
                  {s.account.address}
                </Text>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.regular,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink,
                    lineHeight: 20,
                  }}
                >
                  {address}
                </Text>
              </View>
              <TouchableOpacity hitSlop={12} onPress={() => {}} style={{ marginTop: 2 }}>
                <MaterialIcons name="edit" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Amber info note */}
          <View
            style={{
              marginHorizontal: screenPadding,
              marginTop: cardGap,
              backgroundColor: colors.amberTint,
              borderRadius: radius.card,
              flexDirection: 'row',
              alignItems: 'flex-start',
              padding: 12,
              gap: 10,
            }}
          >
            <MaterialIcons name="info-outline" size={18} color={colors.amber} style={{ marginTop: 1 }} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.amberDeeper,
                flex: 1,
                lineHeight: 18,
              }}
            >
              {language === 'en' ? 'Changes will need to be confirmed across all your policies.' : 'การเปลี่ยนข้อมูลจะต้องยืนยันที่ทุกกรมธรรม์ของคุณ'}
            </Text>
          </View>
        </ScrollView>

        {/* Save button */}
        <View
          style={{
            backgroundColor: colors.screenBg,
            paddingHorizontal: screenPadding,
            paddingTop: 12,
            paddingBottom: insets.bottom + 12,
            borderTopWidth: 1,
            borderTopColor: colors.hairline2,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            activeOpacity={0.82}
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
                fontSize: fontSize.title,
              }}
            >
              {s.account.saveBtn}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
