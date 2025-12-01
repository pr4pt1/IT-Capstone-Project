import { Text, TextInput, StyleSheet, Alert, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function CreateAccountScreen() {
  const router = useRouter();

  // Form state
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const validateAndSubmit = () => {
    // Check for empty fields
    if (!name || !age || !email || !username || !password || !confirmPassword) {
      Alert.alert("Missing Information", "Please fill out all fields.");
      return;
    }

    // Age must be numeric
    if (isNaN(age) || parseInt(age) <= 0) {
      Alert.alert("Invalid Age", "Age must be a positive number.");
      return;
    }

    // Basic email format check
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    // Password match
    if (password !== confirmPassword) {
      Alert.alert("Password Error", "Passwords do not match.");
      return;
    }

    // If everything is valid:
    if(Platform.OS === 'web')
    Alert.alert("Success!", "Your account has been created.");

    router.replace('/Login Page');
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <ThemedView style={styles.container}>

        <ThemedText type="title">Create Your Account</ThemedText>
        <ThemedText type="title">logo will go here</ThemedText>

        {/* Input fields */}
        <TextInput 
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <TextInput 
          placeholder="Age"
          keyboardType="numeric"
          value={age}
          onChangeText={setAge}
          style={styles.input}
        />

        <TextInput 
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput 
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />

        <TextInput 
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TextInput 
          placeholder="Retype Password"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          style={styles.input}
        />

        {/* Create Account Button */}
        <Pressable 
          style={styles.button}
          onPress={validateAndSubmit}
        >
          <Text style={styles.buttonText}>Create Account</Text>
        </Pressable>

      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  input: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: '#fff'
  },

  button: {
    marginTop: 20,
    backgroundColor: '#2b2c2aff',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#b8ff7eff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


