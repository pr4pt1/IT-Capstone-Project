import { Tabs } from 'expo-router';
import { Image } from "react-native";
import React from 'react';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

import home from "../../assets/icons/homeicon.png";


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
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="Calendar"
        options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => (
            <IconSymbol size={28} name="calendar" color={color} />
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
