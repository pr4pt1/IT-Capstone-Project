import React, { useState, useContext } from 'react';
import { Text, StyleSheet, ScrollView, Pressable, ImageBackground,TextInput, View,} 
from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontSizeContext } from "../components/FontSize";

// Firebase
import { auth, db } from '@/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

type AllergenKeys = 'dairy' | 'nuts' | 'gluten';
type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

export default function LogMealPage() {
  const router = useRouter();
  const { fontSize } = useContext(FontSizeContext);

  const [mealName, setMealName] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [calories, setCalories] = useState('');

  const [protein, setProtein] = useState('');
  const [carbs, setCarbs] = useState('');
  const [fat, setFat] = useState('');

  const [mealType, setMealType] = useState<MealType>('Breakfast');

  const [allergens, setAllergens] = useState<Record<AllergenKeys, boolean>>({
    dairy: false,
    nuts: false,
    gluten: false,
  });

  const toggleAllergen = (key: AllergenKeys) => {
    setAllergens(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.log("No user logged in");
      return;
    }

    const entry = {
  date: new Date().toISOString().split('T')[0],
  timestamp: new Date().toISOString(),
  mealName,
  mealType,
  ingredients,

  calories: Number(calories) || 0,
  protein: Number(protein) || 0,
  carbs: Number(carbs) || 0,
  fat: Number(fat) || 0,

  allergens,
};

    try {
    

      router.push({
        pathname: '/MealLoggedConfirmationPage',
        params: {
          data: JSON.stringify(entry),
        },
      });

    } catch (error) {
      console.log("Error saving meal:", error);
    }
  };

  const formattedDate = new Date().toLocaleString();

  return (
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.container}>

          <ThemedText type="title" style={[styles.title, { fontSize: fontSize + 8 }]}>
            Log Your Meal
          </ThemedText>

          {/* DATE */}
          <Text style={[styles.label, { fontSize }]}>Date & Time</Text>
          <View style={styles.box}>
            <Text style={{ fontSize }}>{formattedDate}</Text>
          </View>

          {/* MEAL NAME */}
          <Text style={[styles.label, { fontSize }]}>Meal Name</Text>
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="Ex: Grilled Chicken Salad"
            value={mealName}
            onChangeText={setMealName}
          />

          {/* MEAL TYPE */}
          <Text style={[styles.label, { fontSize }]}>Meal Type</Text>
          <View style={styles.row}>
            {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as MealType[]).map(type => (
              <Pressable
                key={type}
                onPress={() => setMealType(type)}
                style={[
                  styles.typeButton,
                  mealType === type && styles.typeSelected,
                ]}
              >
                <Text style={{ color: mealType === type ? '#fff' : '#000', fontSize }}>
                  {type}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* INGREDIENTS */}
          <Text style={[styles.label, { fontSize }]}>Ingredients</Text>
          <TextInput
            style={[styles.input, { height: 80, fontSize }]}
            placeholder="List ingredients..."
            value={ingredients}
            onChangeText={setIngredients}
            multiline
          />

          {/* CALORIES */}
          <Text style={[styles.label, { fontSize }]}>Calories</Text>
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="Ex: 450"
            value={calories}
            onChangeText={setCalories}
            keyboardType="numeric"
          />

          {/* MACROS */}
          <Text style={[styles.label, { fontSize }]}>Protein</Text>
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="g"
            value={protein}
            onChangeText={setProtein}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { fontSize }]}>Carbs</Text>
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="g"
            value={carbs}
            onChangeText={setCarbs}
            keyboardType="numeric"
          />

          <Text style={[styles.label, { fontSize }]}>Fat</Text>
          <TextInput
            style={[styles.input, { fontSize }]}
            placeholder="g"
            value={fat}
            onChangeText={setFat}
            keyboardType="numeric"
          />

          {/* ALLERGENS */}
          <Text style={[styles.label, { fontSize }]}>Allergens</Text>
          <View style={styles.allergenRow}>
            {(['dairy', 'nuts', 'gluten'] as AllergenKeys[]).map(item => (
              <Pressable
                key={item}
                onPress={() => toggleAllergen(item)}
                style={[
                  styles.allergenButton,
                  allergens[item] && styles.allergenSelected,
                ]}
              >
                <Text style={{ color: allergens[item] ? '#fff' : '#000', fontSize }}>
                  {item}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* SAVE BUTTON */}
          <Pressable style={styles.button} onPress={handleSave}>
            <Text style={[styles.buttonText, { fontSize }]}>Save Meal</Text>
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

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  typeButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#ffffffaa',
    alignItems: 'center',
  },

  typeSelected: {
    backgroundColor: '#2b2c2a',
  },

  allergenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  allergenButton: {
    flex: 1,
    marginHorizontal: 4,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ffffffaa',
    alignItems: 'center',
  },

  allergenSelected: {
    backgroundColor: '#2b2c2a',
  },

  button: {
    marginTop: 30,
    backgroundColor: '#636B2F',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});