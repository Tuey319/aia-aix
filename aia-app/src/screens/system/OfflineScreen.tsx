import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, fontFamily, fontSize, radius, screenPadding } from '../../tokens';
import { primaryButtonShadow } from '../../tokens/shadows';
import { IllustrationError } from '../../components/illustrations';
import { useStrings } from '../../i18n';

export function OfflineScreen() {
  const insets = useSafeAreaInsets();
  const s = useStrings();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top', 'bottom']}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: screenPadding, gap: 16 }}>
        <IllustrationError width={220} height={180} color={colors.primary} variant="offline" />
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 22, color: colors.ink2, textAlign: 'center' }}>
          {s.system.offlineTitle}
        </Text>
        <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: fontSize.bodyMd, color: colors.textSecondary, textAlign: 'center', lineHeight: 22 }}>
          {s.system.offlineSub}
        </Text>
      </View>

      <View style={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 16 }}>
        <TouchableOpacity activeOpacity={0.82}
          style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 52, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}>
          <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: fontSize.title }}>{s.common.retry}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
