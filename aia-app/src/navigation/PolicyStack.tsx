import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PolicyStackParamList } from './types';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator<PolicyStackParamList>();

// Lazy imports — screens written by agent; fall back to placeholder if not yet present
let PolicyScreen: React.ComponentType<any>;
let PolicyDocsScreen: React.ComponentType<any>;
let CoverageDetailScreen: React.ComponentType<any>;
let VitalityScreen: React.ComponentType<any>;
let EmptyPoliciesScreen: React.ComponentType<any>;

try { PolicyScreen = require('../screens/policy/PolicyScreen').PolicyScreen; } catch { PolicyScreen = () => <PlaceholderScreen name="กรมธรรม์" />; }
try { PolicyDocsScreen = require('../screens/policy/PolicyDocsScreen').PolicyDocsScreen; } catch { PolicyDocsScreen = () => <PlaceholderScreen name="เอกสารกรมธรรม์" />; }
try { CoverageDetailScreen = require('../screens/policy/CoverageDetailScreen').CoverageDetailScreen; } catch { CoverageDetailScreen = () => <PlaceholderScreen name="ค่ารักษาผู้ป่วยใน" />; }
try { VitalityScreen = require('../screens/policy/VitalityScreen').VitalityScreen; } catch { VitalityScreen = () => <PlaceholderScreen name="AIA Vitality" />; }
try { EmptyPoliciesScreen = require('../screens/system/EmptyPoliciesScreen').EmptyPoliciesScreen; } catch { EmptyPoliciesScreen = () => <PlaceholderScreen name="ยังไม่มีกรมธรรม์" />; }

export function PolicyStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Policy" component={PolicyScreen} />
      <Stack.Screen name="PolicyDocs" component={PolicyDocsScreen} />
      <Stack.Screen name="CoverageDetail" component={CoverageDetailScreen} />
      <Stack.Screen name="Vitality" component={VitalityScreen} />
      <Stack.Screen name="EmptyPolicies" component={EmptyPoliciesScreen} />
    </Stack.Navigator>
  );
}
