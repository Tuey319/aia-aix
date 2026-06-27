import React, { useState } from 'react';
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
} from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

export function ProfileEditScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  const [phone, setPhone] = useState('081 234 5678');
  const [email, setEmail] = useState('user@email.com');
  const [address, setAddress] = useState('');

  const inputStyle = {
    fontFamily: fontFamily.jakarta.regular,
    fontSize: fontSize.bodyMd,
    color: colors.ink,
    backgroundColor: colors.card,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.hairline2,
    paddingHorizontal: 14,
    paddingVertical: 13,
  } as const;

  const labelStyle = {
    fontFamily: fontFamily.anuphan.medium,
    fontSize: fontSize.caption,
    color: colors.textSecondary,
    marginBottom: 6,
    marginLeft: 2,
  } as const;

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
          ข้อมูลส่วนตัว
        </Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: screenPadding,
            paddingBottom: insets.bottom + 100,
            gap: cardGap,
          }}
        >
          {/* Profile photo */}
          <View style={{ alignItems: 'center', paddingVertical: 20, gap: 10 }}>
            <View
              style={{
                width: 88,
                height: 88,
                borderRadius: 44,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                ...cardShadow,
              }}
            >
              <MaterialIcons name="person" size={48} color={colors.white} />
            </View>
            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.bodyMd,
                  color: colors.primary,
                }}
              >
                แก้ไขรูปภาพ
              </Text>
            </TouchableOpacity>
          </View>

          {/* Form card */}
          <View
            style={{
              backgroundColor: colors.card,
              borderRadius: radius.card,
              padding: 18,
              gap: 18,
              ...cardShadow,
            }}
          >
            {/* Phone */}
            <View>
              <Text style={labelStyle}>หมายเลขโทรศัพท์</Text>
              <TextInput
                style={inputStyle}
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            {/* Email */}
            <View>
              <Text style={labelStyle}>อีเมล</Text>
              <TextInput
                style={inputStyle}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            {/* Address */}
            <View>
              <Text style={labelStyle}>ที่อยู่จัดส่งเอกสาร</Text>
              <TextInput
                style={[inputStyle, { height: 80, textAlignVertical: 'top' }]}
                value={address}
                onChangeText={setAddress}
                multiline
                numberOfLines={3}
                placeholder="กรอกที่อยู่..."
                placeholderTextColor={colors.textTertiary}
              />
            </View>
          </View>
        </ScrollView>

        {/* Save button */}
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: colors.screenBg,
            paddingHorizontal: screenPadding,
            paddingTop: 12,
            paddingBottom: insets.bottom + 12,
            borderTopWidth: 1,
            borderTopColor: colors.hairline,
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
              บันทึก
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
