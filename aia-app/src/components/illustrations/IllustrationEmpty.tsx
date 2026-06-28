/**
 * Flat-design illustration for empty / no-data states.
 * Style: unDraw-inspired, AIA red accent, friendly flat character.
 */
import React from 'react';
import Svg, { Circle, Ellipse, Rect, Path, G } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  /** Primary accent colour — defaults to AIA red */
  color?: string;
}

export function IllustrationEmpty({ width = 240, height = 200, color = '#D31145' }: Props) {
  const s = width / 240; // scale factor

  return (
    <Svg width={width} height={height} viewBox="0 0 240 200">
      {/* Background blob */}
      <Ellipse cx={120} cy={130} rx={110} ry={70} fill="#F4F4F6" />

      {/* Large document / clipboard */}
      <Rect x={70} y={40} width={100} height={130} rx={10} fill="#fff" stroke="#E0E0E8" strokeWidth={1.5} />
      <Rect x={90} y={30} width={60} height={18} rx={9} fill="#E0E0E8" />

      {/* Lines on document */}
      <Rect x={85} y={70} width={70} height={8} rx={4} fill="#ECECF1" />
      <Rect x={85} y={86} width={55} height={8} rx={4} fill="#ECECF1" />
      <Rect x={85} y={102} width={64} height={8} rx={4} fill="#ECECF1" />
      <Rect x={85} y={118} width={40} height={8} rx={4} fill="#ECECF1" />

      {/* Magnifying glass */}
      <Circle cx={155} cy={125} r={22} fill="#fff" stroke={color} strokeWidth={3} />
      <Path
        d="M170 140 L182 152"
        stroke={color}
        strokeWidth={4}
        strokeLinecap="round"
      />
      {/* Small cross inside glass = "nothing found" */}
      <Path d="M148 118 L162 132" stroke="#C4C4CC" strokeWidth={2} strokeLinecap="round" />
      <Path d="M162 118 L148 132" stroke="#C4C4CC" strokeWidth={2} strokeLinecap="round" />

      {/* Person */}
      {/* Head */}
      <Circle cx={60} cy={70} r={16} fill="#FFD3A8" />
      {/* Hair */}
      <Ellipse cx={60} cy={57} rx={14} ry={8} fill="#33333B" />
      {/* Body */}
      <Rect x={44} y={86} width={32} height={36} rx={10} fill="#2A6FDB" />
      {/* Left arm */}
      <Path d="M44 92 Q28 105 32 118" stroke="#2A6FDB" strokeWidth={10} strokeLinecap="round" fill="none" />
      {/* Right arm — pointing at document */}
      <Path d="M76 92 Q92 98 85 112" stroke="#2A6FDB" strokeWidth={10} strokeLinecap="round" fill="none" />
      {/* Legs */}
      <Path d="M52 122 L50 150" stroke="#33333B" strokeWidth={9} strokeLinecap="round" />
      <Path d="M68 122 L70 150" stroke="#33333B" strokeWidth={9} strokeLinecap="round" />
      {/* Feet */}
      <Ellipse cx={49} cy={152} rx={8} ry={5} fill="#33333B" />
      <Ellipse cx={71} cy={152} rx={8} ry={5} fill="#33333B" />

      {/* Decorative dots */}
      <Circle cx={200} cy={60} r={6} fill={color} opacity={0.3} />
      <Circle cx={214} cy={74} r={4} fill={color} opacity={0.2} />
      <Circle cx={28} cy={155} r={5} fill="#E0E0E8" />
      <Circle cx={18} cy={140} r={3} fill="#E0E0E8" />
    </Svg>
  );
}
