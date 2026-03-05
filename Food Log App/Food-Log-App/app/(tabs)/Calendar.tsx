import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const moodEmojiMap: Record<string, string> = {
  happy: "😊",
  neutral: "😐",
  uneasy: "😕",
  painful: "🤢",
  severe: "😖",
};

type SymptomEntry = {
  date: string;
  symptoms: string | string[];   // ← allows string OR array
  notes?: string;
  meal?: string;
  mood?: string;
  severity?: number;
  timestamp?: string; 
};

function DetailSection({ title }: { title: string }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <View style={styles.section}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.sectionHeader}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionToggle}>{expanded ? '-' : '+'}</Text>
      </TouchableOpacity>
      {expanded && <Text style={styles.sectionBody}>Details go here...</Text>}
    </View>
  );
}

export default function CalendarScreen() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
);

  // All saved symptoms (typed)
  const [allSymptoms, setAllSymptoms] = useState<SymptomEntry[]>([]);

  console.log("ALL SYMPTOMS:", allSymptoms);
  console.log("SELECTED DATE:", selectedDate);

  // Symptoms for the selected date (typed)
  const [symptomsForDay, setSymptomsForDay] = useState<SymptomEntry[]>([]);

  // Load symptoms from storage
useEffect(() => {
    const loadSymptoms = async () => {
      const stored = await AsyncStorage.getItem('symptomEntries');
      if (stored) {
        setAllSymptoms(JSON.parse(stored));
      }
    };

    loadSymptoms();
  }, []);

  // Filter symptoms when date changes
  useEffect(() => {
    const filtered = allSymptoms.filter(
      (entry) => entry.date === selectedDate
    );
    setSymptomsForDay(filtered);
  }, [selectedDate, allSymptoms]);

  return (
    <ImageBackground
          source={require('@/assets/images/bg.png')}
          style={styles.background}
          resizeMode="contain"
        >
    <View style={styles.container}>
      {/* Page Title */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Calendar History</Text>
      </View>

      {/* Calendar */}
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
          textDayFontWeight: '500',
          textMonthFontWeight: '700',
          textDayHeaderFontWeight: '600',
        }}
      />

      {/* Title above the box */}
      <Text style={styles.detailsTitle}>Selected Date Details</Text>

      {/* Details box */}
      <ScrollView style={styles.details}>
        <View style={styles.detailsBox}>
          <DetailSection title="Meal Name" />
          <DetailSection title="Ingredients" />
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Logged Symptoms</Text>

              {/* + Button */}
              <TouchableOpacity
                onPress={() => router.push('/symptoms')}
                style={styles.plusButton}
              >
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            </View>

            {/* Symptoms List */}
              {symptomsForDay.length === 0 ? (
                <Text style={styles.emptyText}>
                  No symptoms logged for this day.
                </Text>
              ) : (
                symptomsForDay.map((entry, index) => (
                  <View key={index} style={styles.symptomItem}>
                    <Text style={styles.symptomText}>
                      {Array.isArray(entry.symptoms)
                        ? entry.symptoms.join(', ')
                        : entry.symptoms}
                    </Text>

                    {entry.notes ? (
                      <Text style={styles.notesText}>
                        Notes: {entry.notes}
                      </Text>
                    ) : null}
                  </View>
                ))
              )}
          </View>

            {/* Mood & Severity */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Mood & Severity</Text>
              </View>

              {symptomsForDay.length === 0 ? (
                <Text style={styles.emptyText}>
                  No mood or severity logged.
                </Text>
              ) : (
                symptomsForDay.map((entry, index) => (
                  <View key={index} style={styles.symptomItem}>
                    {/* Mood */}
                    {entry.mood ? (
                      <Text style={styles.symptomText}>
                        Mood: {moodEmojiMap[entry.mood]} {entry.mood}
                      </Text>
                    ) : null}

                    {/* Severity */}
                    {entry.severity !== undefined ? (
                      <Text style={styles.symptomText}>
                        Severity: {entry.severity}
                      </Text>
                    ) : null}
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
  background: {
    flex: 1,
  },

  container: { flex: 1, backgroundColor: '#BAC095' }, //for gradient change value to 'transparent'

  header: {
    padding: 25,
    alignItems: 'center',
  },
  headerText: {
    color: '#3D4127',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 30,
  },

  details: { paddingHorizontal: 16, paddingTop: 8 },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D4127',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 8,
  },

  detailsBox: {
    backgroundColor: 'rgba(99, 107, 47, 0.5)', // 636B2F with 50% opacity
    borderRadius: 8,
    padding: 16,
  },

  section: { borderTopWidth: 1, borderTopColor: '#ccc', paddingVertical: 8 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: { fontSize: 15, fontWeight: '500', color: '#3D4127' },
  sectionToggle: { fontSize: 18, color: '#3D4127' },
  sectionBody: { marginTop: 8, color: '#3D4127' },

  plusButton: {
    width: 36,
    height: 36,
    borderRadius: 18, // perfect circle
    backgroundColor: '#3D4127', // dark green
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },

  plusText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
    marginTop: -2,
  },

  emptyText: {
    color: '#3D4127',
    marginTop: 8,
    fontStyle: 'italic',
  },

  symptomItem: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
  },

  symptomText: {
    color: '#3D4127',
    fontWeight: '600',
    fontSize: 15,
  },

  notesText: {
    color: '#3D4127',
    marginTop: 4,
    fontSize: 14,
  },
});