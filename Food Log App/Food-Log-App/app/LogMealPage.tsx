import React, { useState } from 'react';
import {Text,StyleSheet,ScrollView,Pressable,ImageBackground,TextInput,View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

type AllergenKeys = 'dairy' | 'nuts' | 'gluten';

export default function LogMealPage() {
  const router = useRouter();

  const [mealName, setMealName] = useState<string>('');
  const [ingredients, setIngredients] = useState<string>('');
  const [calories, setCalories] = useState<string>('');
  const [allergens, setAllergens] = useState<Record<AllergenKeys, boolean>>({
    dairy: false,
    nuts: false,
    gluten: false,
  });

  const toggleAllergen = (key: AllergenKeys): void => {
    setAllergens((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = (): void => {
    const entry = {
      mealName,
      ingredients,
      calories,
      allergens,
      timestamp: new Date().toISOString(),
    };

    console.log('Saved Meal:', entry);

    router.push('/MealLoggedConfirmationPage');
  };

  const formattedDate: string = new Date().toLocaleString();

  return (
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.container}>
          
          {/* Title */}
          <ThemedText type="title" style={styles.title}>
            Log Your Meal
          </ThemedText>

          {/* Date & Time */}
          <Text style={styles.label}>Date & Time</Text>
          <View style={styles.box}>
            <Text>{formattedDate}</Text>
          </View>

          {/* Meal Name */}
          <Text style={styles.label}>Meal Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Grilled Chicken Salad"
            value={mealName}
            onChangeText={setMealName}
          />

          {/* Ingredients */}
          <Text style={styles.label}>Ingredients</Text>
          <TextInput
            style={[styles.input, { height: 80 }]}
            placeholder="List ingredients..."
            value={ingredients}
            onChangeText={setIngredients}
            multiline
          />

          {/* Estimated Calories */}
          <Text style={styles.label}>Estimated Calories</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 450"
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />

          {/* Flag Allergens */}
          <Text style={styles.label}>Flag Potential Allergens</Text>
          <View style={styles.allergenRow}>
            {(['dairy', 'nuts', 'gluten'] as AllergenKeys[]).map((item) => (
              <Pressable
                key={item}
                style={[
                  styles.allergenButton,
                  allergens[item] && styles.allergenSelected,
                ]}
                onPress={() => toggleAllergen(item)}
              >
                <Text style={styles.allergenText}>
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Save Button */}
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Meal</Text>
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
    padding: 20,
    backgroundColor: 'transparent',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    marginTop: 15,
    fontWeight: '600',
  },
  box: {
    backgroundColor: '#ffffffaa',
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    marginTop: 6,
    backgroundColor: '#ffffffaa',
  },
  allergenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  allergenButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#ffffffaa',
  },
  allergenSelected: {
    backgroundColor: '#2b2c2a',
  },
  allergenText: {
    fontWeight: '600',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#2b2c2a',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#b8ff7e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});