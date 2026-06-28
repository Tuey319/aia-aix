/**
 * Flat-design illustration for error / offline states.
 */
import React from 'react';
import Svg, { Circle, Ellipse, Rect, Path, Line } from 'react-native-svg';

interface Props {
  width?: number;
  height?: number;
  color?: string;
  variant?: 'error' | 'offline';
}

export function IllustrationError({ width = 240, height = 200, color = '#D31145', variant = 'error' }: Props) {
  return (
    <Svg width={width} height={height} viewBox="0 0 240 200">
      {/* Background blob */}
      <Ellipse cx={120} cy={145} rx={108} ry={52} fill="#F4F4F6" />

      {variant === 'offline' ? (
        /* WiFi / offline symbol */
        <>
          <Path d="M80 90 Q120 55 160 90" stroke="#ECECF1" strokeWidth={7} fill="none" strokeLinecap="round" />
          <Path d="M95 108 Q120 85 145 108" stroke="#ECECF1" strokeWidth={7} fill="none" strokeLinecap="round" />
          <Path d="M110 126 Q120 115 130 126" stroke={color} strokeWidth={7} fill="none" strokeLinecap="round" />
          <Circle cx={120} cy={140} r={6} fill={color} />
          {/* Big X over wifi */}
          <Path d="M68 60 L88 80" stroke={color} strokeWidth={5} strokeLinecap="round" />
          <Path d="M88 60 L68 80" stroke={color} strokeWidth={5} strokeLinecap="round" />
        </>
      ) : (
        /* Warning triangle */
        <>
          <Path
            d="M120 55 L170 145 L70 145 Z"
            fill="#FFF3E4"
            stroke="#E8821A"
            strokeWidth={3}
            strokeLinejoin="round"
          />
          <Rect x={116} y={80} width={8} height={36} rx={4} fill="#E8821A" />
          <Circle cx={120} cy={128} r={5} fill="#E8821A" />
        </>
      )}

      {/* Person looking sad / confused */}
      {/* Head */}
      <Circle cx={52} cy={105} r={16} fill="#FFD3A8" />
      <Ellipse cx={52} cy={92} rx={14} ry={8} fill="#33333B" />
      {/* Sad face — downturned mouth */}
      <Path d="M46 112 Q52 108 58 112" stroke="#C4956A" strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Body */}
      <Rect x={36} y={121} width={32} height={32} rx={10} fill="#8A8A95" />
      {/* Arms — one up scratching head */}
      <Path d="M36 130 Q22 125 20 115" stroke="#8A8A95" strokeWidth={10} strokeLinecap="round" fill="none" />
      <Path d="M68 130 Q80 128 78 120" stroke="#8A8A95" strokeWidth={10} strokeLinecap="round" fill="none" />
      <Circle cx={20} cy={112} r={7} fill="#FFD3A8" />
      {/* Legs */}
      <Path d="M46 153 L44 172" stroke="#33333B" strokeWidth={8} strokeLinecap="round" />
      <Path d="M62 153 L64 172" stroke="#33333B" strokeWidth={8} strokeLinecap="round" />

      {/* Decorative dots */}
      <Circle cx={205} cy={100} r={5} fill="#ECECF1" />
      <Circle cx={215} cy={115} r={3} fill="#ECECF1" />
      <Circle cx={30} cy={175} r={4} fill="#ECECF1" />
    </Svg>
  );
}
