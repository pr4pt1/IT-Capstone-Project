import { Tabs } from 'expo-router';
import { Image } from "react-native";
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import home from "../../assets/icons/homeicon.png";
import calendar from "../../assets/icons/calendaricon.png";
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
        name="Settings"
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