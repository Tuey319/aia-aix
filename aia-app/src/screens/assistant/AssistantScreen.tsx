import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { useStrings } from '../../i18n';
import { useAppStore } from '../../store';
import { AiaLogo } from '../../components/AiaLogo';
import { IllustrationMedicalApp } from '../../components/illustrations';

type Nav = NativeStackNavigationProp<any>;

type ChatMessage = {
  id: string;
  role: 'user' | 'bot';
  text: string;
  ctaLabel?: string;
  screen?: string;
  showFallbackChips?: boolean;
};

// Mocked intent matching — no real LLM/backend. Each intent resolves a typed
// message to exactly one destination, so the reply uses the action-card pattern.
const INTENTS: { keywords: string[]; reply: string; ctaLabel: string; screen: string }[] = [
  {
    keywords: ['จ่าย', 'ชำระ', 'เบี้ย', 'pay', 'premium'],
    reply: 'นี่คือหน้าชำระเบี้ยประกันของคุณค่ะ แตะปุ่มด้านล่างเพื่อดำเนินการต่อ',
    ctaLabel: 'ไปที่หน้าชำระเงิน',
    screen: 'PaySelect',
  },
  {
    keywords: ['เคลม', 'claim', 'ยื่นเรื่อง'],
    reply: 'เริ่มขั้นตอนยื่นเคลมได้ที่นี่ค่ะ',
    ctaLabel: 'ไปที่หน้ายื่นเคลม',
    screen: 'ClaimStart',
  },
  {
    keywords: ['คุ้มครอง', 'coverage'],
    reply: 'ดูรายละเอียดความคุ้มครองกรมธรรม์ของคุณได้ที่นี่ค่ะ',
    ctaLabel: 'ดูความคุ้มครอง',
    screen: 'CoverageDetail',
  },
  {
    keywords: ['กรมธรรม์', 'policy', 'เอกสาร'],
    reply: 'นี่คือหน้ากรมธรรม์ของคุณค่ะ',
    ctaLabel: 'ไปที่หน้ากรมธรรม์',
    screen: 'Policy',
  },
  {
    keywords: ['vitality'],
    reply: 'ตรวจสอบสถานะ AIA Vitality และส่วนลดของคุณได้ที่นี่ค่ะ',
    ctaLabel: 'ไปที่ AIA Vitality',
    screen: 'Vitality',
  },
  {
    keywords: ['ติดต่อ', 'agent', 'เจ้าหน้าที่'],
    reply: 'ติดต่อตัวแทนของคุณได้ที่นี่ค่ะ',
    ctaLabel: 'ติดต่อเจ้าหน้าที่',
    screen: 'ContactAgent',
  },
  {
    keywords: ['คำถาม', 'faq', 'ถามตอบ'],
    reply: 'ดูคำถามที่พบบ่อยได้ที่นี่ค่ะ',
    ctaLabel: 'ดูคำถามที่พบบ่อย',
    screen: 'FaqList',
  },
  {
    keywords: ['ประวัติ', 'history'],
    reply: 'ดูประวัติการชำระเบี้ยของคุณได้ที่นี่ค่ะ',
    ctaLabel: 'ดูประวัติการชำระ',
    screen: 'History',
  },
];

function findIntent(text: string) {
  const lower = text.toLowerCase();
  return INTENTS.find((intent) => intent.keywords.some((kw) => lower.includes(kw.toLowerCase())));
}

function TypingDots() {
  const dot1 = useRef(new Animated.Value(0.3)).current;
  const dot2 = useRef(new Animated.Value(0.3)).current;
  const dot3 = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const makePulse = (anim: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(anim, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(anim, { toValue: 0.3, duration: 300, useNativeDriver: true }),
          Animated.delay(600 - delay),
        ])
      );

    const a1 = makePulse(dot1, 0);
    const a2 = makePulse(dot2, 200);
    const a3 = makePulse(dot3, 400);
    a1.start();
    a2.start();
    a3.start();
    return () => {
      a1.stop();
      a2.stop();
      a3.stop();
    };
  }, [dot1, dot2, dot3]);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 2 }}>
      {[dot1, dot2, dot3].map((anim, i) => (
        <Animated.View
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: colors.textTertiary,
            opacity: anim,
          }}
        />
      ))}
    </View>
  );
}

