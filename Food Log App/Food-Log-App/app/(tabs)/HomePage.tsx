import {Text, StyleSheet, ScrollView, Pressable} 
from 'react-native';

import { useRouter } from 'expo-router';
import { useState, useEffect, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { FontSizeContext } from "@/components/FontSize";

// FIREBASE
import { auth, db } from "@/firebaseConfig";
import { collection, onSnapshot, doc, setDoc } from "firebase/firestore";

export default function WelcomePage() {
  const router = useRouter();
  const { fontSize } = useContext(FontSizeContext);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [allLogs, setAllLogs] = useState<any>({});
  const [mealsToday, setMealsToday] = useState<any[]>([]);

  const [caloriesConsumed, setCaloriesConsumed] = useState(0);
  const calorieGoal = 2000;

  const [macros, setMacros] = useState([
    { name: 'Protein', consumed: 0, goal: 150 },
    { name: 'Carbs', consumed: 0, goal: 250 },
    { name: 'Fat', consumed: 0, goal: 70 },
  ]);

  
  const [waterGlasses, setWaterGlasses] = useState(0);
  const waterGoal = 8;

 
  const changeDay = (direction: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  const selectedDateKey = currentDate.toISOString().split("T")[0];

  
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = collection(db, "users", user.uid, "logs");

    const unsub = onSnapshot(ref, (snapshot) => {
      const data: any = {};

      snapshot.forEach((doc) => {
        data[doc.id] = doc.data();
      });

      setAllLogs(data);
    });

    return () => unsub();
  }, []);

  
  useEffect(() => {
    const dayData = allLogs?.[selectedDateKey] || {};
    let meals = dayData.meals || [];

    // 🔥 SORT BY TIME (NEWEST FIRST)
    meals = meals.slice().sort(
      (a: any, b: any) =>
        new Date(b.timestamp || 0).getTime() -
        new Date(a.timestamp || 0).getTime()
    );

    setMealsToday(meals);

    let totalCalories = 0;
    let protein = 0;
    let carbs = 0;
    let fat = 0;

    meals.forEach((meal: any) => {
      totalCalories += Number(meal.calories) || 0;
      protein += Number(meal.protein) || 0;
      carbs += Number(meal.carbs) || 0;
      fat += Number(meal.fat) || 0;
    });

    setCaloriesConsumed(totalCalories);

    setMacros([
      { name: 'Protein', consumed: protein, goal: 150 },
      { name: 'Carbs', consumed: carbs, goal: 250 },
      { name: 'Fat', consumed: fat, goal: 70 },
    ]);

    setWaterGlasses(dayData.water || 0);

  }, [allLogs, selectedDateKey]);

  const caloriesRemaining = calorieGoal - caloriesConsumed;

  const calorieProgress = Math.min(caloriesConsumed / calorieGoal, 1);

  
  const updateWater = async (newValue: number) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid, "logs", selectedDateKey);

      await setDoc(ref, { water: newValue }, { merge: true });
    } catch (e) {
      console.error("Water save failed:", e);
    }
  };

  const addGlass = () => {
    const newValue = Math.min(waterGlasses + 1, waterGoal);
    setWaterGlasses(newValue);
    updateWater(newValue);
  };

  const removeGlass = () => {
    const newValue = Math.max(waterGlasses - 1, 0);
    setWaterGlasses(newValue);
    updateWater(newValue);
  };

  return (
    <LinearGradient colors={['#99b874', '#234323']} style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* DATE */}
        <ThemedView style={styles.dateRow}>
          <Pressable onPress={() => changeDay(-1)}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </Pressable>

          <ThemedText style={[styles.dateText, { fontSize }]}>
            {formattedDate}
          </ThemedText>

          <Pressable onPress={() => changeDay(1)}>
            <Ionicons name="chevron-forward" size={28} color="white" />
          </Pressable>
        </ThemedView>

        {/* CALORIES */}
        <ThemedView style={styles.calorieCard}>
          <ThemedText style={[styles.calorieTitle, { fontSize }]}>
            Calories
          </ThemedText>

          <CalorieRing progress={calorieProgress} fontSize={fontSize} />

          <ThemedText style={styles.remainingText}>
            {caloriesConsumed} / {calorieGoal}
          </ThemedText>

          <ThemedText style={styles.remainingText}>
            {caloriesRemaining} calories remaining
          </ThemedText>
        </ThemedView>

        {/* MACROS */}
        <ThemedView style={styles.macrosContainer}>
          {macros.map((macro, index) => {
            const progress = macro.consumed / macro.goal;

            return (
              <ThemedView key={index} style={styles.macroCard}>
                <ThemedText style={styles.macroTitle}>
                  {macro.name}
                </ThemedText>

                <ThemedView style={styles.macroBarBackground}>
                  <ThemedView
                    style={[
                      styles.macroBarFill,
                      { width: `${Math.min(progress * 100, 100)}%` },
                    ]}
                  />
                </ThemedView>

                <ThemedText style={[styles.macroText, { fontSize }]}>
                  {macro.consumed}g / {macro.goal}g
                </ThemedText>
              </ThemedView>
            );
          })}
        </ThemedView>

        {/* MEALS */}
        <Pressable style={styles.card}>
          <ThemedText style={styles.cardTitle}>
            Meals Logged Today
          </ThemedText>

          {mealsToday.length === 0 ? (
            <ThemedText style={{ color: "#aaa" }}>
              No meals logged
            </ThemedText>
          ) : (
            mealsToday.map((meal, index) => (
              <ThemedView key={index} style={styles.mealItem}>
                <ThemedText style={styles.mealName}>
                  {meal.mealName}
                </ThemedText>
                <ThemedText style={styles.mealCalories}>
                  +{Number(meal.calories) || 0} cal
                </ThemedText>
              </ThemedView>
            ))
          )}
        </Pressable>

        {/* WATER */}
        <ThemedView style={styles.waterContainer}>
          <ThemedText style={[styles.sectionTitle, { fontSize }]}>
            Water Intake
          </ThemedText>

          <ThemedView style={styles.glassesRow}>
            {Array.from({ length: waterGoal }).map((_, index) => (
              <ThemedView
                key={index}
                style={[
                  styles.glass,
                  {
                    backgroundColor:
                      index < waterGlasses
                        ? '#99b874'
                        : 'rgba(255,255,255,0.2)'
                  },
                ]}
              />
            ))}
          </ThemedView>

          <ThemedView style={styles.waterButtons}>
            <Pressable style={styles.button} onPress={removeGlass}>
              <ThemedText style={styles.buttonText}>-</ThemedText>
            </Pressable>
            <Pressable style={styles.button} onPress={addGlass}>
              <ThemedText style={styles.buttonText}>+</ThemedText>
            </Pressable>
          </ThemedView>

          <ThemedText style={styles.remainingText}>
            {waterGlasses} / {waterGoal} glasses
          </ThemedText>
        </ThemedView>

      </ScrollView>
    </LinearGradient>
  );
}

