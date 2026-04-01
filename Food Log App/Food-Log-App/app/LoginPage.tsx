import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  Pressable,
  ImageBackground,
  Image,
} from "react-native";

import { useRouter } from "expo-router";
import { useState } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebaseConfig";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";

export default function WelcomePage() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validateAndSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Empty field", "Please enter email and password.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid email", "Please enter a valid email address.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);

      router.replace("/HomePage");
    } catch (error: any) {
      console.log(error.code);

      if (error.code === "auth/user-not-found") {
        Alert.alert("Login Failed", "No account found with this email.");
      } else if (error.code === "auth/wrong-password") {
        Alert.alert("Login Failed", "Incorrect password.");
      } else if (error.code === "auth/invalid-credential") {
        Alert.alert("Login Failed", "Invalid email or password.");
      } else {
        Alert.alert("Login Failed", "Something went wrong.");
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
          <ThemedText type="title">Log in now or sign up!</ThemedText>

          <Image
            source={require("@/assets/images/ourlogo.png")}
            style={styles.logo}
            resizeMode="contain"
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
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Pressable style={styles.button} onPress={validateAndSubmit}>
            <Text style={styles.buttonText}>Log In</Text>
          </Pressable>

          <Pressable
            style={styles.button}
            onPress={() => router.push("/Account Creation")}
          >
            <Text style={styles.buttonText}>
              New? Create an account and sign up here!
            </Text>
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