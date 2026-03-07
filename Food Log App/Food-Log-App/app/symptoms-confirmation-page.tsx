import { Text, StyleSheet, ScrollView, Pressable, ImageBackground, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Type for saved entries
type SymptomEntry = {
  date: string;
  symptoms: string[];
  notes?: string;
  meal?: string;
  mood?: string;
  severity?: number;
  timestamp: string;
};

type IncomingEntry = {
  meal: string;
  symptoms: string;
  mood: string;
  severity: number;
  notes: string;
  timestamp: string;
};

export default function SymptomLoggedConfirmationPage() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const entry: IncomingEntry | null = params.data
    ? JSON.parse(params.data as string)
    : null;

  useEffect(() => {
    const saveToStorage = async () => {
      if (!entry) return;

      const stored = await AsyncStorage.getItem('symptomEntries');
      const existing: SymptomEntry[] = stored ? JSON.parse(stored) : [];

      const symptomsArray =
        typeof entry.symptoms === 'string'
          ? entry.symptoms.split(',').map((s) => s.trim())
          : entry.symptoms;

      const newEntry: SymptomEntry = {
        date: entry.timestamp.split('T')[0], // calendar key
        symptoms: symptomsArray,
        notes: entry.notes,
        meal: entry.meal,
        mood: entry.mood,
        severity: entry.severity,
        timestamp: entry.timestamp, // keep full time
      };

      await AsyncStorage.setItem(
        'symptomEntries',
        JSON.stringify([...existing, newEntry])
      );
    };

    saveToStorage();
  }, [entry]);

  return (
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.container}>
          <Image
            source={require('@/assets/images/ourlogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <ThemedText type="title" style={styles.title}>
            Symptoms Logged <Ionicons name="checkmark" size={32} color="green" />
          </ThemedText>

          <Pressable
            style={styles.button}
            onPress={() => router.push('/Calendar')}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'transparent',
  },

  button: {
    marginTop: 20,
    backgroundColor: '#636B2F',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  logo: {
    width: 280,
    height: 280,
  },

  title: {
    lineHeight: 40,
    marginBottom: 10,
  },
});