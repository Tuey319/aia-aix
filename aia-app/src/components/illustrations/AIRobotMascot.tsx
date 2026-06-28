/**
 * AIA+ AI Robot Mascot — SVG flat-design character.
 * Matches the Delight Mak "AI Celebration" concept doc aesthetic.
 */
import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import Svg, {
  Rect, Circle, Ellipse, Path, G, Defs, LinearGradient, Stop, RadialGradient,
} from 'react-native-svg';

interface Props {
  size?: number;
  animated?: boolean;
}

export function AIRobotMascot({ size = 96, animated: doAnimate = true }: Props) {
  const bounceY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!doAnimate) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceY, { toValue: -6, duration: 700, useNativeDriver: true }),
        Animated.timing(bounceY, { toValue: 0,  duration: 700, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const s = size / 100; // viewBox is 100×120

  return (
    <Animated.View style={{ transform: [{ translateY: doAnimate ? bounceY : 0 }] }}>
      <Svg width={size} height={size * 1.2} viewBox="0 0 100 120">
        <Defs>
          {/* Body gradient — slightly lighter top, deeper bottom */}
          <LinearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor="#E8184F" />
            <Stop offset="1" stopColor="#B50E3C" />
          </LinearGradient>
          {/* Eye shine */}
          <RadialGradient id="eyeShine" cx="30%" cy="30%" r="60%">
            <Stop offset="0" stopColor="#ffffff" stopOpacity="1" />
            <Stop offset="1" stopColor="#dde8ff" stopOpacity="0.6" />
          </RadialGradient>
          {/* Shadow under body */}
          <RadialGradient id="shadow" cx="50%" cy="50%" r="50%">
            <Stop offset="0" stopColor="#00000022" />
            <Stop offset="1" stopColor="#00000000" />
          </RadialGradient>
        </Defs>

        {/* ── Shadow ── */}
        <Ellipse cx={50} cy={116} rx={28} ry={5} fill="url(#shadow)" />

        {/* ── Antenna stem ── */}
        <Rect x={47} y={6} width={6} height={18} rx={3} fill="#9E0E34" />

        {/* ── Antenna ball ── */}
        <Circle cx={50} cy={5} r={7} fill="#FF2D6B" />
        <Circle cx={48} cy={3} r={2.5} fill="rgba(255,255,255,0.45)" />

        {/* ── Body (main rounded square) ── */}
        <Rect x={10} y={22} width={80} height={78} rx={22} fill="url(#bodyGrad)" />

        {/* ── Body highlight (top shine) ── */}
        <Ellipse cx={50} cy={30} rx={28} ry={7} fill="rgba(255,255,255,0.12)" />

        {/* ── Left ear knob ── */}
        <Rect x={2} y={50} width={12} height={22} rx={6} fill="#C41039" />
        <Rect x={4} y={55} width={4} height={12} rx={2} fill="rgba(255,255,255,0.25)" />

        {/* ── Right ear knob ── */}
        <Rect x={86} y={50} width={12} height={22} rx={6} fill="#C41039" />
        <Rect x={88} y={55} width={4} height={12} rx={2} fill="rgba(255,255,255,0.25)" />

        {/* ── Eyes background circles ── */}
        <Circle cx={34} cy={55} r={14} fill="url(#eyeShine)" />
        <Circle cx={66} cy={55} r={14} fill="url(#eyeShine)" />

        {/* ── Pupils ── */}
        <Circle cx={35} cy={56} r={7} fill="#1A1A2E" />
        <Circle cx={65} cy={56} r={7} fill="#1A1A2E" />

        {/* ── Eye highlights ── */}
        <Circle cx={32} cy={53} r={2.5} fill="white" />
        <Circle cx={62} cy={53} r={2.5} fill="white" />
        <Circle cx={37} cy={59} r={1.2} fill="rgba(255,255,255,0.5)" />
        <Circle cx={67} cy={59} r={1.2} fill="rgba(255,255,255,0.5)" />

        {/* ── Smile / mouth ── */}
        {/* White pill background */}
        <Rect x={22} y={76} width={56} height={16} rx={8} fill="white" />
        {/* Happy curve inside */}
        <Path
          d="M 30 80 Q 50 92 70 80"
          stroke="#E8184F"
          strokeWidth={3}
          fill="none"
          strokeLinecap="round"
        />

        {/* ── Cheek blushes ── */}
        <Ellipse cx={20} cy={68} rx={6} ry={4} fill="rgba(255,100,120,0.3)" />
        <Ellipse cx={80} cy={68} rx={6} ry={4} fill="rgba(255,100,120,0.3)" />
      </Svg>
    </Animated.View>
  );
}
