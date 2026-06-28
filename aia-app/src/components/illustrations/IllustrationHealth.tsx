/**
 * Flat-design illustration for health / insurance / policy screens.
 * Used on empty policies state and Vitality screens.
 */
import React from 'react';
import Svg, { Circle, Ellipse, Rect, Path, G } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
}

export function IllustrationHealth({ width = 240, height = 200, color = '#D31145' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 200">
      {/* Background blobs */}
      <Ellipse cx={120} cy={148} rx={108} ry={52} fill="#FCEDF1" />
      <Circle cx={190} cy={60} r={36} fill="#FFF" opacity={0.6} />

      {/* Large shield */}
      <Path
        d="M120 22 L158 38 L158 88 Q158 122 120 138 Q82 122 82 88 L82 38 Z"
        fill={color}
        opacity={0.12}
      />
      <Path
        d="M120 30 L150 44 L150 88 Q150 116 120 130 Q90 116 90 88 L90 44 Z"
        fill={color}
      />
      {/* Heart inside shield */}
      <Path
        d="M120 100 Q108 88 108 80 Q108 72 116 72 Q120 72 120 76 Q120 72 124 72 Q132 72 132 80 Q132 88 120 100 Z"
        fill="#fff"
      />

      {/* Person */}
      {/* Head */}
      <Circle cx={58} cy={90} r={15} fill="#FFD3A8" />
      <Ellipse cx={58} cy={78} rx={13} ry={7} fill="#C9A227" />
      {/* Body */}
      <Rect x={43} y={105} width={30} height={30} rx={9} fill="#1B9E5A" />
      {/* Stethoscope */}
      <Path d="M73 110 Q85 105 90 115" stroke="#33333B" strokeWidth={3} fill="none" strokeLinecap="round" />
      <Circle cx={92} cy={117} r={5} stroke="#33333B" strokeWidth={2} fill="#fff" />
      {/* Left arm */}
      <Path d="M43 115 Q30 120 30 132" stroke="#1B9E5A" strokeWidth={9} strokeLinecap="round" fill="none" />
      {/* Right arm — holding clipboard */}
      <Path d="M73 115 Q84 115 84 128" stroke="#1B9E5A" strokeWidth={9} strokeLinecap="round" fill="none" />
      {/* Legs */}
      <Path d="M52 135 L50 158" stroke="#33333B" strokeWidth={8} strokeLinecap="round" />
      <Path d="M66 135 L68 158" stroke="#33333B" strokeWidth={8} strokeLinecap="round" />
      <Ellipse cx={49} cy={160} rx={7} ry={4} fill="#33333B" />
      <Ellipse cx={69} cy={160} rx={7} ry={4} fill="#33333B" />

      {/* Clipboard */}
      <Rect x={84} y={116} width={26} height={34} rx={4} fill="#fff" stroke="#E0E0E8" strokeWidth={1.5} />
      <Rect x={91} y={112} width={12} height={8} rx={4} fill="#E0E0E8" />
      <Rect x={88} y={126} width={18} height={3} rx={1.5} fill="#ECECF1" />
      <Rect x={88} y={133} width={14} height={3} rx={1.5} fill="#ECECF1" />
      <Rect x={88} y={140} width={16} height={3} rx={1.5} fill="#ECECF1" />

      {/* Decorative cross */}
      <Rect x={195} y={46} width={6} height={22} rx={3} fill={color} opacity={0.3} />
      <Rect x={185} y={56} width={26} height={6} rx={3} fill={color} opacity={0.3} />

      {/* Dots */}
      <Circle cx={24} cy={145} r={5} fill="#FCEDF1" />
      <Circle cx={215} cy={140} r={4} fill="#FCEDF1" />
    </Svg>
  );
}
