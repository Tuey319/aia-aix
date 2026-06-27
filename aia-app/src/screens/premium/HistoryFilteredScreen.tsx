import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow } from '../../tokens/shadows';
import { StatusPill } from '../../components/StatusPill';

type FilterType = 'all' | 'bill' | 'policy';

interface PaymentRecord {
  id: string;
  month: string;
  policyName: string;
  date: string;
  method: string;
  amount: number;
  type: 'bill' | 'policy';
}

const PAYMENTS: PaymentRecord[] = [
  {
    id: '1',
    month: 'มิถุนายน 2569',
    policyName: 'AIA Health Happy',
    date: '17 มิ.ย.',
    method: 'PromptPay',
    amount: 4250,
    type: 'bill',
  },
  {
    id: '2',
    month: 'มิถุนายน 2569',
    policyName: 'AIA Unit Linked',
    date: '5 มิ.ย.',
    method: 'บัตร ••••4242',
    amount: 8000,
    type: 'policy',
  },
  {
    id: '3',
    month: 'พฤษภาคม 2569',
    policyName: 'AIA Health Happy',
    date: '17 พ.ค.',
    method: 'PromptPay',
    amount: 4250,
    type: 'bill',
  },
  {
    id: '4',
    month: 'พฤษภาคม 2569',
    policyName: 'AIA Unit Linked',
    date: '5 พ.ค.',
    method: 'บัตร ••••4242',
    amount: 8000,
    type: 'policy',
  },
];

const FILTER_LABELS: { key: FilterType; label: string }[] = [
  { key: 'all', label: 'ทั้งหมด' },
  { key: 'bill', label: 'บิล' },
  { key: 'policy', label: 'ใบกรมธรรม์' },
];

export function HistoryFilteredScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const insets = useSafeAreaInsets();
  // Start with "policy" filter active
  const [activeFilter, setActiveFilter] = useState<FilterType>('policy');

  const filtered = activeFilter === 'all'
    ? PAYMENTS
    : PAYMENTS.filter((p) => p.type === activeFilter);

  // Group by month
  const grouped: { month: string; records: PaymentRecord[] }[] = [];
  filtered.forEach((p) => {
    const existing = grouped.find((g) => g.month === p.month);
    if (existing) {
      existing.records.push(p);
    } else {
      grouped.push({ month: p.month, records: [p] });
    }
  });

  const totalPaid = PAYMENTS.reduce((sum, p) => sum + p.amount, 0);
  const onTimeCount = PAYMENTS.length;

  const clearFilter = () => setActiveFilter('all');

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
          ประวัติการชำระ
        </Text>
        <TouchableOpacity hitSlop={12}>
          <MaterialIcons name="filter-list" size={22} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 32,
          gap: cardGap,
        }}
      >
        {/* Summary card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            ...cardShadow,
          }}
        >
          <View style={{ gap: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: colors.textSecondary,
              }}
            >
              ชำระแล้วปี 2569
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.extraBold,
                fontSize: 26,
                color: colors.ink,
                letterSpacing: -0.8,
              }}
            >
              ฿{totalPaid.toLocaleString('en-US')}
            </Text>
          </View>
          <StatusPill label={`ตรงเวลา ${onTimeCount} งวด`} variant="success" />
        </View>

        {/* Filter chips row */}
        <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
          {FILTER_LABELS.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              onPress={() => setActiveFilter(key)}
              activeOpacity={0.75}
              style={{
                backgroundColor: activeFilter === key ? colors.primary : colors.card,
                borderRadius: radius.pill,
                paddingHorizontal: 14,
                paddingVertical: 7,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                ...cardShadow,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.body,
                  color: activeFilter === key ? colors.white : colors.inkBody2,
                }}
              >
                {label}
              </Text>
              {/* Show ✕ on the active non-all chip */}
              {activeFilter === key && key !== 'all' && (
                <TouchableOpacity onPress={clearFilter} hitSlop={6}>
                  <MaterialIcons name="close" size={14} color={colors.white} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Result count */}
        {activeFilter !== 'all' && (
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
              marginLeft: 4,
            }}
          >
            {filtered.length} ผลลัพธ์
          </Text>
        )}

        {/* Grouped list */}
        {grouped.map((group) => (
          <View key={group.month} style={{ gap: 8 }}>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 11,
                color: colors.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: 0.6,
                marginLeft: 4,
              }}
            >
              {group.month}
            </Text>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: radius.card,
                overflow: 'hidden',
                ...cardShadow,
              }}
            >
              {group.records.map((record, i) => (
                <View key={record.id}>
                  {i > 0 && (
                    <View
                      style={{
                        height: 1,
                        backgroundColor: colors.hairline,
                        marginLeft: 50,
                      }}
                    />
                  )}
                  <PaymentRow record={record} />
                </View>
              ))}
            </View>
          </View>
        ))}

        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingVertical: 40, gap: 8 }}>
            <MaterialIcons name="inbox" size={40} color={colors.textTertiary} />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.body,
                color: colors.textSecondary,
              }}
            >
              ไม่พบรายการ
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

/* ─── Sub-components ─── */

function PaymentRow({ record }: { record: PaymentRecord }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 13,
        gap: 12,
      }}
    >
      {/* Check icon */}
      <View
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          backgroundColor: colors.successTint,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MaterialIcons name="check-circle" size={20} color={colors.success} />
      </View>

      {/* Info */}
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.semiBold,
            fontSize: fontSize.bodyMd,
            color: colors.ink2,
          }}
        >
          {record.policyName}
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.regular,
            fontSize: fontSize.caption,
            color: colors.textSecondary,
          }}
        >
          {record.date} · {record.method}
        </Text>
      </View>

      {/* Amount */}
      <Text
        style={{
          fontFamily: fontFamily.jakarta.bold,
          fontSize: fontSize.bodyMd,
          color: colors.ink2,
          letterSpacing: -0.2,
        }}
      >
        ฿{record.amount.toLocaleString('en-US')}
      </Text>

      {/* Download icon */}
      <TouchableOpacity hitSlop={10}>
        <MaterialIcons name="file-download" size={20} color={colors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}