function ChipButton({ label, onPress }: { label: string; onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        borderWidth: 1.5,
        borderColor: colors.primary,
        borderRadius: radius.pill,
        paddingHorizontal: 14,
        paddingVertical: 7,
        backgroundColor: colors.white,
      }}
    >
      <Text
        style={{
          fontFamily: fontFamily.anuphan.medium,
          fontSize: fontSize.body,
          color: colors.primary,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function AssistantScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const s = useStrings();
  const language = useAppStore((state) => state.language);

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const QUICK_REPLIES: { label: string; screen: string }[] = [
    { label: s.assistant.quickPay, screen: 'PaySelect' },
    { label: s.assistant.quickCoverage, screen: 'CoverageDetail' },
    { label: s.assistant.quickClaim, screen: 'ClaimStart' },
  ];

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = { id: `${Date.now()}-u`, role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const intent = findIntent(trimmed);
      const botMsg: ChatMessage = intent
        ? {
            id: `${Date.now()}-b`,
            role: 'bot',
            text: intent.reply,
            ctaLabel: intent.ctaLabel,
            screen: intent.screen,
          }
        : {
            id: `${Date.now()}-b`,
            role: 'bot',
            text: language === 'en'
              ? "Sorry, I'm not sure what you mean. Try one of the options below."
              : 'ขออภัยค่ะ ดิฉันไม่แน่ใจว่าคุณหมายถึงอะไร ลองเลือกจากตัวเลือกด้านล่างนะคะ',
            showFallbackChips: true,
          };
      setIsTyping(false);
      setMessages((prev) => [...prev, botMsg]);
    }, 900);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: 14,
          gap: 10,
          backgroundColor: colors.screenBg,
        }}
      >
        {/* AIA logo avatar */}
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            backgroundColor: colors.card,
            alignItems: 'center',
            justifyContent: 'center',
            ...cardShadow,
          }}
        >
          <AiaLogo size={28} />
        </View>

        {/* Title + online pill stacked */}
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{
              fontFamily: fontFamily.anuphan.bold,
              fontSize: fontSize.titleLg,
              color: colors.ink,
              lineHeight: fontSize.titleLg * 1.2,
            }}
          >
            {s.assistant.title}
          </Text>
          {/* Online pill */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'flex-start',
              backgroundColor: colors.successTint,
              borderRadius: radius.pill,
              paddingHorizontal: 8,
              paddingVertical: 2,
              gap: 4,
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                backgroundColor: colors.successDot,
              }}
            />
            <Text
              style={{
                fontFamily: fontFamily.anuphan.medium,
                fontSize: 11,
                color: colors.success,
              }}
            >
              {s.assistant.online}
            </Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        {/* Chat area */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{
            paddingHorizontal: screenPadding,
            paddingTop: 8,
            paddingBottom: 16,
            gap: cardGap,
          }}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {/* Welcome illustration */}
          <View style={{ alignItems: 'center', paddingVertical: 4 }}>
            <IllustrationMedicalApp width={160} height={130} />
          </View>

          {/* Bot greeting bubble */}
          <View style={{ alignItems: 'flex-start' }}>
            <View
              style={{
                backgroundColor: colors.card,
                borderRadius: 16,
                borderBottomLeftRadius: 4,
                paddingHorizontal: 14,
                paddingVertical: 10,
                maxWidth: '80%',
                ...cardShadow,
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.bodyMd,
                  color: colors.inkBody,
                  lineHeight: 22,
                }}
              >
                {language === 'en' ? 'Hello! 👋 How can I help you today?' : 'สวัสดีค่ะ คุณสบาย 👋 มีอะไรให้ช่วยไหมคะ?'}
              </Text>
            </View>

            {/* Quick reply chips — below the greeting bubble */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 8,
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  width: '100%',
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.caption,
                  color: colors.textSecondary,
                  marginBottom: 2,
                }}
              >
                {language === 'en' ? 'Suggestions' : 'คำแนะนำ'}
              </Text>
              {QUICK_REPLIES.map((reply) => (
                <ChipButton
                  key={reply.screen}
                  label={reply.label}
                  onPress={() => navigation.navigate(reply.screen)}
                />
              ))}
            </View>
          </View>

          {/* Dynamic conversation */}
          {messages.map((msg) =>
            msg.role === 'user' ? (
              <View key={msg.id} style={{ alignItems: 'flex-end' }}>
                <View
                  style={{
                    backgroundColor: colors.primary,
                    borderRadius: 16,
                    borderBottomRightRadius: 4,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    maxWidth: '78%',
                    ...primaryButtonShadow,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamily.anuphan.regular,
                      fontSize: fontSize.bodyMd,
                      color: colors.white,
                      lineHeight: 22,
                    }}
                  >
                    {msg.text}
                  </Text>
                </View>
              </View>
            ) : (
              <View key={msg.id} style={{ alignItems: 'flex-start', gap: 10 }}>
                <View
                  style={{
                    backgroundColor: colors.card,
                    borderRadius: 16,
                    borderBottomLeftRadius: 4,
                    paddingHorizontal: 14,
                    paddingVertical: 10,
                    maxWidth: '85%',
                    ...cardShadow,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamily.anuphan.regular,
                      fontSize: fontSize.bodyMd,
                      color: colors.inkBody,
                      lineHeight: 22,
                    }}
                  >
                    {msg.text}
                  </Text>
                </View>

                {/* Inline action card — the reply itself is the navigation trigger */}
                {msg.ctaLabel && msg.screen && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate(msg.screen!)}
                    activeOpacity={0.82}
                    style={{
                      backgroundColor: colors.primary,
                      borderRadius: radius.card,
                      paddingHorizontal: 16,
                      paddingVertical: 14,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                      alignSelf: 'flex-start',
                      minWidth: 220,
                      ...primaryButtonShadow,
                    }}
                  >
                    <MaterialIcons name="arrow-forward" size={20} color={colors.white} />
                    <Text
                      style={{
                        fontFamily: fontFamily.anuphan.bold,
                        fontSize: fontSize.bodyMd,
                        color: colors.white,
                        flex: 1,
                      }}
                    >
                      {msg.ctaLabel}
                    </Text>
                    <MaterialIcons name="chevron-right" size={18} color="rgba(255,255,255,0.7)" />
                  </TouchableOpacity>
                )}

                {msg.showFallbackChips && (
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {QUICK_REPLIES.map((reply) => (
                      <ChipButton
                        key={reply.screen}
                        label={reply.label}
                        onPress={() => navigation.navigate(reply.screen)}
                      />
                    ))}
                  </View>
                )}
              </View>
            )
          )}

          {/* Bot typing bubble */}
          {isTyping && (
            <View style={{ alignItems: 'flex-start' }}>
              <View
                style={{
                  backgroundColor: colors.card,
                  borderRadius: 16,
                  borderBottomLeftRadius: 4,
                  paddingHorizontal: 14,
                  paddingVertical: 12,
                  ...cardShadow,
                }}
              >
                <TypingDots />
              </View>
            </View>
          )}
        </ScrollView>

        {/* Bottom input bar */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: screenPadding,
            paddingTop: 10,
            paddingBottom: insets.bottom + 10,
            backgroundColor: colors.screenBg,
            gap: 10,
            borderTopWidth: 1,
            borderTopColor: colors.hairline2,
          }}
        >
          <TextInput
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage(input)}
            returnKeyType="send"
            placeholder={s.assistant.placeholder}
            placeholderTextColor={colors.textTertiary}
            style={{
              flex: 1,
              height: 46,
              backgroundColor: colors.card,
              borderRadius: radius.input,
              paddingHorizontal: 14,
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.bodyMd,
              color: colors.ink,
              borderWidth: 1,
              borderColor: colors.hairline2,
            }}
          />
          <TouchableOpacity
            onPress={() => sendMessage(input)}
            activeOpacity={0.82}
            style={{
              width: 46,
              height: 46,
              borderRadius: 23,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              ...primaryButtonShadow,
            }}
          >
            <MaterialIcons name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
