import React, { useRef } from 'react';
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

type Nav = NativeStackNavigationProp<any>;

export function AssistantScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

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
        {/* Robot icon */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: radius.icon,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MaterialIcons name="smart-toy" size={22} color={colors.white} />
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.titleLg,
            color: colors.ink,
            flex: 1,
          }}
        >
          ผู้ช่วย AIA
        </Text>

        {/* Online pill */}
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
            ออนไลน์
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
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
                เช็คว่าฉันต้องจ่ายเท่าไหร่
              </Text>
            </View>
          </View>

          {/* Bot bubble */}
          <View style={{ alignItems: 'flex-start' }}>
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
                จากกรมธรรม์ เพย์ ไลฟ์ พลัส 20 ปี ต้องชำระ{' '}
                <Text style={{ fontFamily: fontFamily.jakarta.bold, color: colors.ink }}>
                  ฿14,380
                </Text>{' '}
                (หักส่วนลด Vitality แล้ว) ครบกำหนด 25 มิ.ย. นี้ ค่ะ:
              </Text>
            </View>

            {/* Quick reply chips */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 10,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate('PaySelect')}
                activeOpacity={0.8}
                style={{
                  borderWidth: 1.5,
                  borderColor: colors.primary,
                  borderRadius: radius.pill,
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  backgroundColor: colors.primaryTint,
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.medium,
                    fontSize: fontSize.body,
                    color: colors.primary,
                  }}
                >
                  จ่ายเบี้ยฯ เลย
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                activeOpacity={0.8}
                style={{
                  borderWidth: 1.5,
                  borderColor: colors.primary,
                  borderRadius: radius.pill,
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  backgroundColor: colors.primaryTint,
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.medium,
                    fontSize: fontSize.body,
                    color: colors.primary,
                  }}
                >
                  ดูความคุ้มครอง
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => navigation.navigate('ClaimStart')}
                activeOpacity={0.8}
                style={{
                  borderWidth: 1.5,
                  borderColor: colors.primary,
                  borderRadius: radius.pill,
                  paddingHorizontal: 14,
                  paddingVertical: 7,
                  backgroundColor: colors.primaryTint,
                }}
              >
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.medium,
                    fontSize: fontSize.body,
                    color: colors.primary,
                  }}
                >
                  ยื่นเคลม
                </Text>
              </TouchableOpacity>
            </View>
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
            placeholder="พิมพ์ข้อความ..."
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
