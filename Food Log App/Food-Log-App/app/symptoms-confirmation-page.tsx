import { Text,  StyleSheet,  ScrollView, Pressable,  ImageBackground} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

// Type for saved entries
type SymptomEntry = {
  date: string;
  symptoms: string | string[];
  notes?: string;
  meal?: string;
  mood?: string;
  severity?: number;
  timestamp?: string;
};

type IncomingEntry = {
  meal: string;
  symptoms: string;
  mood: string;
  severity: number;
  notes: string;
  timestamp: string; // <-- THIS is the date coming from Symptoms page
};

export default function MealLoggedConfirmationPage() {
const router = useRouter();
const params = useLocalSearchParams();
console.log("PARAMS RECEIVED:", params);

// Parse the data passed from symptoms.tsx
const entry: IncomingEntry | null = params.data
  ? JSON.parse(params.data as string)
  : null;

useEffect(() => {
    const saveToStorage = async () => {
      if (!entry) return;

      // Load existing entries
      const stored = await AsyncStorage.getItem('symptomEntries');
      const existing: SymptomEntry[] = stored ? JSON.parse(stored) : [];

      // Convert symptoms string → array
      const symptomsArray =
        typeof entry.symptoms === 'string'
          ? entry.symptoms.split(',').map((symptom) => symptom.trim())
          : entry.symptoms;

      const newEntry: SymptomEntry = {
        date: entry.timestamp,
        symptoms: symptomsArray,
        notes: entry.notes,
        meal: entry.meal,
        mood: entry.mood,
        severity: entry.severity,
      };

      console.log("ENTRY BEING SAVED:", newEntry);

      // Save updated list
      await AsyncStorage.setItem(
        'symptomEntries',
        JSON.stringify([...existing, newEntry])
      );
    };

    saveToStorage();
  }, []);

  return (
    //Gradient Background
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >

  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
   <ThemedView style={styles.container}>
    <ThemedText type="title">logo will go here</ThemedText>
    <ThemedText type="title">Symptoms Logged <Ionicons name="checkmark" size={32} color="green" /></ThemedText>
        {/* New Account Button */}
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