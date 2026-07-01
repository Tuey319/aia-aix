import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';
import { AiaLogo } from '../../components/AiaLogo';

type Nav = NativeStackNavigationProp<any>;

export function AssistantActionScreen() {
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
          paddingBottom: 14,
          gap: 10,
          backgroundColor: colors.screenBg,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
            ...cardShadow,
          }}
        >
          <AiaLogo size={28} />
        </View>

        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.titleLg,
            color: colors.ink,
            flex: 1,
          }}
        >
          {s.assistant.title}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: colors.successTint,
            borderRadius: radius.pill,
            paddingHorizontal: 10,
            paddingVertical: 4,
            gap: 5,
          }}
        >
          <View
            style={{
              width: 7,
              height: 7,
              borderRadius: 99,
              backgroundColor: colors.successDot,
            }}
          />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.medium,
              fontSize: fontSize.caption,
              color: colors.success,
            }}
          >
            {s.assistant.online}
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Chat area */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: screenPadding,
            paddingTop: 8,
            paddingBottom: 16,
            gap: cardGap,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* User bubble */}
          <View style={{ alignItems: 'flex-end' }}>
            <View
              style={{
                backgroundColor: colors.primary,
                borderRadius: 16,
                borderBottomRightRadius: 4,
                paddingHorizontal: 14,
                paddingVertical: 10,
                maxWidth: '78%',
                ...primaryButtonShadow,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.bodyMd,
                  color: colors.white,
                  lineHeight: 22,
                }}
              >
                {language === 'en' ? 'How much do I need to pay?' : 'เช็คว่าฉันต้องจ่ายเท่าไหร่'}
              </Text>
            </View>
          </View>

          {/* Bot bubble with action card */}
          <View style={{ alignItems: 'flex-start', gap: 10 }}>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                borderBottomLeftRadius: 4,
                paddingHorizontal: 14,
                paddingVertical: 10,
                maxWidth: '85%',
                ...cardShadow,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.bodyMd,
                  color: colors.inkBody,
                  lineHeight: 22,
                }}
              >
                {language === 'en' ? "I've found the payment page for you. Tap the button below to continue." : 'ฉันพบหน้าชำระเงินสำหรับคุณแล้ว แตะปุ่มด้านล่างเพื่อดำเนินการต่อ'}
              </Text>
            </View>

            {/* Inline action card */}
            <TouchableOpacity
              onPress={() => navigation.navigate('PaySelect')}
              activeOpacity={0.82}
              style={{
                backgroundColor: colors.primary,
                borderRadius: radius.card,
                paddingHorizontal: 16,
                paddingVertical: 14,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                alignSelf: 'flex-start',
                minWidth: 220,
                ...primaryButtonShadow,
              }}
            >
              <MaterialIcons name="arrow-forward" size={20} color={colors.white} />
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.bold,
                  fontSize: fontSize.bodyMd,
                  color: colors.white,
                  flex: 1,
                }}
              >
                {language === 'en' ? 'Go to Payment Page' : 'ไปที่หน้าชำระเงิน'}
              </Text>
              <MaterialIcons name="chevron-right" size={18} color="rgba(255,255,255,0.7)" />
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Bottom input bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: screenPadding,
            paddingTop: 10,
            paddingBottom: insets.bottom + 10,
            backgroundColor: colors.screenBg,
            gap: 10,
            borderTopWidth: 1,
            borderTopColor: colors.hairline2,
          }}
        >
          <TextInput
            placeholder={s.assistant.placeholder}
            placeholderTextColor={colors.textTertiary}
            style={{
              flex: 1,
              height: 46,
              backgroundColor: colors.card,
              borderRadius: radius.input,
              paddingHorizontal: 14,
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.bodyMd,
              color: colors.ink,
              borderWidth: 1,
              borderColor: colors.hairline2,
            }}
          />
          <TouchableOpacity
            activeOpacity={0.82}
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              ...primaryButtonShadow,
            }}
          >
            <MaterialIcons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
