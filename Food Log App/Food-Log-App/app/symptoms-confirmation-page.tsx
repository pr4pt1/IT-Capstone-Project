import { Text, StyleSheet, ScrollView, Pressable, ImageBackground, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState, useContext } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontSizeContext } from "../components/FontSize";

import { auth, db } from "../firebaseConfig";
import { doc, setDoc, arrayUnion } from "firebase/firestore";

export default function SymptomLoggedConfirmationPage() {
  const router = useRouter();
  const { fontSize } = useContext(FontSizeContext);
  const params = useLocalSearchParams();

  const [saved, setSaved] = useState(false);

  const entry = params.data ? JSON.parse(params.data) : null;

  useEffect(() => {
    const saveToFirebase = async () => {
      if (!entry || saved) return;

      const user = auth.currentUser;
      if (!user) return;

      const dateKey = entry.date;

      const symptomObject = {
        timestamp: entry.timestamp,
        symptoms: entry.symptoms,
        mood: entry.mood,
        severity: entry.severity,
        notes: entry.notes,
      };

      const ref = doc(db, "users", user.uid, "logs", dateKey);

      await setDoc(
        ref,
        {
          symptoms: arrayUnion(symptomObject),
        },
        { merge: true }
      );

      setSaved(true);
    };

    saveToFirebase();
  }, []);

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

          <ThemedText type="title" style={[styles.title, { fontSize: fontSize + 4 }]}>
            Symptoms Logged <Ionicons name="checkmark" size={32} color="green" />
          </ThemedText>

          <Pressable
            style={styles.button}
            onPress={() => router.push('/Calendar')}
          >
            <Text style={[styles.buttonText, { fontSize }]}>
              Continue
            </Text>
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