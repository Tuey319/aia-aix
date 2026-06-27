import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Switch,
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
} from '../../tokens';
import { cardShadow } from '../../tokens/shadows';
import { SectionGroup } from '../../components/SectionGroup';
import { ListRow } from '../../components/ListRow';
import { useAppStore } from '../../store';
import { useStrings } from '../../i18n';

type Nav = NativeStackNavigationProp<any>;

export function AccountScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  const language = useAppStore((s) => s.language);
  const setLanguage = useAppStore((s) => s.setLanguage);
  const faceIdEnabled = useAppStore((s) => s.faceIdEnabled);
  const setFaceIdEnabled = useAppStore((s) => s.setFaceIdEnabled);
  const s = useStrings();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Top-level header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: 16,
          justifyContent: 'space-between',
        }}
      >
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.titleLg,
            color: colors.ink,
          }}
        >
          {s.tabs.account}
        </Text>
        <TouchableOpacity hitSlop={12} onPress={() => {}}>
          <MaterialIcons name="notifications-none" size={26} color={colors.ink} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 32,
          gap: cardGap,
        }}
      >
        {/* Profile header card */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => navigation.navigate('ProfileEdit')}
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.cardLg,
            padding: 18,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
            ...cardShadow,
          }}
        >
          {/* Avatar */}
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons name="person" size={30} color={colors.white} />
          </View>

          <View style={{ flex: 1, gap: 3 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: fontSize.titleLg,
                color: colors.ink,
              }}
            >
              มาXXXXX
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: fontSize.bodyMd,
                color: colors.primary,
              }}
            >
              {s.account.viewProfile}
            </Text>
          </View>

          <MaterialIcons name="chevron-right" size={20} color={colors.textTertiary} />
        </TouchableOpacity>

        {/* Section: ตั้งค่าทั่วไป */}
        <SectionGroup label={s.account.generalSection}>
          {/* Language row */}
          <ListRow
            icon="language"
            title={s.account.language}
            showChevron={false}
            right={
              <View style={{ flexDirection: 'row', gap: 6 }}>
                <TouchableOpacity
                  onPress={() => setLanguage('en')}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 5,
                    borderRadius: radius.pill,
                    backgroundColor: language === 'en' ? colors.primary : colors.screenBg,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamily.jakarta.semiBold,
                      fontSize: fontSize.caption,
                      color: language === 'en' ? colors.white : colors.textSecondary,
                    }}
                  >
                    EN
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setLanguage('th')}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 5,
                    borderRadius: radius.pill,
                    backgroundColor: language === 'th' ? colors.primary : colors.screenBg,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamily.anuphan.semiBold,
                      fontSize: fontSize.caption,
                      color: language === 'th' ? colors.white : colors.textSecondary,
                    }}
                  >
                    ไทย
                  </Text>
                </TouchableOpacity>
              </View>
            }
          />

          {/* Face ID row */}
          <ListRow
            icon="face"
            title={s.account.faceId}
            showChevron={false}
            right={
              <Switch
                value={faceIdEnabled}
                onValueChange={setFaceIdEnabled}
                trackColor={{ false: colors.hairline2, true: colors.primary }}
                thumbColor={colors.white}
              />
            }
          />

          {/* PIN row */}
          <ListRow
            icon="lock-outline"
            title={s.account.changePin}
            onPress={() => {}}
          />

          {/* Password row */}
          <ListRow
            icon="vpn-key"
            title={s.account.changePassword}
            onPress={() => {}}
          />
        </SectionGroup>

        {/* Section: เกี่ยวกับ AIA+ */}
        <SectionGroup label={s.account.aboutSection}>
          <ListRow
            icon="phone"
            title={s.account.contact}
            onPress={() => navigation.navigate('ContactAgent')}
          />
          <ListRow
            icon="help-outline"
            title={s.account.faq}
            onPress={() => navigation.navigate('FaqList')}
          />
          <ListRow
            icon="description"
            title={s.account.terms}
            onPress={() => {}}
          />
        </SectionGroup>

        {/* Logout button */}
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.7}
          style={{
            alignItems: 'center',
            paddingVertical: 16,
            marginTop: 4,
          }}
        >
          <Text
            style={{
              fontFamily: fontFamily.anuphan.semiBold,
              fontSize: fontSize.title,
              color: colors.primary,
            }}
          >
            {s.account.logout}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
