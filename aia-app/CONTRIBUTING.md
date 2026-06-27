# Contributing to AIA+ App

## Getting started

```bash
git clone <repo>
cd aia-app
npm install
npx expo start
```

## Branch strategy

| Branch | Purpose |
|---|---|
| `main` | Stable, reviewable |
| `feat/<name>` | New screens or features |
| `fix/<name>` | Bug fixes |
| `chore/<name>` | Config, deps, tooling |

Open a PR into `main`. One approval required to merge.

---

## Code conventions

### Screens
- One file per screen in the appropriate `src/screens/<section>/` folder
- Named export matching the filename: `export function PaySelectScreen()`
- Every screen: `SafeAreaView` with `backgroundColor: colors.screenBg`, edges `['top']`
- Header pattern: back arrow (`arrow-back-ios` MaterialIcon) + title in `fontFamily.anuphan.bold` 17px
- Sticky footer buttons: `position: 'absolute', bottom: 0` + `useSafeAreaInsets().bottom` padding

### Design tokens — never hardcode values
```ts
// ✅ Good
import { colors, fontFamily, radius, screenPadding } from '../../tokens';
style={{ color: colors.primary, borderRadius: radius.card }}

// ❌ Bad
style={{ color: '#D31145', borderRadius: 18 }}
```

### Icons
```ts
// ✅ Flat red, no background chip
<MaterialIcons name="shield" size={22} color={colors.primary} />

// ❌ Never add a colored tile behind action icons
<View style={{ backgroundColor: '#FCEDF1', borderRadius: 12, padding: 8 }}>
  <MaterialIcons ... />
</View>
```
Exception: semantic status icons (success check-circle, amber warning) keep their colors.

### Text / fonts
- Thai copy → `fontFamily.anuphan.*`
- Numbers and Latin labels → `fontFamily.jakarta.*`
- Mono IDs/refs/badges → `fontFamily.mono.*`

### Navigation
- Use `useNavigation<NativeStackNavigationProp<any>>()` inside screens (avoids tight coupling to param lists)
- Add new screens to `src/navigation/types.ts` AND the relevant stack file
- All new stack files use a `try { require(...) } catch { PlaceholderScreen }` pattern so new screens can be developed in isolation without breaking other stacks

### State
- Global state lives in `src/store/index.ts` (Zustand)
- Local UI state (toggles, form inputs, slider values) stays in component `useState`
- Don't add new global state for things that are clearly local

---

## Adding a new screen

1. Create the file: `src/screens/<section>/MyScreen.tsx`
2. Export a named function: `export function MyScreen() { ... }`
3. Add it to `src/navigation/types.ts` in the appropriate param list
4. Add the `<Stack.Screen>` entry in the relevant stack file
5. Add navigation trigger in the calling screen

---

## Connecting real data

The app is fully mocked. Each screen that needs an API call is marked with a `🔌` comment. To wire a real endpoint:

1. Add a fetch function in `src/api/<domain>.ts` (create the file)
2. Call it with `useEffect` + local loading/error state, or use a React Query hook
3. Replace the hardcoded value from `useAppStore` with the API result
4. Handle loading and error states (use `SearchLoadingScreen` / `GenericErrorScreen` patterns)

---

## Checklist before opening a PR

- [ ] `npx tsc --noEmit` passes with zero errors
- [ ] Screen matches the reference screenshot in `../design_handoff_aia_app/screenshots/`
- [ ] All icons are flat red (`colors.primary`), no colored background chips on action icons
- [ ] Thai text uses `fontFamily.anuphan.*`, numbers use `fontFamily.jakarta.*`
- [ ] No hardcoded color/spacing values — only tokens
- [ ] New screen is registered in `types.ts` and its stack file
