import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, fontFamily, fontSize, radius, screenPadding } from '../tokens';
import { primaryButtonShadow } from '../tokens/shadows';
import { useAppStore } from '../store';
import { useStrings } from '../i18n';

export function LoginScreen() {
  const [phone, setPhone] = useState('081 234 5678');
  const [pin, setPin] = useState('······');
  const [pinVisible, setPinVisible] = useState(false);
  const setLoggedIn = useAppStore((s) => s.setLoggedIn);
  const s = useStrings();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: screenPadding, paddingTop: 60 }} keyboardShouldPersistTaps="handled">
          {/* Logo */}
          <View style={{ alignItems: 'center', marginBottom: 48 }}>
            <View style={{ width: 72, height: 72, borderRadius: 20, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginBottom: 20, ...primaryButtonShadow }}>
              <Text style={{ color: colors.white, fontFamily: fontFamily.jakarta.extraBold, fontSize: 22, letterSpacing: 1 }}>AIA</Text>
            </View>
            <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 24, color: colors.ink, marginBottom: 8 }}>{s.login.welcome}</Text>
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.textSecondary, textAlign: 'center' }}>{s.login.subtitle}</Text>
          </View>

          {/* Form */}
          <View style={{ gap: 14 }}>
            <View>
              <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 12, color: colors.textSecondary, marginBottom: 6, marginLeft: 4 }}>{s.login.phone}</Text>
              <TextInput value={phone} onChangeText={setPhone} keyboardType="phone-pad"
                style={{ backgroundColor: colors.card, borderRadius: radius.input, borderWidth: 1, borderColor: colors.hairline2, paddingHorizontal: 16, paddingVertical: 14, fontFamily: fontFamily.jakarta.regular, fontSize: fontSize.bodyMd, color: colors.ink2 }}
                placeholderTextColor={colors.textTertiary} />
            </View>

            <View>
              <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 12, color: colors.textSecondary, marginBottom: 6, marginLeft: 4 }}>{s.login.pin}</Text>
              <View style={{ position: 'relative' }}>
                <TextInput value={pin} onChangeText={setPin} secureTextEntry={!pinVisible} keyboardType="numeric"
                  style={{ backgroundColor: colors.card, borderRadius: radius.input, borderWidth: 1, borderColor: colors.hairline2, paddingHorizontal: 16, paddingRight: 50, paddingVertical: 14, fontFamily: fontFamily.jakarta.regular, fontSize: fontSize.bodyMd, color: colors.ink2 }}
                  placeholderTextColor={colors.textTertiary} />
                <TouchableOpacity onPress={() => setPinVisible((v) => !v)} style={{ position: 'absolute', right: 14, top: 0, bottom: 0, justifyContent: 'center' }}>
                  <MaterialIcons name={pinVisible ? 'visibility' : 'visibility-off'} size={20} color={colors.textSecondary} />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity onPress={() => setLoggedIn(true)} activeOpacity={0.82}
              style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', marginTop: 8, ...primaryButtonShadow }}>
              <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>{s.login.loginBtn}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setLoggedIn(true)} activeOpacity={0.7}
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 12 }}>
              <MaterialIcons name="face" size={18} color={colors.primary} />
              <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 14, color: colors.primary }}>{s.login.faceId}</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 13, color: colors.textSecondary }}>{s.login.noAccount}</Text>
              <TouchableOpacity>
                <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 13, color: colors.primary }}>{s.login.register}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
