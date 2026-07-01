import React from 'react';
import { View, Text } from 'react-native';
import { colors, fontFamily } from '../tokens';
import { useStrings } from '../i18n';

interface Props {
  name?: string;
}

export function PlaceholderScreen({ name = 'Screen' }: Props) {
  const s = useStrings();
  return (
    <View style={{ flex: 1, backgroundColor: colors.screenBg, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 18, color: colors.ink2 }}>{name}</Text>
      <Text style={{ fontFamily: fontFamily.jakarta.regular, fontSize: 13, color: colors.textSecondary, marginTop: 8 }}>
        {s.common.comingSoon}
      </Text>
    </View>
  );
}
