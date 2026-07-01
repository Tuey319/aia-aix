import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, fontSize, radius, screenPadding } from '../tokens';
import { cardShadow, primaryButtonShadow } from '../tokens/shadows';
import { useAppStore } from '../store';
import { useStrings } from '../i18n';
import { AiaLogo } from '../components/AiaLogo';

export function LoginScreen() {
  const [phone, setPhone] = useState('081 234 5678');
  const [pin, setPin] = useState('······');
  const [pinVisible, setPinVisible] = useState(false);
  const setLoggedIn = useAppStore((s) => s.setLoggedIn);
  const s = useStrings();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: screenPadding,
            paddingTop: 64,
          }}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo + Heading */}
          <View style={{ alignItems: 'center', marginBottom: 44 }}>
            {/* AIA rounded square logo */}
            <View
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                backgroundColor: colors.card,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 20,
                ...cardShadow,
              }}
            >
              <AiaLogo size={52} />
            </View>

            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: 24,
                color: colors.ink,
                marginBottom: 6,
              }}
            >
              {s.login.welcome}
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: 14,
                color: colors.textSecondary,
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              {s.login.subtitle}
            </Text>
          </View>

          {/* Form */}
          <View style={{ gap: 16 }}>
            {/* Phone field */}
            <View>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.medium,
                  fontSize: 12,
                  color: colors.textSecondary,
                  marginBottom: 6,
                  marginLeft: 2,
                }}
              >
                {s.login.phone}
              </Text>
              <TextInput
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                style={{
                  backgroundColor: colors.card,
                  borderRadius: radius.input,
                  borderWidth: 1,
                  borderColor: colors.hairline2,
                  paddingHorizontal: 16,
                  paddingVertical: 14,
                  fontFamily: fontFamily.jakarta.regular,
                  fontSize: fontSize.bodyMd,
                  color: colors.ink2,
                }}
                placeholderTextColor={colors.textTertiary}
              />
            </View>

            {/* PIN field */}
            <View>
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.medium,
                  fontSize: 12,
                  color: colors.textSecondary,
                  marginBottom: 6,
                  marginLeft: 2,
                }}
              >
                {s.login.pin}
              </Text>
              <View style={{ position: 'relative' }}>
                <TextInput
                  value={pin}
                  onChangeText={setPin}
                  secureTextEntry={!pinVisible}
                  keyboardType="numeric"
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: radius.input,
                    borderWidth: 1,
                    borderColor: colors.hairline2,
                    paddingHorizontal: 16,
                    paddingRight: 52,
                    paddingVertical: 14,
                    fontFamily: fontFamily.jakarta.regular,
                    fontSize: fontSize.bodyMd,
                    color: colors.ink2,
                  }}
                  placeholderTextColor={colors.textTertiary}
                />
                <TouchableOpacity
                  onPress={() => setPinVisible((v) => !v)}
                  style={{
                    position: 'absolute',
                    right: 14,
                    top: 0,
                    bottom: 0,
                    justifyContent: 'center',
                    paddingHorizontal: 4,
                  }}
                >
                  <MaterialIcons
                    name={pinVisible ? 'visibility' : 'visibility-off'}
                    size={20}
                    color={colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Login button */}
            <TouchableOpacity
              onPress={() => setLoggedIn(true)}
              activeOpacity={0.82}
              style={{
                backgroundColor: colors.primary,
                borderRadius: radius.button,
                height: 52,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 4,
                ...primaryButtonShadow,
              }}
            >
              <Text
                style={{
                  color: colors.white,
                  fontFamily: fontFamily.anuphan.bold,
                  fontSize: 16,
                  letterSpacing: 0.2,
                }}
              >
                {s.login.loginBtn}
              </Text>
            </TouchableOpacity>

            {/* Face ID link */}
            <TouchableOpacity
              onPress={() => setLoggedIn(true)}
              activeOpacity={0.7}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                paddingVertical: 10,
              }}
            >
              <MaterialIcons name="face" size={18} color={colors.primary} />
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: 14,
                  color: colors.primary,
                }}
              >
                {s.login.faceId}
              </Text>
            </TouchableOpacity>

            {/* Register */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 4,
                paddingBottom: 32,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: 13,
                  color: colors.textSecondary,
                }}
              >
                {s.login.noAccount}
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    fontFamily: fontFamily.anuphan.semiBold,
                    fontSize: 13,
                    color: colors.primary,
                  }}
                >
                  {s.login.register}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
