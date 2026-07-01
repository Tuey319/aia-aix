import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { shadows } from '../../tokens/shadows';
import { useAppStore } from '../../store';
import {
  Notification,
  NotificationIntent,
  STUB_NOTIFICATIONS,
  INTENT_META,
  confidenceLabel,
  timeAgo,
} from './notificationTypes';

type Nav = NativeStackNavigationProp<any>;

const CONFIDENCE_COLORS = {
  high:   { bg: '#E8F5E9', text: '#2E7D32' },
  medium: { bg: '#FFF8E1', text: '#F57C00' },
  low:    { bg: '#FAFAFA', text: '#757575' },
};

function NotificationCard({
  notification,
  language,
  onPress,
  onMarkRead,
}: {
  notification: Notification;
  language: string;
  onPress: () => void;
  onMarkRead: () => void;
}) {
  const meta = INTENT_META[notification.intent];
  const title = language === 'en' ? notification.titleEn : notification.titleTh;
  const body  = language === 'en' ? notification.bodyEn  : notification.bodyTh;
  const actionLabel = language === 'en' ? notification.actionLabelEn : notification.actionLabelTh;
  const confLevel = confidenceLabel(notification.confidence);
  const confColor = CONFIDENCE_COLORS[confLevel];
  const confLabelText = language === 'en'
    ? confLevel === 'high' ? 'High' : confLevel === 'medium' ? 'Medium' : 'Low'
    : confLevel === 'high' ? 'แน่ใจมาก' : confLevel === 'medium' ? 'ปานกลาง' : 'ต่ำ';

  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.05)' }}
      style={({ pressed }) => ({
        backgroundColor: notification.isRead ? colors.card : colors.white,
        borderRadius: radius.card,
        overflow: 'hidden',
        opacity: pressed ? 0.92 : 1,
        borderLeftWidth: notification.isRead ? 0 : 3,
        borderLeftColor: meta.colorIcon,
        ...shadows.md,
      })}
    >
      <View style={{ padding: 14, gap: 10 }}>
        {/* Top row: icon + title + time */}
        <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-start' }}>
          <View style={{
            width: 40, height: 40, borderRadius: 12,
            backgroundColor: meta.colorBg,
            alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <MaterialIcons name={meta.icon as any} size={20} color={meta.colorIcon} />
          </View>

          <View style={{ flex: 1, gap: 3 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              <Text style={{
                fontFamily: notification.isRead ? fontFamily.anuphan.medium : fontFamily.anuphan.bold,
                fontSize: 13, color: colors.ink2, flex: 1, marginRight: 8,
              }} numberOfLines={1}>
                {title}
              </Text>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 10, color: colors.textTertiary }}>
                {timeAgo(notification.createdAt, language)}
              </Text>
            </View>

            {/* Intent chip + policy no */}
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ backgroundColor: meta.colorBg, borderRadius: 99, paddingHorizontal: 7, paddingVertical: 2 }}>
                <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 8, color: meta.colorIcon, letterSpacing: 0.3 }}>
                  {language === 'en' ? meta.labelEn : meta.labelTh}
                </Text>
              </View>
              <Text style={{ fontFamily: fontFamily.mono.regular, fontSize: 9, color: colors.textTertiary, letterSpacing: 0.5 }}>
                {notification.policyNo}
              </Text>
            </View>
          </View>
        </View>

        {/* Body text */}
        <Text style={{
          fontFamily: fontFamily.anuphan.regular,
          fontSize: 12, color: colors.inkBody, lineHeight: 18,
          marginLeft: 52,
        }}>
          {body}
        </Text>

        {/* Bottom row: confidence + action CTA */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginLeft: 52 }}>
          {/* Confidence pill — shows AI model confidence, hidden from non-technical users in prod */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <View style={{ width: 5, height: 5, borderRadius: 3, backgroundColor: confColor.text }} />
            <Text style={{ fontFamily: fontFamily.jakarta.regular, fontSize: 9, color: confColor.text }}>
              {language === 'en' ? 'AI confidence:' : 'AI ความมั่นใจ:'} {confLabelText}
            </Text>
          </View>

          <TouchableOpacity
            onPress={onPress}
            style={{
              backgroundColor: meta.colorIcon,
              borderRadius: 99,
              paddingHorizontal: 12,
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 11, color: colors.white }}>
              {actionLabel}
            </Text>
            <MaterialIcons name="arrow-forward" size={11} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  );
}

const FILTER_CHIPS: { intent: NotificationIntent | 'all'; labelTh: string; labelEn: string }[] = [
  { intent: 'all',              labelTh: 'ทั้งหมด',      labelEn: 'All' },
  { intent: 'due_date_amount',  labelTh: 'ครบกำหนด',     labelEn: 'Due' },
  { intent: 'payment_status',   labelTh: 'การชำระ',       labelEn: 'Payment' },
  { intent: 'autopay',          labelTh: 'อัตโนมัติ',     labelEn: 'Auto-Pay' },
  { intent: 'loan_repayment',   labelTh: 'เงินกู้',       labelEn: 'Loan' },
  { intent: 'tax_consent',      labelTh: 'ภาษี',          labelEn: 'Tax' },
];

