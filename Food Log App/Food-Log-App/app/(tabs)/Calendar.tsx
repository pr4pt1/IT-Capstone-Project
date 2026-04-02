import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useContext } from "react";
import { FontSizeContext } from "@/components/FontSize";


const moodEmojiMap: Record<string, string> = {
  happy: "😊",
  neutral: "😐",
  uneasy: "😕",
  painful: "🤢",
  severe: "😖",
};

type SymptomEntry = {
  timestamp: string; // full timestamp
  symptoms: string | string[];
  notes?: string;
  mood?: string;
  severity?: number;
};

type MealEntry = {
  date: string; // full timestamp
  mealName: string;
  ingredients?: string;
  calories?: string;
  allergens?: { dairy?: boolean; nuts?: boolean; gluten?: boolean };
};

export default function CalendarScreen() {
  const { fontSize } = useContext(FontSizeContext);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [allSymptoms, setAllSymptoms] = useState<SymptomEntry[]>([]);
  const [allMeals, setAllMeals] = useState<MealEntry[]>([]);

  const [symptomsForDay, setSymptomsForDay] = useState<SymptomEntry[]>([]);
  const [mealsForDay, setMealsForDay] = useState<MealEntry[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const storedSymptoms = await AsyncStorage.getItem('symptomEntries');
      if (storedSymptoms) setAllSymptoms(JSON.parse(storedSymptoms));

      const storedMeals = await AsyncStorage.getItem('mealEntries');
      if (storedMeals) setAllMeals(JSON.parse(storedMeals));
    };
    loadData();
  }, []);

  // Filter symptoms and meals for selected date (ignore time)
  useEffect(() => {
  const safeFilter = (value: string | undefined) => {
    if (!value) return null;
    const d = new Date(value);
    if (isNaN(d.getTime())) return null;
    return d.toISOString().split("T")[0];
  };

  setSymptomsForDay(
    allSymptoms.filter((entry) => {
      const dateOnly = safeFilter(entry.timestamp);
      return dateOnly === selectedDate;
    })
  );

  setMealsForDay(
    allMeals.filter((meal) => {
      const dateOnly = safeFilter(meal.date);
      return dateOnly === selectedDate;
    })
  );
}, [selectedDate, allSymptoms, allMeals]);

  const clearCalendarData = () => {
    Alert.alert(
      "Clear Calendar",
      "Are you sure you want to delete all calendar data? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes, Clear",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('symptomEntries');
              await AsyncStorage.removeItem('mealEntries');

              setAllSymptoms([]);
              setAllMeals([]);
              setSymptomsForDay([]);
              setMealsForDay([]);

              alert('Calendar data cleared!');
            } catch (error) {
              console.error('Error clearing calendar data:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <ImageBackground
      source={require('@/assets/images/bg.png')}
      style={styles.background}
      resizeMode="contain"
    >
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={[styles.headerText, { fontSize: fontSize + 8 }]}>Calendar History</Text>
          <TouchableOpacity onPress={clearCalendarData} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>Clear Calendar</Text>
          </TouchableOpacity>
        </View>

        {/* CALENDAR */}
        <Calendar
          current={selectedDate}
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: '#636B2F',
              selectedTextColor: '#FFFFFF',
            },
          }}
          theme={{
            backgroundColor: '#BAC095',
            calendarBackground: '#BAC095',
            textSectionTitleColor: '#3D4127',
            selectedDayBackgroundColor: '#636B2F',
            selectedDayTextColor: '#FFFFFF',
            todayTextColor: '#3D4127',
            dayTextColor: '#3D4127',
            arrowColor: '#3D4127',
            monthTextColor: '#3D4127',
            textMonthFontWeight: "bold",
            textMonthFontSize: 22,
          }}
        />

        <Text style={styles.detailsTitle}>Selected Date Details</Text>

        <ScrollView style={styles.details}>
          <View style={styles.detailsBox}>

            {/* MEALS */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>Meals Logged</Text>
                <TouchableOpacity
                  onPress={() => router.push('/LogMealPage')}
                  style={styles.plusButton}
                >
                  <Text style={styles.plusText}>+</Text>
                </TouchableOpacity>
              </View>

              {mealsForDay.length === 0 ? (
                <Text style={styles.sectionBodyText}>No meals logged for this day.</Text>
              ) : (
                mealsForDay.map((meal, index) => (
                  <View key={index} style={styles.symptomItem}>
                    <Text style={styles.sectionBodyText}>{meal.mealName}</Text>

                    <Text style={styles.sectionBodyText}>
                      Time: {new Date(meal.date).toLocaleString([], {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </Text>

                    {meal.calories && (
                      <Text style={styles.sectionBodyText}>Calories: {meal.calories}</Text>
                    )}

                    {meal.allergens && (
                      <Text style={styles.sectionBodyText}>
                        Allergens:{' '}
                        {[meal.allergens.dairy ? 'Dairy' : null,
                          meal.allergens.nuts ? 'Nuts' : null,
                          meal.allergens.gluten ? 'Gluten' : null]
                          .filter(Boolean)
                          .join(', ') || 'None'}
                      </Text>
                    )}

                    {meal.ingredients && (
                      <Text style={styles.sectionBodyText}>
                        Ingredients: {meal.ingredients}
                      </Text>
                    )}
                  </View>
                ))
              )}
    </View>

    {/* SYMPTOMS */}
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Logged Symptoms</Text>
        <TouchableOpacity
          onPress={() => router.push('/symptoms')}
          style={styles.plusButton}
        >
          <Text style={styles.plusText}>+</Text>
        </TouchableOpacity>
      </View>

      {symptomsForDay.length === 0 ? (
        <Text style={styles.sectionBodyText}>No symptoms logged for this day.</Text>
      ) : (
        symptomsForDay.map((entry, index) => (
          <View key={index} style={styles.symptomItem}>
            <Text style={styles.sectionBodyText}>
              Time:{' '}
              {new Date(entry.timestamp).toLocaleString([], {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Text>

            {/* Symptom description */}
            <Text style={styles.sectionBodyText}>
              {Array.isArray(entry.symptoms)
                ? entry.symptoms.join(', ')
                : entry.symptoms}
            </Text>

            {entry.notes && (
              <Text style={styles.sectionBodyText}>Notes: {entry.notes}</Text>
            )}
          </View>
        ))
      )}
    </View>

    {/* MOOD */}
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionHeaderText}>Mood & Severity</Text>
      </View>

      {symptomsForDay.length === 0 ? (
        <Text style={styles.sectionBodyText}>No mood or severity logged.</Text>
      ) : (
        symptomsForDay.map((entry, index) => (
          <View key={index} style={styles.symptomItem}>
            {entry.mood && (
              <Text style={styles.sectionBodyText}>
                Mood: {moodEmojiMap[entry.mood]} {entry.mood}
              </Text>
            )}
            {entry.severity !== undefined && (
              <Text style={styles.sectionBodyText}>
                Severity: {entry.severity}
              </Text>
            )}
          </View>
        ))
      )}
    </View>

  </View>
</ScrollView>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: { flex: 1, backgroundColor: '#BAC095' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingTop: 50,
    paddingBottom: 12,
  },

  headerText: {
    color: '#21221e',
    fontWeight: 'bold',
    paddingRight: 10
  },

  clearButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#3D4127',
    borderRadius: 8,
    marginTop: 10
  },

  clearButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14
  },

  details: {
    paddingHorizontal: 16,
    paddingTop: 8
  },

  detailsTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#3D4127',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8
  },

  detailsBox: {
    backgroundColor: 'rgba(99, 107, 47, 0.5)',
    borderRadius: 8,
    padding: 16
  },

  section: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 8
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: '#3D4127'
  },

  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3D4127',
    justifyContent: 'center',
    alignItems: 'center'
  },

  plusText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700'
  },

  emptyText: {
    color: '#3D4127',
    marginTop: 8,
    fontStyle: 'italic'
  },

  symptomItem: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
    marginTop: 8
  },

  symptomText: {
    color: '#3D4127',
    fontWeight: '600',
    fontSize: 15
  },

  notesText: {
    color: '#3D4127',
    marginTop: 4,
    fontSize: 14
  },

  sectionHeaderText: {
  fontSize: 20,
  fontWeight: "700",
  color: "#3D4127",
},

sectionBodyText: {
  fontSize: 18,
  color: "#3D4127",
  marginTop: 4,
},
});