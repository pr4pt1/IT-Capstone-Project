import {Text, TextInput, StyleSheet, Alert, ScrollView, Pressable, ImageBackground, Image,} 
from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "@/firebaseConfig";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function CreateAccountScreen() {
  const router = useRouter();

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const validateAndSubmit = async () => {
    if (
      !name ||
      !age ||
      !email ||
      !username ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Missing Information", "Please fill out all fields.");
      return;
    }

    if (isNaN(Number(age)) || parseInt(age) <= 0) {
      Alert.alert("Invalid Age", "Age must be a positive number.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Password Error", "Passwords do not match.");
      return;
    }

    try {
      // 1. Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // 2. Set display name
      await updateProfile(user, {
        displayName: username,
      });

      // 3. Save extra data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name,
        age: Number(age),
        email,
        username,
        createdAt: new Date().toISOString(),
      });

      Alert.alert("Success", "Account created successfully!");

      router.replace("/LoginPage");
    } catch (error: any) {
      console.log(error.code);

      if (error.code === "auth/email-already-in-use") {
        Alert.alert("Error", "Email already in use.");
      } else if (error.code === "auth/weak-password") {
        Alert.alert("Error", "Password must be at least 6 characters.");
      } else {
        Alert.alert("Error", "Something went wrong.");
      }
    }
  };

  return (
    <ImageBackground
      source={require("@/assets/images/bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <ThemedView style={styles.container}>
          <ThemedText type="title">Create Your Account</ThemedText>

          <Image
            source={require("@/assets/images/ourlogo.png")}
            style={styles.logo}
            resizeMode="contain"
          />

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

          <Pressable style={styles.button} onPress={validateAndSubmit}>
            <Text style={styles.buttonText}>Create Account</Text>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "transparent",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 12,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#636B2F",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  logo: {
    width: 240,
    height: 240,
  },
});

