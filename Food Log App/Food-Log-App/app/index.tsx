import { Text, TextInput, StyleSheet, Alert, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';

export default function WelcomePage() {
  const router = useRouter();

  return (
    //Gradient Background
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.background}
      resizeMode="contain"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Welcome to</Text>
        <Text style={styles.title}>The Food Log</Text>

        <Pressable
          style={styles.button}
          onPress={() => router.push('/Login Page')}
        >
          <Text style={styles.buttonText}>Start</Text>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'Nunito'
  },

  button: {
    marginTop: 20,
    backgroundColor: '#2b2c2aff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#b8ff7eff',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Nunito'
  },
});
