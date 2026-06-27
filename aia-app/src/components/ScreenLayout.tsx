import React from 'react';
import { ScrollView, View, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, screenPadding } from '../tokens';

interface ScreenLayoutProps {
  children: React.ReactNode;
  scrollable?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
  padHorizontal?: boolean;
  bg?: string;
}

export function ScreenLayout({
  children,
  scrollable = true,
  style,
  contentStyle,
  padHorizontal = true,
  bg = colors.screenBg,
}: ScreenLayoutProps) {
  const insets = useSafeAreaInsets();

  const inner = (
    <View
      style={[
        {
          paddingHorizontal: padHorizontal ? screenPadding : 0,
          paddingBottom: insets.bottom + 24,
          gap: 12,
        },
        contentStyle,
      ]}
    >
      {children}
    </View>
  );

  if (scrollable) {
    return (
      <ScrollView
        style={[{ flex: 1, backgroundColor: bg }, style]}
        contentContainerStyle={{ paddingTop: 16 }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {inner}
      </ScrollView>
    );
  }

  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: bg }, style]}>
      {inner}
    </SafeAreaView>
  );
}
