import React from 'react';
import { View, Text } from 'react-native';
import { colors, fontFamily, fontSize } from '../tokens';

export interface BarDatum {
  label: string;
  value: number;
  color?: string;
  isLast?: boolean;
}

interface BarChartProps {
  data: BarDatum[];
  height?: number;
  formatValue?: (v: number) => string;
  labelColor?: string;
}

export function BarChart({ data, height = 120, formatValue, labelColor }: BarChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value));

  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 6, height: height + 36 }}>
      {data.map((d, i) => {
        const barH = (d.value / maxVal) * height;
        const barColor = d.color ?? (d.isLast ? colors.successDeep : colors.amber);
        const valLabel = formatValue ? formatValue(d.value) : String(d.value);

        return (
          <View key={i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.semiBold,
                fontSize: 9,
                color: labelColor ?? colors.amberDeep,
              }}
            >
              {valLabel}
            </Text>
            <View
              style={{
                width: '100%',
                height: barH,
                backgroundColor: barColor,
                borderRadius: 4,
              }}
            />
            <Text
              style={{
                fontFamily: fontFamily.jakarta.medium,
                fontSize: 10,
                color: colors.textSecondary,
              }}
            >
              {d.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