/* =========================
   CALORIE RING
========================= */
type CalorieRingProps = {
  progress: number;
  fontSize: number;
};

const CalorieRing = ({ progress, fontSize }: CalorieRingProps) => {
  const size = 180;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const safeProgress = Math.min(progress, 1);
  const strokeDashoffset = circumference - safeProgress * circumference;

  return (
    <ThemedView style={{ alignItems: 'center', justifyContent: 'center', marginVertical: 10, backgroundColor: 'transparent' }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="rgba(255,255,255,0.3)"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />

        <Circle
          stroke="#234323"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>

      <ThemedView style={{ position: 'absolute', alignItems: 'center', backgroundColor: 'transparent' }}>
        <ThemedText style={{ fontSize: fontSize + 4, fontWeight: 'bold', color: 'white' }}>
          {Math.round(safeProgress * 100)}%
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingTop: 75,
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },

  logo: {
    width: 70,
    height: 70,
  },

  title: {
    fontSize: 32,
    color: '#1C1C1E',
    fontWeight: 'bold',
    fontFamily: 'Nunito'
  },

  cardsSection: {
    padding: 10,
    gap: 20,
    backgroundColor: 'transparent',
  },

  card: {
    backgroundColor: '#1C1C1E',
    padding: 20,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#2C2C2E',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 8,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 8,
  },

  cardSubtitle: {
    fontSize: 14,
    color: '#A1A1A6',
  },

  cardValue: {
    fontSize: 34,
    fontWeight: '700',
    color: '#636B2F',
  },

  mealItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
    backgroundColor: 'transparent',
  },

  mealName: {
    fontSize: 15,
    color: '#ffffff',
  },

  mealCalories: {
    fontSize: 14,
    color: '#99b874',
  },

  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 0,
    backgroundColor: 'transparent',
  },

  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },

  calorieCard: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    marginTop: 20,
    backgroundColor: 'transparent',
  },

  calorieTitle: {
    fontSize: 16,
    alignItems: 'center',
    color: '#ffffff',
    marginBottom: 5,

  },

  calorieMain: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  progressBarBackground: {
    height: 10,
    borderRadius: 10,
    overflow: 'hidden',
  },

  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },

  remainingText: {
    marginTop: 10,
    fontSize: 14,
    color: 'white',
  },

  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    backgroundColor: 'transparent',
  },

  macroCard: {
    flex: 1,
    marginHorizontal: 20,
    marginBottom: 30,
    backgroundColor: 'transparent',
  },

  macroTitle: {
    fontSize: 14,
    marginBottom: 5,
    color: 'white',
  },

  macroText: {
    fontSize: 12,
    marginTop: 4,
    color: 'white',
  },

  macroBarBackground: {
    height: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },

  macroBarFill: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: '#234323'
  },

  mealsCard: {
    width: '100%',
    marginTop: 25,
    padding: 20,
    borderRadius: 20,
  },

  waterContainer: {
    width: '100%',
    marginTop: 25,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginBottom: 10,
  },

  glassesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },

  glass: {
    width: 30,
    height: 30,
    borderRadius: 6,
  },

  waterButtons: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },

  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
});