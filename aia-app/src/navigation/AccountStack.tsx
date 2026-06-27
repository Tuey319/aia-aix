import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AccountStackParamList } from './types';
import { PlaceholderScreen } from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator<AccountStackParamList>();

let AccountScreen: React.ComponentType<any>;
let ProfileEditScreen: React.ComponentType<any>;
let SupportScreen: React.ComponentType<any>;
let FaqListScreen: React.ComponentType<any>;
let FaqSearchScreen: React.ComponentType<any>;
let FaqAnswerScreen: React.ComponentType<any>;
let ChangeFreqScreen: React.ComponentType<any>;
let FreqConfirmScreen: React.ComponentType<any>;
let ContactAgentScreen: React.ComponentType<any>;
let SearchLoadingScreen: React.ComponentType<any>;
let AssistantScreen: React.ComponentType<any>;

try { AccountScreen = require('../screens/account/AccountScreen').AccountScreen; } catch { AccountScreen = () => <PlaceholderScreen name="บัญชี" />; }
try { ProfileEditScreen = require('../screens/account/ProfileEditScreen').ProfileEditScreen; } catch { ProfileEditScreen = () => <PlaceholderScreen name="ข้อมูลส่วนตัว" />; }
try { SupportScreen = require('../screens/support/SupportScreen').SupportScreen; } catch { SupportScreen = () => <PlaceholderScreen name="ศูนย์ช่วยเหลือ" />; }
try { FaqListScreen = require('../screens/support/FaqListScreen').FaqListScreen; } catch { FaqListScreen = () => <PlaceholderScreen name="คำถามที่พบบ่อย" />; }
try { FaqSearchScreen = require('../screens/support/FaqSearchScreen').FaqSearchScreen; } catch { FaqSearchScreen = () => <PlaceholderScreen name="ค้นหา" />; }
try { FaqAnswerScreen = require('../screens/support/FaqAnswerScreen').FaqAnswerScreen; } catch { FaqAnswerScreen = () => <PlaceholderScreen name="คำตอบ" />; }
try { ChangeFreqScreen = require('../screens/support/ChangeFreqScreen').ChangeFreqScreen; } catch { ChangeFreqScreen = () => <PlaceholderScreen name="เปลี่ยนงวดชำระ" />; }
try { FreqConfirmScreen = require('../screens/support/FreqConfirmScreen').FreqConfirmScreen; } catch { FreqConfirmScreen = () => <PlaceholderScreen name="ยืนยันการเปลี่ยน" />; }
try { ContactAgentScreen = require('../screens/support/ContactAgentScreen').ContactAgentScreen; } catch { ContactAgentScreen = () => <PlaceholderScreen name="ติดต่อเจ้าหน้าที่" />; }
try { SearchLoadingScreen = require('../screens/system/SearchLoadingScreen').SearchLoadingScreen; } catch { SearchLoadingScreen = () => <PlaceholderScreen name="กำลังค้นหา" />; }
try { AssistantScreen = require('../screens/assistant/AssistantScreen').AssistantScreen; } catch { AssistantScreen = () => <PlaceholderScreen name="ผู้ช่วย AIA" />; }

export function AccountStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="ProfileEdit" component={ProfileEditScreen} />
      <Stack.Screen name="Support" component={SupportScreen} />
      <Stack.Screen name="FaqList" component={FaqListScreen} />
      <Stack.Screen name="FaqSearch" component={FaqSearchScreen} />
      <Stack.Screen name="FaqAnswer" component={FaqAnswerScreen} />
      <Stack.Screen name="ChangeFreq" component={ChangeFreqScreen} />
      <Stack.Screen name="FreqConfirm" component={FreqConfirmScreen}
        options={{ presentation: 'transparentModal', animation: 'slide_from_bottom' }} />
      <Stack.Screen name="ContactAgent" component={ContactAgentScreen} />
      <Stack.Screen name="SearchLoading" component={SearchLoadingScreen} />
      <Stack.Screen name="Assistant" component={AssistantScreen} />
    </Stack.Navigator>
  );
}
