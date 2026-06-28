import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  colors,
  fontFamily,
  fontSize,
  radius,
  screenPadding,
  cardGap,
} from '../../tokens';
import { cardShadow, primaryButtonShadow } from '../../tokens/shadows';

type Nav = NativeStackNavigationProp<any>;

const riderRows = [
  { name: 'สัญญาเพิ่มเติมอุบัติเหตุ (ADD/RDD)', amount: '200,000.00' },
  { name: 'สัญญาเพิ่มเติมอุบัติเหตุ (AI/RCC)', amount: '200,000.00' },
  { name: 'สัญญาเพิ่มเติมโรคร้ายแรง (แบบ AIA INFINITE CARE)', amount: '200,000.00' },
];

export function PayCoverageScreen() {
  const navigation = useNavigation<Nav>();
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.screenBg }} edges={['top']}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: 16,
          gap: 8,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={16}>
          <MaterialIcons name="arrow-back-ios" size={20} color={colors.ink} />
        </TouchableOpacity>
        <Text
          style={{
            fontFamily: fontFamily.anuphan.bold,
            fontSize: fontSize.titleLg,
            color: colors.ink,
            flex: 1,
          }}
        >
          ความคุ้มครองเพิ่มเติม
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} hitSlop={16}>
          <MaterialIcons name="close" size={22} color={colors.ink} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: screenPadding,
          paddingBottom: insets.bottom + 120,
          gap: cardGap,
        }}
      >
        {/* Step counter */}
        <Text
          style={{
            fontFamily: fontFamily.jakarta.semiBold,
            fontSize: fontSize.caption,
            color: colors.textSecondary,
            letterSpacing: 0.3,
            marginBottom: 4,
          }}
        >
          2/7
        </Text>

        {/* Dark hero card */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            backgroundColor: colors.ink2,
            borderRadius: radius.card,
            padding: 18,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 14,
          }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              backgroundColor: 'rgba(255,255,255,0.12)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MaterialIcons name="add" size={26} color={colors.white} />
          </View>
          <View style={{ flex: 1, gap: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.bold,
                fontSize: fontSize.bodyMd,
                color: colors.white,
              }}
            >
              เพิ่มทุนประกัน +฿1,000,000
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.caption,
                color: 'rgba(255,255,255,0.65)',
                lineHeight: fontSize.caption * 1.5,
              }}
            >
              +฿420/เดือน · เพิ่มได้ด้วยอายุถึง 60 ปี ไม่มีถามคำถามสุขภาพ
            </Text>
          </View>
          <MaterialIcons name="chevron-right" size={20} color="rgba(255,255,255,0.5)" />
        </TouchableOpacity>

        {/* Divider with text */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginVertical: 4,
          }}
        >
          <View style={{ flex: 1, height: 1, backgroundColor: colors.hairline2 }} />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.regular,
              fontSize: fontSize.caption,
              color: colors.textSecondary,
            }}
          >
            หรือเลือกแพ็กสัญญาเพิ่มเติม ในราคาเพียง
          </Text>
          <View style={{ flex: 1, height: 1, backgroundColor: colors.hairline2 }} />
        </View>

        {/* Bundle card */}
        <View
          style={{
            backgroundColor: colors.card,
            borderRadius: radius.card,
            padding: 18,
            gap: 14,
            ...cardShadow,
          }}
        >
          {/* Big price */}
          <View style={{ alignItems: 'center', gap: 4 }}>
            <Text
              style={{
                fontFamily: fontFamily.jakarta.bold,
                fontSize: 32,
                color: colors.primary,
                letterSpacing: -1,
              }}
            >
              3,000{' '}
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.regular,
                  fontSize: fontSize.title,
                  color: colors.inkBody2,
                  letterSpacing: 0,
                }}
              >
                บาทต่อปี
              </Text>
            </Text>
            <Text
              style={{
                fontFamily: fontFamily.anuphan.regular,
                fontSize: fontSize.body,
                color: colors.textSecondary,
                textAlign: 'center',
              }}
            >
              สมัครได้ง่าย ไม่ต้องตรวจหรือตอบคำถามสุขภาพ
            </Text>
          </View>

          {/* Rider table */}
          <View style={{ gap: 0 }}>
            {/* Column headers */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 6 }}>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: fontSize.caption, color: colors.textSecondary }}>สัญญาประกัน</Text>
              <Text style={{ fontFamily: fontFamily.anuphan.regular, fontSize: fontSize.caption, color: colors.textSecondary }}>จำนวนทุนประกัน</Text>
            </View>
            <View style={{ height: 1, backgroundColor: colors.hairline }} />
            {riderRows.map((row, i) => (
              <View key={i}>
                {i > 0 && (
                  <View style={{ height: 1, backgroundColor: colors.hairline, marginVertical: 0 }} />
                )}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 11,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: fontFamily.anuphan.regular,
                      fontSize: fontSize.body,
                      color: colors.inkBody,
                      flex: 1,
                      paddingRight: 8,
                    }}
                  >
                    {row.name}
                  </Text>
                  <Text
                    style={{
                      fontFamily: fontFamily.jakarta.semiBold,
                      fontSize: fontSize.body,
                      color: colors.ink2,
                    }}
                  >
                    {row.amount}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Two outline buttons */}
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TouchableOpacity
              activeOpacity={0.82}
              style={{
                flex: 1,
                height: 44,
                borderRadius: radius.button,
                borderWidth: 1.5,
                borderColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.body,
                  color: colors.primary,
                }}
              >
                ติดต่อตัวแทน
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.82}
              style={{
                flex: 1,
                height: 44,
                borderRadius: radius.button,
                borderWidth: 1.5,
                borderColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily: fontFamily.anuphan.semiBold,
                  fontSize: fontSize.body,
                  color: colors.primary,
                }}
              >
                ดูเพิ่มเติม
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Blue marketplace row */}
        <TouchableOpacity
          activeOpacity={0.85}
          style={{
            backgroundColor: colors.infoTint,
            borderRadius: radius.card,
            padding: 14,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <MaterialIcons name="storefront" size={20} color={colors.info} />
          <Text
            style={{
              fontFamily: fontFamily.anuphan.medium,
              fontSize: fontSize.body,
              color: colors.infoDeep,
              flex: 1,
            }}
          >
            ดูแผนเพิ่มเติมทั้งหมดใน AIA Marketplace
          </Text>
          <MaterialIcons name="open-in-new" size={18} color={colors.info} />
        </TouchableOpacity>
      </ScrollView>

      {/* Bottom sticky buttons */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: colors.screenBg,
          paddingHorizontal: screenPadding,
          paddingTop: 12,
          paddingBottom: insets.bottom + 16,
          borderTopWidth: 1,
          borderTopColor: colors.hairline,
          gap: 8,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('PayReview')}
          style={{
            backgroundColor: colors.primary,
            borderRadius: radius.button,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            ...primaryButtonShadow,
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontFamily: fontFamily.anuphan.bold,
              fontSize: fontSize.title,
            }}
          >
            เพิ่มความคุ้มครอง
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={() => navigation.navigate('PayReview')}
          style={{
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color: colors.textSecondary,
              fontFamily: fontFamily.anuphan.medium,
              fontSize: fontSize.title,
            }}
          >
            ข้าม
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
