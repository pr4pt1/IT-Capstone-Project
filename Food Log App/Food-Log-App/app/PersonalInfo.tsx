import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";

export default function PersonalInfo() {
    //User info
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    //Save user info
    const handleSave = () => {
        console.log("The following has been saved:", { name, age, phone, email });
        alert("Your info has been saved.");
    };

    return (
        <SafeAreaView style={styles.safe}>
            {/* Title */}
            <Text style={styles.title}>Personal Information</Text>

            {/* Name */}
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor={COLORS.accentLight}
                value={name}
                onChangeText={setName}
            />

            {/* Age */}
            <Text style={styles.label}>Age</Text>
            <TextInput
                style={styles.input}
                placeholder="Age"
                placeholderTextColor={COLORS.accentLight}
                value={age}
                onChangeText={setAge}
                keyboardType="numeric"
            />


            {/* Email */}
            <Text style={styles.label}>Email</Text>
            <TextInput
                placeholder="Email"
                placeholderTextColor={COLORS.accentLight}
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />

            {/* Save button */}
            <Pressable style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const COLORS = {
    bgDark: "#0B0B0B",
    chip: "#2E3326",
    accentLight: "#D9E8B4",
    inkLight: "#EAEFDD",
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: COLORS.bgDark, padding: 20 },

    title: {
        color: COLORS.inkLight,
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 12,
    },

    label: {
        color: COLORS.inkLight,
        marginBottom: 6,
        marginTop: 10,
        fontSize: 14,
    },

    input: {
        backgroundColor: COLORS.accentLight,
        marginTop: 24,
        padding: 14,
        borderRadius: 14,
        alignItems: "center",
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
        fontSize: 16,
    },
});