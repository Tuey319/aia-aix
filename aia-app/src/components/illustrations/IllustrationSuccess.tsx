/**
 * Flat-design illustration for success / completion states.
 */
import React from 'react';
import Svg, { Circle, Ellipse, Rect, Path, G } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export function IllustrationSuccess({ width = 240, height = 200, color = '#1B9E5A' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 200">
      {/* Background blob */}
      <Ellipse cx={120} cy={140} rx={105} ry={55} fill="#EAF7F0" />

      {/* Big checkmark circle */}
      <Circle cx={120} cy={90} r={52} fill={color} opacity={0.12} />
      <Circle cx={120} cy={90} r={40} fill={color} />
      <Path
        d="M102 90 L114 104 L140 76"
        stroke="#fff"
        strokeWidth={5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Confetti dots */}
      <Circle cx={60} cy={55} r={6} fill="#D31145" />
      <Circle cx={80} cy={35} r={4} fill="#E8821A" />
      <Circle cx={170} cy={45} r={5} fill={color} />
      <Circle cx={190} cy={65} r={4} fill="#2A6FDB" />
      <Rect x={155} y={30} width={8} height={8} rx={2} fill="#D31145" transform="rotate(15 159 34)" />
      <Rect x={68} y={38} width={8} height={8} rx={2} fill={color} transform="rotate(-10 72 42)" />
      <Rect x={186} y={80} width={6} height={6} rx={1} fill="#E8821A" transform="rotate(20 189 83)" />

      {/* Person arms raised in celebration */}
      {/* Body */}
      <Rect x={103} y={148} width={34} height={32} rx={10} fill="#2A6FDB" />
      {/* Head */}
      <Circle cx={120} cy={140} r={14} fill="#FFD3A8" />
      <Ellipse cx={120} cy={128} rx={12} ry={7} fill="#33333B" />
      {/* Left arm up */}
      <Path d="M103 155 Q82 135 78 118" stroke="#2A6FDB" strokeWidth={10} strokeLinecap="round" fill="none" />
      {/* Right arm up */}
      <Path d="M137 155 Q158 135 162 118" stroke="#2A6FDB" strokeWidth={10} strokeLinecap="round" fill="none" />
      {/* Hands */}
      <Circle cx={78} cy={115} r={7} fill="#FFD3A8" />
      <Circle cx={162} cy={115} r={7} fill="#FFD3A8" />
      {/* Legs */}
      <Path d="M112 180 L110 198" stroke="#33333B" strokeWidth={9} strokeLinecap="round" />
      <Path d="M128 180 L130 198" stroke="#33333B" strokeWidth={9} strokeLinecap="round" />
    </Svg>
  );
}
