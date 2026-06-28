import React from 'react';
import { View, Text, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { MainTabParamList } from './types';
import { HomeStack } from './HomeStack';
import { PolicyStack } from './PolicyStack';
import { ClaimsStack } from './ClaimsStack';
import { AccountStack } from './AccountStack';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';
import { BenefitsScreen } from '../screens/benefits/BenefitsScreen';
import { colors, fontFamily } from '../tokens';
import { useStrings } from '../i18n';

const Tab = createBottomTabNavigator<MainTabParamList>();

function TabLabel({ label, focused }: { label: string; focused: boolean }) {
  return (
    <Text style={{ fontFamily: fontFamily.anuphan.medium, fontSize: 10, color: focused ? colors.primary : colors.textSecondary, marginTop: 2 }}>
      {label}
    </Text>
  );
}

function CenterTabIcon({ focused }: { focused: boolean }) {
  return (
    <View style={{ width: 44, height: 44, borderRadius: 13, backgroundColor: focused ? colors.primary : colors.hairline2, alignItems: 'center', justifyContent: 'center', marginBottom: 2 }}>
      <MaterialIcons name="favorite" size={20} color={focused ? colors.white : colors.textSecondary} />
    </View>
  );
}

export function TabNavigator() {
  const s = useStrings();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.hairline,
          borderTopWidth: 0.5,
          height: Platform.OS === 'ios' ? 84 : 64,
          paddingBottom: Platform.OS === 'ios' ? 24 : 8,
          paddingTop: 10,
          // Subtle shadow above tab bar
          shadowColor: '#14141E',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 12,
          elevation: 12,
        },
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) => <MaterialIcons name="home" size={26} color={focused ? colors.primary : colors.textSecondary} />,
          tabBarLabel: ({ focused }) => <TabLabel label={s.tabs.home} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="PolicyTab"
        component={PolicyStack}
        options={{
          tabBarIcon: ({ focused }) => <MaterialCommunityIcons name="shield-outline" size={24} color={focused ? colors.primary : colors.textSecondary} />,
          tabBarLabel: ({ focused }) => <TabLabel label={s.tabs.policy} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="CenterTab"
        component={ClaimsStack}
        options={{
          tabBarIcon: ({ focused }) => <CenterTabIcon focused={focused} />,
          tabBarLabel: ({ focused }) => <TabLabel label="Vitality" focused={focused} />,
        }}
      />
      <Tab.Screen
        name="BenefitsTab"
        component={BenefitsScreen}
        options={{
          tabBarIcon: ({ focused }) => <MaterialIcons name="card-giftcard" size={24} color={focused ? colors.primary : colors.textSecondary} />,
          tabBarLabel: ({ focused }) => <TabLabel label={s.tabs.benefits} focused={focused} />,
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{
          tabBarIcon: ({ focused }) => <MaterialIcons name="person-outline" size={24} color={focused ? colors.primary : colors.textSecondary} />,
          tabBarLabel: ({ focused }) => <TabLabel label={s.tabs.account} focused={focused} />,
        }}
      />
    </Tab.Navigator>
  );
}
