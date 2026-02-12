import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Slider from '@react-native-community/slider';
import { Dropdown } from 'react-native-element-dropdown';

export default function SymptomsScreen() {
  const [meal, setMeal] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [mood, setMood] = useState('');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');

  const mealOptions = [
    { label: 'Breakfast', value: 'breakfast' },
    { label: 'Lunch', value: 'lunch' },
    { label: 'Dinner', value: 'dinner' },
    { label: 'Snack', value: 'snack' },
  ];

  const moods = [
    { label: '😊', value: 'happy', text: 'Happy' },
    { label: '😐', value: 'neutral', text: 'Neutral' },
    { label: '😕', value: 'uneasy', text: 'Uneasy' },
    { label: '🤢', value: 'painful', text: 'Painful' },
    { label: '😖', value: 'severe', text: 'Severe' },
  ];

  const handleSave = () => {
    const entry = {
      meal,
      symptoms,
      mood,
      severity,
      notes,
      timestamp: new Date().toISOString(),
    };

    console.log("Saved Symptoms Entry:", entry);

    // TODO: send to backend or local storage
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Log Symptoms</Text>

      {/* Select Meal */}
      <Text style={styles.label}>Select Meal</Text>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
        data={mealOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Meal"
        value={meal}
        onChange={(item) => setMeal(item.value)}
      />

      {/* Describe Symptoms */}
      <Text style={styles.label}>Describe Symptoms</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Stomach pain, bloating"
        placeholderTextColor="#3D4127"
        value={symptoms}
        onChangeText={setSymptoms}
      />

      {/* Mood After Eating */}
      <Text style={styles.label}>Mood After Eating</Text>
      <View style={styles.moodRow}>
        {moods.map((m) => (
          <TouchableOpacity
            key={m.value}
            style={[styles.moodButton, mood === m.value && styles.moodSelected]}
            onPress={() => setMood(m.value)}
          >
            <Text style={styles.moodEmoji}>{m.label}</Text>
            <Text style={styles.moodLabel}>{m.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Severity Slider */}
      <Text style={styles.label}>Symptoms Severity</Text>
      <View style={styles.sliderRow}>
        <Text style={styles.sliderLabel}>1</Text>
        <Slider
          style={{ flex: 1 }}
          minimumValue={1}
          maximumValue={10}
          step={1}
          value={severity}
          minimumTrackTintColor="#636B2F"
          maximumTrackTintColor="#3D4127"
          thumbTintColor="#636B2F"
          onValueChange={setSeverity}
        />
        <Text style={styles.sliderLabel}>10</Text>
      </View>
      <Text style={styles.severityValue}>Severity: {severity}</Text>

      {/* Additional Notes */}
      <Text style={styles.label}>Additional Notes</Text>
      <TextInput
        style={styles.notesInput}
        placeholder="Anything else to add?"
        placeholderTextColor="#3D4127"
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      {/* Save Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Symptoms</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BAC095',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#3D4127',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#3D4127',
    marginTop: 15,
  },

  dropdown: {
    backgroundColor: '#DDE3C2',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginTop: 8,
    height: 50,
    justifyContent: 'center',
  },

  dropdownContainer: {
    backgroundColor: '#DDE3C2',   // dropdown menu background
    borderRadius: 10,
    paddingVertical: 4,
  },

  itemTextStyle: {
    color: '#3D4127',             // dark green text inside menu
    fontSize: 16,
  },

  placeholderStyle: {
    color: '#3D4127',
    fontSize: 16,
  },

  selectedTextStyle: {
    color: '#3D4127',
    fontSize: 16,
  },

  input: {
    backgroundColor: '#DDE3C2',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    color: '#3D4127',
  },

  notesInput: {
    backgroundColor: '#DDE3C2',
    borderRadius: 10,
    padding: 12,
    marginTop: 8,
    height: 90,
    color: '#3D4127',
  },

  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sliderLabel: {
    color: '#3D4127',
    fontWeight: '600',
    marginHorizontal: 5,
  },
  severityValue: {
    textAlign: 'center',
    color: '#3D4127',
    marginTop: 5,
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#636B2F',
    padding: 15,
    borderRadius: 10,
    marginTop: 25,
  },
  saveButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
  },

  moodButton: {
    width: 60,
    height: 70,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#3D4127',
    backgroundColor: '#DDE3C2',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },

  moodSelected: {
    backgroundColor: '#636B2F',
    borderColor: '#636B2F',
  },

  moodEmoji: {
    fontSize: 28,
  },

  moodLabel: {
    fontSize: 10,
    marginTop: 4,
    color: '#3D4127',
    textAlign: 'center',
  },
});