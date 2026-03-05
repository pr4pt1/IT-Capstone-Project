import { useState } from "react";
import { Text, StyleSheet, Pressable, Alert, ScrollView, View, ImageBackground } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";

type PreviewOption = 'Always' | 'When Unlocked' | 'Never';

export default function NotificationPreview() {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<PreviewOption>('When Unlocked');

  const handleSave = () => {
    Alert.alert(
      "Success", 
      "Preview settings saved.", 
      [{ text: "OK", onPress: () => router.replace("/Notifications") }]
    );
  };

  const handleCancel = () => {
    router.replace("/Notifications");
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
            <Text style={styles.title}>Notification Preview</Text>

            {/* Show message previews section */}
            <Text style={styles.label}>Show message previews.</Text>
            
            {/* Options */}
            <View style={styles.optionsContainer}>
              <Pressable
                style={styles.optionRow}
                onPress={() => setSelectedOption('Always')}
              >
                <Text style={styles.optionText}>Always</Text>
                <View style={[styles.radio, selectedOption === 'Always' && styles.radioSelected]}>
                  {selectedOption === 'Always' && <View style={styles.radioInner} />}
                </View>
              </Pressable>

              <Pressable
                style={styles.optionRow}
                onPress={() => setSelectedOption('When Unlocked')}
              >
                <Text style={styles.optionText}>When Unlocked</Text>
                <View style={[styles.radio, selectedOption === 'When Unlocked' && styles.radioSelected]}>
                  {selectedOption === 'When Unlocked' && <View style={styles.radioInner} />}
                </View>
              </Pressable>

              <Pressable
                style={styles.optionRow}
                onPress={() => setSelectedOption('Never')}
              >
                <Text style={styles.optionText}>Never</Text>
                <View style={[styles.radio, selectedOption === 'Never' && styles.radioSelected]}>
                  {selectedOption === 'Never' && <View style={styles.radioInner} />}
                </View>
              </Pressable>
            </View>

            {/* Notification Preview Box */}
            <View style={styles.previewBox}>
              <Text style={styles.previewTitle}>Food Log Reminder</Text>
              <View style={styles.previewDivider} />
              <Text style={styles.previewMessage}>
                {selectedOption === 'Always' ? "Don't forget to log your lunch today!" : 
                 selectedOption === 'When Unlocked' ? "🔒 Message hidden until device is unlocked" : 
                 "Preview disabled"}
              </Text>
            </View>

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
    marginBottom: 15,
  },
  optionsContainer: {
    backgroundColor: '#ffffffaa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D4127',
    marginBottom: 20,
    padding: 5,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#3D4127',
  },
  optionText: {
    fontSize: 16,
    color: '#3D4127',
    fontWeight: '500',
  },
  radio: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#3D4127',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioSelected: {
    borderColor: '#636B2F',
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#636B2F',
  },
  previewBox: {
    backgroundColor: '#ffffffaa',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D4127',
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D4127',
    marginBottom: 10,
  },
  previewDivider: {
    width: '100%',
    height: 1,
    backgroundColor: '#3D4127',
    marginBottom: 15,
  },
  previewMessage: {
    fontSize: 16,
    color: '#3D4127',
    fontStyle: 'italic',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
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