export function NotificationsScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const language = useAppStore((s) => s.language);

  // TODO: replace STUB_NOTIFICATIONS with real prediction API call
  const [notifications, setNotifications] = useState<Notification[]>(STUB_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<NotificationIntent | 'all'>('all');

  const filtered = activeFilter === 'all'
    ? notifications
    : notifications.filter((n) => n.intent === activeFilter);

  const unread = filtered.filter((n) => !n.isRead);
  const read   = filtered.filter((n) => n.isRead);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  function markRead(id: string) {
    setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
  }

  function markAllRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }

  function handlePress(n: Notification) {
    markRead(n.id);
    navigation.navigate(n.actionRoute as any);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header */}
      <View style={{ paddingHorizontal: screenPadding, paddingTop: 12, paddingBottom: 4, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 20, color: colors.ink }}>
              {language === 'en' ? 'Notifications' : 'การแจ้งเตือน'}
            </Text>
            {unreadCount > 0 && (
              <View style={{ backgroundColor: colors.primary, borderRadius: 99, paddingHorizontal: 8, paddingVertical: 2 }}>
                <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 10, color: colors.white }}>
                  {unreadCount}
                </Text>
              </View>
            )}
          </View>
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 12, color: colors.textSecondary, marginTop: 1 }}>
            {language === 'en'
              ? 'Personalised alerts from AIA AI'
              : 'การแจ้งเตือนส่วนตัวจาก AIA AI'}
          </Text>
        </View>
        {unreadCount > 0 && (
          <TouchableOpacity onPress={markAllRead} hitSlop={8}>
            <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 12, color: colors.primary }}>
              {language === 'en' ? 'Mark all read' : 'อ่านทั้งหมด'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Filter chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0 }}
        contentContainerStyle={{ paddingHorizontal: screenPadding, gap: 8, paddingVertical: 10 }}>
        {FILTER_CHIPS.map((chip) => {
          const isActive = chip.intent === activeFilter;
          const meta = chip.intent !== 'all' ? INTENT_META[chip.intent] : null;
          return (
            <TouchableOpacity key={chip.intent} onPress={() => setActiveFilter(chip.intent)} activeOpacity={0.75}
              style={{
                height: 30, paddingHorizontal: 12, borderRadius: radius.pill,
                backgroundColor: isActive ? (meta?.colorIcon ?? colors.primary) : colors.card,
                borderWidth: 1,
                borderColor: isActive ? (meta?.colorIcon ?? colors.primary) : colors.hairline2,
                alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 5,
              }}>
              {meta && <MaterialIcons name={meta.icon as any} size={12} color={isActive ? colors.white : meta.colorIcon} />}
              <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: fontSize.caption, color: isActive ? colors.white : colors.inkBody2 }}>
                {language === 'en' ? chip.labelEn : chip.labelTh}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: screenPadding, paddingBottom: insets.bottom + 32, gap: 8 }}>

        {/* Empty state */}
        {filtered.length === 0 && (
          <View style={{ alignItems: 'center', paddingTop: 60, gap: 12 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: colors.hairline2, alignItems: 'center', justifyContent: 'center' }}>
              <MaterialIcons name="notifications-none" size={32} color={colors.textTertiary} />
            </View>
            <Text style={{ fontFamily: fontFamily.anuphan.semiBold, fontSize: 15, color: colors.ink2 }}>
              {language === 'en' ? 'No notifications' : 'ไม่มีการแจ้งเตือน'}
            </Text>
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 13, color: colors.textSecondary, textAlign: 'center', maxWidth: 240 }}>
              {language === 'en'
                ? 'AIA AI will notify you here when action is needed on your policies.'
                : 'AIA AI จะแจ้งเตือนคุณที่นี่เมื่อมีเรื่องที่ต้องดำเนินการ'}
            </Text>
          </View>
        )}

        {/* Unread section */}
        {unread.length > 0 && (
          <>
            <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 4 }}>
              {language === 'en' ? `New · ${unread.length}` : `ใหม่ · ${unread.length}`}
            </Text>
            {unread.map((n) => (
              <NotificationCard key={n.id} notification={n} language={language}
                onPress={() => handlePress(n)}
                onMarkRead={() => markRead(n.id)}
              />
            ))}
          </>
        )}

        {/* Read section */}
        {read.length > 0 && (
          <>
            <Text style={{ fontFamily: fontFamily.jakarta.bold, fontSize: 11, color: colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: unread.length > 0 ? 8 : 4 }}>
              {language === 'en' ? 'Earlier' : 'ก่อนหน้านี้'}
            </Text>
            {read.map((n) => (
              <NotificationCard key={n.id} notification={n} language={language}
                onPress={() => handlePress(n)}
                onMarkRead={() => markRead(n.id)}
              />
            ))}
          </>
        )}

        {/* AI disclaimer */}
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingTop: 8, opacity: 0.6 }}>
          <MaterialIcons name="info-outline" size={14} color={colors.textTertiary} style={{ marginTop: 1 }} />
          <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 10, color: colors.textTertiary, flex: 1, lineHeight: 15 }}>
            {language === 'en'
              ? 'Notifications are generated by AIA\'s AI prediction model and are personalised based on your policy and behaviour patterns.'
              : 'การแจ้งเตือนสร้างโดย AI ของ AIA โดยอิงจากพฤติกรรมและข้อมูลกรมธรรม์ของคุณ'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
