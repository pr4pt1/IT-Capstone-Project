import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useState } from 'react';

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
  const [selectedDate, setSelectedDate] = useState('2025-12-1');

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
          <DetailSection title="Logged Symptoms" />
          <DetailSection title="Mood & Severity" />
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
});