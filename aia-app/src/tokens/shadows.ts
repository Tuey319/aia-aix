import { Platform } from 'react-native';

// Tiered shadow system — xs (dividers) → sm (chips) → md (cards) → lg (hero cards) → xl (modals)
export const shadows = {
  xs: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
    android: { elevation: 1 },
    default: {},
  }),
  sm: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6 },
    android: { elevation: 2 },
    default: {},
  }),
  md: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.10, shadowRadius: 12 },
    android: { elevation: 4 },
    default: {},
  }),
  lg: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.13, shadowRadius: 20 },
    android: { elevation: 8 },
    default: {},
  }),
  xl: Platform.select({
    ios:     { shadowColor: '#14141E', shadowOffset: { width: 0, height: 16 }, shadowOpacity: 0.18, shadowRadius: 32 },
    android: { elevation: 16 },
    default: {},
  }),
};

// Semantic aliases kept for backward-compat
export const cardShadow     = shadows.md;
export const primaryButtonShadow = Platform.select({
  ios:     { shadowColor: '#D31145', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.32, shadowRadius: 12 },
  android: { elevation: 8 },
  default: {},
});
export const heroShadow      = shadows.lg;
