import { Image } from 'expo-image';

interface Props { width?: number; height?: number; }

export function IllustrationHospital({ width = 280, height = 280 }: Props) {
  return (
    <Image
      source={require('../../../assets/illustrations/Hospital.svg')}
      style={{ width, height }}
      contentFit="contain"
    />
  );
}
