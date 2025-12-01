import { Text, TextInput, StyleSheet, Alert, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useEffect } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WelcomePage() {
const router = useRouter();

useEffect(() => {

  }, []);

  return <ThemedView style={styles.container}>
    <ThemedText type="title">Do your login here Mary</ThemedText>
    <Pressable 
        style={styles.button} onPress={() => router.replace('/Home Page')}> 
         <Text style={styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable 
        style={styles.button} onPress={() => router.push('/Account Creation')}> 
         <Text style={styles.buttonText}>Account Creation</Text>
        </Pressable>

</ThemedView>
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: '#fff'
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
  },
});
