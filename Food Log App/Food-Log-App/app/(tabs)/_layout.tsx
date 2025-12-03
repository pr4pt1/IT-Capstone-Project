import { Tabs } from 'expo-router';
import { Image } from "react-native";
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import home from "../../assets/icons/homeicon.png";
import calendar from "../../assets/icons/calendaricon.png";
import history from "../../assets/icons/historyicon.png";
import settings from "../../assets/icons/settingsicon.png";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="Home Page"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={ focused ? home : home} //add active icon later
              style={{ width: 28, height: 28, resizeMode: "contain" }}/>
          ),
        }}
        />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={ focused ? calendar : calendar} //add active icon later
              style={{ width: 28, height: 28, resizeMode: "contain" }}/>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={ focused ? history : history} //add active icon later
              style={{ width: 28, height: 28, resizeMode: "contain" }}/>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ focused }) => (
            <Image 
              source={ focused ? settings : settings} //add active icon later
              style={{ width: 28, height: 28, resizeMode: "contain" }}/>
          ),
        }}
      />
    </Tabs>
  );
}

/*
This is Oyins code for a tabs layout. I have no idea what it does. Please let us know or try to make it work with the tabs

return (
    <Stack
      screenOptions={{
        headerShown: false,
        presentation: "card",
        animation: "fade",
      }}
    />
  );*/
