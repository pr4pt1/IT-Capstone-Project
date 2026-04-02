import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useContext } from "react";
import { Text, TextInput, StyleSheet, Pressable, Alert, ImageBackground } from "react-native";
import { FontSizeContext } from "../components/FontSize";

import { auth, db } from "@/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function PersonalInfo() {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");

    const { fontSize } = useContext(FontSizeContext);

    useEffect(() => {
        const loadUserData = async () => {
            const user = auth.currentUser;

            if (!user) return;

            try {
                const userRef = doc(db, "users", user.uid);
                const userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    const data = userSnap.data();

                    setName(data.name ?? "");
                    setAge(data.age ? String(data.age) : "");
                    setEmail(data.email ?? "");
                }
            } catch (error) {
                console.log("Error loading user data:", error);
            }
        };

        loadUserData();
    }, []);

    // =========================
    // SAVE UPDATED DATA
    // =========================
    const handleSave = async () => {
        if (!email.trim() || !name.trim() || !age.trim()) {
            Alert.alert("Empty field", "Please enter text in all fields.");
            return;
        }

        const ageNum = Number(age);
        if (isNaN(ageNum) || ageNum <= 0) {
            Alert.alert("Invalid field", "Please enter a valid age.");
            return;
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid email", "Please enter a valid email address.");
            return;
        }

        const user = auth.currentUser;
        if (!user) {
            Alert.alert("Error", "No user logged in.");
            return;
        }

        try {
            await setDoc(
                doc(db, "users", user.uid),
                {
                    name,
                    age: ageNum,
                    email,
                    updatedAt: new Date().toISOString(),
                },
                { merge: true } // IMPORTANT: prevents overwriting other fields like username
            );

            Alert.alert("Success", "Your info has been updated.");
        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Could not save data.");
        }
    };

    return (
        <ImageBackground
            source={require('@/assets/images/bg.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safe}>
                <Text style={[styles.title, { fontSize: fontSize + 8 }]}>
                    Personal Information
                </Text>

                <Text style={[styles.label, { fontSize }]}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    placeholderTextColor={COLORS.accentLight}
                    value={name}
                    onChangeText={setName}
                />

                <Text style={[styles.label, { fontSize }]}>Age</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Age"
                    placeholderTextColor={COLORS.accentLight}
                    value={age}
                    onChangeText={setAge}
                    keyboardType="numeric"
                />

                <Text style={[styles.label, { fontSize }]}>Email</Text>
                <TextInput
                    placeholder="Email"
                    placeholderTextColor={COLORS.accentLight}
                    value={email}
                    onChangeText={setEmail}
                    style={styles.input}
                    keyboardType="email-address"
                />

                <Pressable style={styles.button} onPress={handleSave}>
                    <Text style={[styles.buttonText, { fontSize }]}>Save</Text>
                </Pressable>
            </SafeAreaView>
        </ImageBackground>
    );
}

const COLORS = {
    bgDark: "#0B0B0B",
    chip: "#2E3326",
    accentLight: "#D9E8B4",
    inkLight: "#EAEFDD",
};

const styles = StyleSheet.create({
    background: { flex: 1 },
    safe: { flex: 1, backgroundColor: "transparent", padding: 20 },

    title: {
        color: "#000000",
        fontWeight: "700",
        marginBottom: 12,
    },

    label: {
        color: "#254117",
        marginBottom: 6,
        marginTop: 10,
    },

    input: {
        backgroundColor: COLORS.accentLight,
        padding: 14,
        borderRadius: 14,
        marginBottom: 12,
    },

    button: {
        backgroundColor: COLORS.accentLight,
        padding: 16,
        borderRadius: 16,
        alignItems: "center",
        marginTop: 20,
    },

    buttonText: {
        color: COLORS.bgDark,
        fontWeight: "700",
    },
});