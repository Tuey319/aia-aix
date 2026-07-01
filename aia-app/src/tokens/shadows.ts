import { Platform } from 'react-native';

// Tiered shadow system — xs → sm → md → lg → xl
// Web uses CSS boxShadow (avoids "shadow* deprecated" warnings on RN Web)
export const shadows = {
  xs: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    android: { elevation: 1 },
    web:     { boxShadow: '0 1px 4px rgba(20,20,30,0.06)' } as any,
    default: {},
  }),
  sm: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
    android: { elevation: 2 },
    web:     { boxShadow: '0 2px 8px rgba(20,20,30,0.08)' } as any,
    default: {},
  }),
  md: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 12 },
    android: { elevation: 4 },
    web:     { boxShadow: '0 4px 16px rgba(20,20,30,0.10)' } as any,
    default: {},
  }),
  lg: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.13, shadowRadius: 20 },
    android: { elevation: 8 },
    web:     { boxShadow: '0 8px 24px rgba(20,20,30,0.13)' } as any,
    default: {},
  }),
  xl: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.18, shadowRadius: 32 },
    android: { elevation: 16 },
    web:     { boxShadow: '0 16px 48px rgba(20,20,30,0.18)' } as any,
    default: {},
  }),
};

export const cardShadow = shadows.md;

export const primaryButtonShadow = Platform.select({
  ios:     { shadowColor: '#D31145', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.32, shadowRadius: 12 },
  android: { elevation: 8 },
  web:     { boxShadow: '0 6px 16px rgba(211,17,69,0.32)' } as any,
  default: {},
});

export const heroShadow = shadows.lg;
