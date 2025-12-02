/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */


import { Platform } from 'react-native';
import { Theme } from '@react-navigation/native';


const tintColorLight = '#727272ff';
const tintColorDark = '#727272ff';

export const Colors = {
  light: {
    text: '#000000ff',
    background: '#76a800ff',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#000000ff',
    background: '#719e3dff',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'Nunito',    
    serif: 'Nunito',   
    rounded: 'Nunito', 
    mono: 'Nunito',   
  },
  default: {
    sans: 'Nunito',
    serif: 'Nunito',
    rounded: 'Nunito',
    mono: 'Nunito',
  },
  web: {
    sans: 'Nunito, sans-serif',
    serif: 'Nunito, serif',
    rounded: 'Nunito, sans-serif',
    mono: 'Nunito, monospace',
  },
});
