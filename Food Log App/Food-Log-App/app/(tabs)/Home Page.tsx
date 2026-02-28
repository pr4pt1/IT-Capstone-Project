import {
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Circle } from 'react-native-svg';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WelcomePage() {
  const router = useRouter();

  //DATE STATE
  const [currentDate, setCurrentDate] = useState(new Date());

  const changeDay = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + direction);
    setCurrentDate(newDate);
  };

  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  //CALORIE DATA
  const calorieGoal = 2000;
  const caloriesConsumed = 1850;
  const caloriesRemaining = calorieGoal - caloriesConsumed;
  const calorieProgress = caloriesConsumed / calorieGoal;

  //MACROS
  const macros = [
    { name: 'Protein', consumed: 90, goal: 150 },
    { name: 'Carbs', consumed: 180, goal: 250 },
    { name: 'Fat', consumed: 50, goal: 70 },
  ];

  //WATER INTAKE
  const [waterGlasses, setWaterGlasses] = useState(0);
  const waterGoal = 8;

  const addGlass = () => {
    if (waterGlasses < waterGoal) setWaterGlasses(waterGlasses + 1);
  };

  const removeGlass = () => {
    if (waterGlasses > 0) setWaterGlasses(waterGlasses - 1);
  };

  return (
    <LinearGradient
      colors={['#99b874', '#234323']}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>

        {/* DATE ROW */}
        <ThemedView style={styles.dateRow}>
          <Pressable onPress={() => changeDay(-1)}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </Pressable>

          <ThemedText style={styles.dateText}>
            {formattedDate}
          </ThemedText>

          <Pressable onPress={() => changeDay(1)}>
            <Ionicons name="chevron-forward" size={28} color="white" />
          </Pressable>
        </ThemedView>

        {/* CALORIE CARD */}
        <ThemedView style={styles.calorieCard}>
          <ThemedText style={styles.calorieTitle}>Calories</ThemedText>

          <CalorieRing progress={calorieProgress} />

          <ThemedText style={styles.remainingText}>
            {caloriesConsumed} / {calorieGoal}
          </ThemedText>

          <ThemedText style={styles.remainingText}>
            {caloriesRemaining} calories remaining
          </ThemedText>
        </ThemedView>

        {/* MACROS CARD */}
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
                      { width: `${progress * 100}%` },
                    ]}
                  />
                </ThemedView>

                <ThemedText style={styles.macroText}>
                  {macro.consumed}g / {macro.goal}g
                </ThemedText>
              </ThemedView>
            );
          })}
        </ThemedView>

        {/* MEALS LOGGED CARD */}
        <Pressable style={styles.card}> 
          <ThemedText style={styles.cardTitle}>Meals Logged Today</ThemedText>

            <ThemedView style={styles.mealItem}> 
              <ThemedText style={styles.mealName}>Breakfast</ThemedText> 
              <ThemedText style={styles.mealCalories}>+350 cal</ThemedText> 
            </ThemedView> 

            <ThemedView style={styles.mealItem}> 
              <ThemedText style={styles.mealName}>Lunch</ThemedText> 
              <ThemedText style={styles.mealCalories}>+650 cal</ThemedText> 
            </ThemedView> 
            
            <ThemedView style={styles.mealItem}> 
              <ThemedText style={styles.mealName}>Dinner</ThemedText> 
              <ThemedText style={styles.mealCalories}>+850 cal</ThemedText> 
            </ThemedView> 
          </Pressable>

        {/* WATER INTAKE CARD */}
        <ThemedView style={styles.waterContainer}>
          <ThemedText style={styles.sectionTitle}>Water Intake</ThemedText>

          <ThemedView style={styles.glassesRow}>
            {Array.from({ length: waterGoal }).map((_, index) => (
          <ThemedView
            key={index}
            style={[
              styles.glass,
              { backgroundColor: index < waterGlasses ? '#99b874' : 'rgba(255,255,255,0.2)' },
            ]}
            />
            ))}
          </ThemedView>

          {/* WATER BUTTONS */}
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

const CalorieRing = ({ progress }) => {
  const size = 180;
  const strokeWidth = 15;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

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
        <ThemedText style={{ fontSize: 22, fontWeight: 'bold', color: 'white' }}>
          {Math.round(progress * 100)}%
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