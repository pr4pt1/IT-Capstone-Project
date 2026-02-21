import { Text, TextInput, StyleSheet, Alert, ScrollView, Pressable, Platform, Image, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WelcomePage() {
  const router = useRouter();

  useEffect(() => {
  }, []);

  return (
    //Gradient Background
    <ImageBackground
          source={require('@/assets/images/bg.png')}
          style={styles.background}
          resizeMode="cover"
        >
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerRow}>
        <Image
          source={require('@/assets/images/ourlogo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Welcome Back</Text>
      </ThemedView>
        
      <ThemedView style={styles.cardsSection}>

          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Today's Calories</Text>
            <Text style={styles.cardValue}>6,240</Text>
            <Text style={styles.cardSubtitle}>Your fat</Text>
          </Pressable>

          <Pressable style={styles.card}>
            <Text style={styles.cardTitle}>Weekly Progress</Text>
            <Text style={styles.cardSubtitle}>View trends & analytics</Text>
          </Pressable>

        </ThemedView>

      </ThemedView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 75,
    paddingLeft: 20,
    backgroundColor: 'transparent',
  },

  //container for top "bar"
  headerRow: {
    flexDirection: 'row', //horizontal layout
    alignItems: 'center',
    gap: 10, //space between logo & text
    backgroundColor: 'transparent',
  },

  logo: {
    width: 80,
    height: 80,
  },

  title: {
    fontSize: 32,
    color: '#1C1C1E',
    fontWeight: 'bold',
    fontFamily: 'Nunito'
  },

  cardsSection: {
    padding: 10,
    gap: 20,
    backgroundColor: 'transparent',
  },

  card: {
    backgroundColor: '#1C1C1E', 
    padding: 22,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },

  cardSubtitle: {
    fontSize: 14,
    color: '#A1A1A6',
  },

  cardValue: {
    fontSize: 34,
    fontWeight: '700',
    color: '#636B2F', // modern green accent
  },
});