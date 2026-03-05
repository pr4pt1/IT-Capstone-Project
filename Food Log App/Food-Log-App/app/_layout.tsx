import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

import { useFonts } from 'expo-font';

import { FontSizeProvider } from "../components/FontSize"; //Added by Mary

export const unstable_settings = {
  anchor: '(tabs)',
};


export default function RootLayout() {
  const colorScheme = useColorScheme();

  //Load the fonts
  const [fontsLoaded] = useFonts({
    Nunito: require('@/assets/fonts/static/Nunito-Regular.ttf'),
    NunitoBold: require('@/assets/fonts/static/Nunito-Bold.ttf'),
    NunitoSemiBold: require('@/assets/fonts/static/Nunito-SemiBold.ttf'),
  });

  // Wait until fonts are loaded before rendering
  if (!fontsLoaded) return null;

  //Added by Mary - Font Size Provider
  return (
    <FontSizeProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: true }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="TextSize" options={{ headerShown: true }} /> {/* Added by Mary */}
          <Stack.Screen name="MealLoggedConfirmationPage" options={{ headerShown: false }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </FontSizeProvider>
  );
}

