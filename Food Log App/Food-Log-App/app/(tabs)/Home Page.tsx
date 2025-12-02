import { Text, TextInput, StyleSheet, Alert, ScrollView, Pressable, Platform, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerRow}>
        <Image
          source={require('@/assets/images/ourlogo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={{ fontFamily: 'Nunito', fontSize: 14 }}>This should be Nunito</Text>
      </ThemedView>
    </ThemedView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 75,
    paddingLeft: 20,
  },

  //container for top "bar"
  headerRow: {
    flexDirection: 'row', //horizontal layout
    alignItems: 'center',
    gap: 10, //space between logo & text
  },

  logo: {
    width: 80,
    height: 80,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
});