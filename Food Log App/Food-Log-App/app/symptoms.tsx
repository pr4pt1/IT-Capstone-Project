import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, }
  from 'react-native';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';
import { FontSizeContext } from "../components/FontSize";

export default function SymptomsScreen() {
  const router = useRouter();
  const { fontSize } = useContext(FontSizeContext);

  const [symptoms, setSymptoms] = useState('');
  const [mood, setMood] = useState('');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');

  const moods = [
    { label: '😊', value: 'happy', text: 'Happy' },
    { label: '😐', value: 'neutral', text: 'Neutral' },
    { label: '😕', value: 'uneasy', text: 'Uneasy' },
    { label: '🤢', value: 'painful', text: 'Painful' },
    { label: '😖', value: 'severe', text: 'Severe' },
  ];

  const handleSave = () => {
    if (!symptoms.trim()) {
      Alert.alert('Missing Info', 'Please describe your symptoms.');
      return;
    }

    if (!mood) {
      Alert.alert('Missing Info', 'Please select a mood.');
      return;
    }

    const now = new Date();
    const dateKey = now.toISOString().split('T')[0];

    const entry = {
      symptoms: symptoms
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),

      mood,
      severity,
      notes: notes.trim(),

      timestamp: now.toISOString(),
      date: dateKey,
    };

    router.push({
      pathname: '/symptoms-confirmation-page',
      params: { data: JSON.stringify(entry) },
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { fontSize: fontSize + 8 }]}>
        Log Symptoms
      </Text>

      <Text style={[styles.label, { fontSize }]}>Describe Symptoms</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Stomach pain, bloating"
        value={symptoms}
        onChangeText={setSymptoms}
      />

      <Text style={[styles.label, { fontSize }]}>Mood</Text>
      <View style={styles.moodRow}>
        {moods.map((m) => (
          <TouchableOpacity
            key={m.value}
            style={[styles.moodButton, mood === m.value && styles.moodSelected]}
            onPress={() => setMood(m.value)}
          >
            <Text style={styles.emoji}>{m.label}</Text>
            <Text style={styles.moodText}>{m.text}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={[styles.label, { fontSize }]}>Severity</Text>
      <Slider
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={severity}
        onValueChange={setSeverity}
      />

      <Text style={[styles.label, { fontSize }]}>
        Severity: {severity}
      </Text>

      <Text style={[styles.label, { fontSize }]}>Notes</Text>
      <TextInput
        style={styles.input}
        value={notes}
        onChangeText={setNotes}
        multiline
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={{ color: '#fff' }}>Save Symptoms</Text>
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

  emoji: {
    fontSize: 16
  },

  moodText: {
    fontSize: 16
  },

  title: {
    fontWeight: '700',
    color: '#3D4127',
    textAlign: 'center',
    marginBottom: 20,
  },

  label: {
    fontWeight: '600',
    color: '#3D4127',
    marginTop: 15,
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

  moodLabel: {
    marginTop: 4,
    color: '#3D4127',
    textAlign: 'center',
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
  },
});