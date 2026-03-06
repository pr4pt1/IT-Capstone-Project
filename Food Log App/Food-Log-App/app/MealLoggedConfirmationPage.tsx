import { Text,  StyleSheet,  ScrollView, Pressable,  ImageBackground, Image} from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function MealLoggedConfirmationPage() {
const router = useRouter();
const params = useLocalSearchParams();
const entry = params.data ? JSON.parse(params.data as string) : null;

useEffect(() => {
  const saveMeal = async () => {
    if (!entry) return;

    const stored = await AsyncStorage.getItem('mealEntries');
    const existing = stored ? JSON.parse(stored) : [];

    const newEntry = {
  date: entry.timestamp, // full timestamp
  mealName: entry.mealName,
  ingredients: entry.ingredients,
  calories: entry.calories,
  allergens: entry.allergens,
};

    await AsyncStorage.setItem(
      'mealEntries',
      JSON.stringify([...existing, newEntry])
    );
  };

  saveMeal();
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
        <Image
          source={require('@/assets/images/ourlogo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
    <   ThemedText type="title" style={styles.title}>
      Meal Logged <Ionicons name="checkmark" size={32} color="green" />
        </ThemedText>
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