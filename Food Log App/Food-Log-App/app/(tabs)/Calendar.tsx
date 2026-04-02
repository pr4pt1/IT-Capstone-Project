import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Alert
} from 'react-native';

import { Calendar } from 'react-native-calendars';
import { useState, useEffect, useContext } from 'react';
import { router } from 'expo-router';
import { FontSizeContext } from "@/components/FontSize";

import { auth, db } from "@/firebaseConfig";
import {
  collection,
  onSnapshot,
  getDocs,
  deleteDoc,
  doc
} from "firebase/firestore";

const moodEmojiMap: Record<string, string> = {
  happy: "😊",
  neutral: "😐",
  uneasy: "😕",
  painful: "🤢",
  severe: "😖",
};

/* =========================
   TYPES
========================= */
type SymptomEntry = {
  timestamp: string;
  symptoms: string | string[];
  notes?: string;
  mood?: string;
  severity?: number;
};

type MealEntry = {
  timestamp: string;
  mealName: string;
  mealType?: string;

  ingredients?: string;
  calories?: string;

  protein?: string;
  carbs?: string;
  fat?: string;

  allergens?: {
    dairy?: boolean;
    nuts?: boolean;
    gluten?: boolean;
  };
};

export default function CalendarScreen() {
  const { fontSize } = useContext(FontSizeContext);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  const [symptomsForDay, setSymptomsForDay] = useState<SymptomEntry[]>([]);
  const [mealsForDay, setMealsForDay] = useState<MealEntry[]>([]);
  const [allLogs, setAllLogs] = useState<any>({});

  /* =========================
     FIREBASE LISTENER
  ========================= */
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const ref = collection(db, "users", user.uid, "logs");

    const unsub = onSnapshot(ref, (snapshot) => {
      const data: any = {};

      snapshot.forEach((docSnap) => {
        data[docSnap.id] = docSnap.data();
      });

      setAllLogs(data);
    });

    return () => unsub();
  }, []);

  /* =========================
     FILTER SELECTED DAY
  ========================= */
  useEffect(() => {
    const dayData = allLogs?.[selectedDate] || {};

    setMealsForDay(dayData.meals || []);
    setSymptomsForDay(dayData.symptoms || []);
  }, [selectedDate, allLogs]);

  /* =========================
     CLEAR DATA
  ========================= */
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
              const user = auth.currentUser;
              if (!user) return;

              const ref = collection(db, "users", user.uid, "logs");
              const snapshot = await getDocs(ref);

              const deletes = snapshot.docs.map((d) =>
                deleteDoc(doc(db, "users", user.uid, "logs", d.id))
              );

              await Promise.all(deletes);

              setAllLogs({});
              setMealsForDay([]);
              setSymptomsForDay([]);

              Alert.alert("Cleared", "Calendar data cleared!");
            } catch (error) {
              console.error(error);
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
          <Text style={[styles.headerText, { fontSize: fontSize + 8 }]}>
            Calendar History
          </Text>

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

            {/* ================= MEALS ================= */}
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
                <Text style={styles.sectionBodyText}>
                  No meals logged for this day.
                </Text>
              ) : (
                mealsForDay
                  .slice()
                  .sort((a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
                  )
                  .map((meal, index) => (
                    <View key={index} style={styles.symptomItem}>

                      <Text style={styles.sectionBodyText}>
                        🍽 {meal.mealName}
                      </Text>

                      {meal.timestamp && (
                        <Text style={styles.sectionBodyText}>
                          🕒 {new Date(meal.timestamp).toLocaleString()}
                        </Text>
                      )}

                      {meal.mealType && (
                        <Text style={styles.sectionBodyText}>
                          Type: {meal.mealType}
                        </Text>
                      )}

                      {meal.ingredients && (
                        <Text style={styles.sectionBodyText}>
                          Ingredients: {meal.ingredients}
                        </Text>
                      )}

                      {(meal.calories ||
                        meal.protein ||
                        meal.carbs ||
                        meal.fat) && (
                        <Text style={styles.sectionBodyText}>
                          Nutrition:
                        </Text>
                      )}

                      {meal.calories && (
                        <Text style={styles.sectionBodyText}>
                          Calories: {meal.calories}
                        </Text>
                      )}

                      {meal.protein && (
                        <Text style={styles.sectionBodyText}>
                          Protein: {meal.protein}
                        </Text>
                      )}

                      {meal.carbs && (
                        <Text style={styles.sectionBodyText}>
                          Carbs: {meal.carbs}
                        </Text>
                      )}

                      {meal.fat && (
                        <Text style={styles.sectionBodyText}>
                          Fat: {meal.fat}
                        </Text>
                      )}

                      {meal.allergens && (
                        <Text style={styles.sectionBodyText}>
                          Allergens:{" "}
                          {[
                            meal.allergens.dairy ? "Dairy" : null,
                            meal.allergens.nuts ? "Nuts" : null,
                            meal.allergens.gluten ? "Gluten" : null,
                          ]
                            .filter(Boolean)
                            .join(", ") || "None"}
                        </Text>
                      )}
                    </View>
                  ))
              )}
            </View>

            {/* ================= SYMPTOMS ================= */}
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
                <Text style={styles.sectionBodyText}>
                  No symptoms logged for this day.
                </Text>
              ) : (
                symptomsForDay
                  .slice()
                  .sort((a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
                  )
                  .map((entry, index) => (
                    <View key={index} style={styles.symptomItem}>

                      {/* SYMPTOMS */}
                      <Text style={styles.sectionBodyText}>
                        {Array.isArray(entry.symptoms)
                          ? entry.symptoms.join(", ")
                          : entry.symptoms}
                      </Text>

                      {/* TIMESTAMP (NEW — MATCHES MEALS STYLE) */}
                      {entry.timestamp && (
                        <Text style={styles.sectionBodyText}>
                          🕒 {new Date(entry.timestamp).toLocaleString()}
                        </Text>
                      )}

                      {/* NOTES (FIXED + VISIBLE) */}
                      {entry.notes && (
                        <Text style={styles.sectionBodyText}>
                          Notes: {entry.notes}
                        </Text>
                      )}

                    </View>
                  ))
              )}
            </View>

            {/* ================= MOOD ================= */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionHeaderText}>
                  Mood & Severity
                </Text>
              </View>

              {symptomsForDay.length === 0 ? (
                <Text style={styles.sectionBodyText}>
                  No mood or severity logged.
                </Text>
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

/* =========================
   STYLES (UNCHANGED)
========================= */
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
  sectionHeaderText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#3D4127",
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
  symptomItem: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
    marginTop: 8
  },
  sectionBodyText: {
    fontSize: 18,
    color: "#3D4127",
    marginTop: 4,
  },
});