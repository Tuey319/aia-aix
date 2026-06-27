import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, screenPadding } from '../tokens';

interface ClaimStepHeaderProps {
  step: number;   // 1-4
  total?: number; // defaults to 4
  title: string;
}

export function ClaimStepHeader({ step, total = 4, title }: ClaimStepHeaderProps) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View>
      {/* Top bar: back + title + X */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 10, gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text style={{ flex: 1, fontFamily: fontFamily.anuphan.bold, fontSize: 17, color: colors.ink }}>{title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} hitSlop={16}>
          <MaterialIcons name="close" size={22} color={colors.ink} />
        </TouchableOpacity>
      </View>

      {/* Step label + progress bar */}
      <View style={{ paddingHorizontal: screenPadding, paddingBottom: 14, gap: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 13, color: colors.primary }}>
            ขั้นตอน {step} จาก {total}
          </Text>
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.textSecondary }}>
            รายละเอียดการเคลม
          </Text>
        </View>
        {/* Progress track */}
        <View style={{ height: 4, backgroundColor: colors.hairline2, borderRadius: 2, overflow: 'hidden' }}>
          <View style={{ height: 4, width: `${(step / total) * 100}%` as any, backgroundColor: colors.primary, borderRadius: 2 }} />
        </View>
      </View>
    </View>
  );
}
