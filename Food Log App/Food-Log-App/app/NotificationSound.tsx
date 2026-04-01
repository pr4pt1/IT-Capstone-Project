import { useState } from "react";
import { Text, StyleSheet, Pressable, Alert, ScrollView, View, ImageBackground } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import Slider from '@react-native-community/slider';

type ToneKeys = 'Breeze' | 'Ripple' | 'Chime' | 'Bloom';

export default function NotificationSound() {
  const router = useRouter();
  const [volume, setVolume] = useState(0.5);
  const [selectedTone, setSelectedTone] = useState<ToneKeys>('Breeze');
  const [vibration, setVibration] = useState(false);

  const handleSave = () => {
    Alert.alert(
      "Success", 
      "Settings saved.", 
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            
            {/* Title */}
            <Text style={styles.title}>Notification Sound</Text>

            {/* Sound Section */}
            <Text style={styles.label}>Sound</Text>
            <View style={styles.card}>
              <View style={styles.row}>
                <Text style={styles.volumeLabel}>Volume</Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={1}
                  value={volume}
                  onValueChange={setVolume}
                  minimumTrackTintColor="#636B2F"
                  maximumTrackTintColor="#3D4127"
                  thumbTintColor="#2b2c2aff"
                />
              </View>
            </View>

            {/* Select Tone Section */}
            <Text style={styles.label}>Select Tone</Text>
            <View style={styles.toneGrid}>
              <View style={styles.row2}>
                <Pressable
                  style={[
                    styles.option,
                    styles.optionLeft,
                    selectedTone === 'Breeze' && styles.selected
                  ]}
                  onPress={() => setSelectedTone('Breeze')}
                >
                  <Text style={[
                    styles.optionText,
                    selectedTone === 'Breeze' && styles.optionTextSelected
                  ]}>Breeze</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.option,
                    styles.optionRight,
                    selectedTone === 'Ripple' && styles.selected
                  ]}
                  onPress={() => setSelectedTone('Ripple')}
                >
                  <Text style={[
                    styles.optionText,
                    selectedTone === 'Ripple' && styles.optionTextSelected
                  ]}>Ripple</Text>
                </Pressable>
              </View>
              <View style={styles.row2}>
                <Pressable
                  style={[
                    styles.option,
                    styles.optionLeft,
                    selectedTone === 'Chime' && styles.selected
                  ]}
                  onPress={() => setSelectedTone('Chime')}
                >
                  <Text style={[
                    styles.optionText,
                    selectedTone === 'Chime' && styles.optionTextSelected
                  ]}>Chime</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.option,
                    styles.optionRight,
                    selectedTone === 'Bloom' && styles.selected
                  ]}
                  onPress={() => setSelectedTone('Bloom')}
                >
                  <Text style={[
                    styles.optionText,
                    selectedTone === 'Bloom' && styles.optionTextSelected
                  ]}>Bloom</Text>
                </Pressable>
              </View>
            </View>

            {/* Vibration Section */}
            <Text style={styles.label}>Vibration</Text>
            <Pressable
              onPress={() => setVibration(!vibration)}
              style={[
                styles.option,
                styles.fullWidthOption,
                vibration && styles.selected
              ]}
            >
              <Text style={[
                styles.optionText,
                vibration && styles.optionTextSelected
              ]}>
                {vibration ? 'ON' : 'OFF'}
              </Text>
            </Pressable>

            {/* Buttons */}
            <View style={styles.buttonRow}>
              <Pressable style={styles.cancelButton} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 30,
    color: '#3D4127',
  },
  label: {
    color: '#3D4127',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 15,
  },
  card: {
    backgroundColor: '#ffffffaa',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#3D4127',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  volumeLabel: {
    fontSize: 16,
    color: '#3D4127',
    minWidth: 60,
    marginRight: 15,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  toneGrid: {
    marginBottom: 12,
  },
  option: {
    backgroundColor: '#ffffffaa',
    padding: 18,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3D4127',
  },
  optionLeft: {
    width: '48%',
  },
  optionRight: {
    width: '48%',
  },
  fullWidthOption: {
    width: '100%',
    marginBottom: 12,
  },
  selected: {
    backgroundColor: '#636B2F',
    borderColor: '#636B2F',
  },
  optionText: {
    fontSize: 16,
    color: '#3D4127',
    fontWeight: '500',
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 30,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: '#ffffffaa',
    borderWidth: 1,
    borderColor: '#2b2c2aff',
    marginRight: 15,
  },
  saveButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    backgroundColor: '#2b2c2aff',
  },
  cancelText: {
    color: '#2b2c2aff',
    fontSize: 16,
    fontWeight: '600',
  },
  saveText: {
    color: '#b8ff7eff',
    fontSize: 16,
    fontWeight: '600',
  },
});
