import React from 'react';
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

interface ChannelRow {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
  sub: string;
}

const CHANNELS: ChannelRow[] = [
  { icon: 'access-time', title: 'นัดให้โทรกลับ', sub: 'เลือกเวลาที่สะดวก' },
  { icon: 'chat-bubble-outline', title: 'แชทกับผู้ช่วย', sub: 'ตอบทันที 24 ชม.' },
  { icon: 'location-on', title: 'ค้นหาสาขาใกล้คุณ', sub: 'อา.–ศ. 08:30–17:00 น.' },
];

export function ContactAgentScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 16, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>ติดต่อเจ้าหน้าที่</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 32, gap: cardGap }}>
        {/* Dark hero card */}
        <View style={{ backgroundColor: colors.ink, borderRadius: radius.card, padding: 20, gap: 12 }}>
          {/* Live dot + label */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors.successDot }} />
            <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 12, color: 'rgba(255,255,255,0.65)' }}>
              แจ้งให้บริการตลอด 24 ชม.
            </Text>
          </View>

          <View style={{ gap: 4 }}>
            <Text style={{ fontFamily: fontFamily.jakarta.semiBold, fontSize: 11, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.2, textTransform: 'uppercase' }}>
              AIA Call Center
            </Text>
            <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 44, color: colors.white, letterSpacing: -1 }}>
              1581
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => Linking.openURL('tel:1581')}
            activeOpacity={0.82}
            style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 50, alignItems: 'center', justifyContent: 'center', ...primaryButtonShadow }}
          >
            <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 16 }}>โทรเลย</Text>
          </TouchableOpacity>
        </View>

        {/* ช่องทางอื่น */}
        <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 12, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.6, marginTop: 4, marginLeft: 2 }}>
          ช่องทางอื่น
        </Text>

        <View style={{ backgroundColor: colors.card, borderRadius: radius.card, overflow: 'hidden', ...cardShadow }}>
          {CHANNELS.map((ch, i) => (
            <View key={ch.title}>
              {i > 0 && <View style={{ height: 1, backgroundColor: colors.hairline, marginLeft: 54 }} />}
              <TouchableOpacity activeOpacity={0.7}
                style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 15, gap: 14 }}>
                <MaterialIcons name={ch.icon} size={22} color={colors.primary} />
                <View style={{ flex: 1 }}>
                  <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 14, color: colors.ink2 }}>{ch.title}</Text>
                  <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.textSecondary }}>{ch.sub}</Text>
                </View>
                <MaterialIcons name="chevron-right" size={20} color={colors.textTertiary} />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
