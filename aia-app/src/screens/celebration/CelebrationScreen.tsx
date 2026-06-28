/**
 * AI Celebration — Milestone Celebration popup shown after a successful payment.
 * "Every payment is a promise." — Delight Mak concept doc
 */
import React, { useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, Animated, Dimensions,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, fontFamily, fontSize, radius, screenPadding, cardGap } from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';
import { IllustrationSuccess, AIRobotMascot } from '../../components/illustrations';

type Nav = NativeStackNavigationProp<any>;

const { width: W } = Dimensions.get('window');

// Confetti particle component
function ConfettiDot({ x, delay, color: c, size }: { x: number; delay: number; color: string; size: number }) {
  const y = useRef(new Animated.Value(-20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(y, { toValue: 300, duration: 2000, useNativeDriver: true }),
      ]),
      Animated.timing(opacity, { toValue: 0, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: x,
        top: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: c,
        transform: [{ translateY: y }],
        opacity,
      }}
    />
  );
}

const CONFETTI = [
  { x: 20,  delay: 0,   color: colors.primary,     size: 10 },
  { x: 50,  delay: 100, color: colors.success,      size: 8  },
  { x: 90,  delay: 200, color: colors.amber,        size: 12 },
  { x: 130, delay: 50,  color: colors.info,         size: 7  },
  { x: 160, delay: 300, color: colors.gold,         size: 9  },
  { x: 200, delay: 150, color: colors.primary,      size: 11 },
  { x: 240, delay: 250, color: colors.success,      size: 8  },
  { x: 270, delay: 0,   color: colors.amber,        size: 6  },
  { x: 300, delay: 200, color: '#9B59B6',           size: 10 },
  { x: 330, delay: 100, color: colors.primary,      size: 8  },
  { x: 60,  delay: 400, color: colors.gold,         size: 7  },
  { x: 110, delay: 350, color: '#9B59B6',           size: 10 },
  { x: 185, delay: 450, color: colors.success,      size: 6  },
  { x: 220, delay: 500, color: colors.amber,        size: 9  },
  { x: 355, delay: 320, color: colors.info,         size: 8  },
];

// Robot is now the proper SVG mascot from AIRobotMascot component

export function CelebrationScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true, bounciness: 12 }).start();
    Animated.timing(opacityAnim, { toValue: 1, duration: 300, useNativeDriver: true }).start();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(22,22,28,0.92)' }} edges={['top', 'bottom']}>
      {/* Confetti */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 300, overflow: 'hidden' }}>
        {CONFETTI.map((c, i) => <ConfettiDot key={i} {...c} />)}
      </View>

      <Animated.View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: screenPadding, opacity: opacityAnim, transform: [{ scale: scaleAnim }] }}>
        {/* Main card */}
        <View style={{ backgroundColor: colors.card, borderRadius: 24, padding: 28, alignItems: 'center', width: '100%', gap: 16, ...cardShadow }}>
          <AIRobotMascot size={100} animated />

          {/* Headline */}
          <View style={{ alignItems: 'center', gap: 6 }}>
            <Text style={{ fontFamily: fontFamily.anuphan.bold, fontSize: 26, color: colors.ink, textAlign: 'center' }}>
              ดีมากเลย! 🎉
            </Text>
            <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 }}>
              คุณชำระเบี้ยประกันครบแล้ว
            </Text>
          </View>

          {/* Milestone badge */}
          <View style={{ backgroundColor: colors.primaryTint, borderRadius: radius.card, paddingHorizontal: 20, paddingVertical: 12, alignItems: 'center', width: '100%', gap: 4 }}>
            <Text style={{ fontFamily: fontFamily.mono.semiBold, fontSize: 10, color: colors.primary, letterSpacing: 1.5, textTransform: 'uppercase' }}>Milestone</Text>
            <Text style={{ fontFamily: fontFamily.jakarta.extraBold, fontSize: 36, color: colors.primary, letterSpacing: -1 }}>6 งวด</Text>
            <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 13, color: colors.primaryDeep }}>ชำระตรงเวลาต่อเนื่อง 🔥</Text>
          </View>

          {/* Payment amount */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <MaterialIcons name="check-circle" size={20} color={colors.success} />
            <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 14, color: colors.inkBody }}>
              ชำระเสร็จสิ้น ·{' '}
              <Text style={{ fontFamily: fontFamily.jakarta.bold, color: colors.ink }}>฿4,250.00</Text>
            </Text>
          </View>

          {/* Action buttons */}
          <View style={{ width: '100%', gap: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CelebrationDetail')}
              activeOpacity={0.82}
              style={{ backgroundColor: colors.primary, borderRadius: radius.button, height: 50, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8, ...primaryButtonShadow }}
            >
              <MaterialIcons name="celebration" size={18} color={colors.white} />
              <Text style={{ color: colors.white, fontFamily: fontFamily.anuphan.bold, fontSize: 15 }}>ดูรายละเอียดการฉลอง</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('RewardPrivilege')}
              activeOpacity={0.82}
              style={{ borderWidth: 1.5, borderColor: colors.primary, borderRadius: radius.button, height: 46, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 }}
            >
              <MaterialIcons name="card-giftcard" size={18} color={colors.primary} />
              <Text style={{ color: colors.primary, fontFamily: fontFamily.anuphan.semiBold, fontSize: 14 }}>ดูสิทธิพิเศษของคุณ 🎁</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} activeOpacity={0.7} style={{ paddingVertical: 8, alignItems: 'center' }}>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: 13, color: colors.textSecondary }}>กลับหน้าหลัก</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}
