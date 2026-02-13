import { Text,  StyleSheet,  ScrollView, Pressable,  ImageBackground} from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function MealLoggedConfirmationPage() {
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

  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
   <ThemedView style={styles.container}>
    <ThemedText type="title">logo will go here</ThemedText>
    <ThemedText type="title">Meal Logged <Ionicons name="checkmark" size={32} color="green" /></ThemedText>
        {/* New Account Button */}
        <Pressable
          style={styles.button}
          onPress={() => router.push('/LogMealPage')}
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