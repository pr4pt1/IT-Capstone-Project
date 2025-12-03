import { Text, TextInput, StyleSheet, Alert, ScrollView, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useEffect } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function WelcomePage() {
const router = useRouter();

//Log In State
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const validateAndSubmit = () => {

//Test account
const testAcc = {
  email: "test@fake.com",
  password: "test1"
}

//Check for empty fields
    if (!email || !password) {
      Alert.alert("Empty field", "Please enter text in all fields.");
      return;
    }

//Check for valid email
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

//Email does not exist
if (email !== testAcc.email) {
  Alert.alert("Cannot find email", "This email does not exist. Please try again.")
  return;
}

//Check for valid password
    if (password !== testAcc.password) {
      Alert.alert("Invalid password", "Wrong password, please try again.");
      return;
    }


//Log In Works Correctly
router.replace('/Home Page');
};

useEffect(() => {

  }, []);

  return (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
   <ThemedView style={styles.container}>
    <ThemedText type="title">Log in now or sign up!</ThemedText>
    <ThemedText type="title">logo will go here</ThemedText>

    {/* Input fields */}
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        {/* Log In Button */}
        <Pressable
          style={styles.button}
          onPress={validateAndSubmit}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </Pressable>

        {/* New Account Button */}
        <Pressable
          style={styles.button}
          onPress={() => router.push('/Account Creation')}
        >
          <Text style={styles.buttonText}>New? Create an account and sign up here!</Text>
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
