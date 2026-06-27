import { useAppStore } from '../store';
import { strings } from './strings';

export function useStrings() {
  const language = useAppStore((s) => s.language);
  return strings[language];
}

export { strings };
export type { Strings, Language } from './strings';
