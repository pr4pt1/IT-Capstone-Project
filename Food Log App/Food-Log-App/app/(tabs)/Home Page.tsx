import { Text, TextInput, StyleSheet, Pressable, Platform, Image, ImageBackground } from 'react-native';
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
          
                  {/* Log Meal page */}
                <Pressable
                  style={styles.button}
                  onPress={() => router.push('/LogMealPage')}
                >
                  <Text style={styles.buttonText}>Log Your meal button</Text>
                </Pressable> 
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
    fontWeight: 'bold',
    fontFamily: 'Nunito'
  },

 button: {
  marginTop: 40,          
  backgroundColor: '#2b2c2aff',
  paddingVertical: 15,
  paddingHorizontal: 40,
  borderRadius: 10,
  alignSelf: 'center',
  alignItems: 'center',
},

  buttonText: {
    color: '#b8ff7eff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});