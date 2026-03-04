import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Alert } from "react-native";
import { useContext } from "react";
import { FontSizeContext } from "../components/FontSize";

export default function TextSize() {
    // Font size options
    const { fontSize, setFontSize } = useContext(FontSizeContext);

    const [selectPick, setSelectedPick] = useState("Medium Text");

    return (
        <SafeAreaView style={styles.safe}>
            <Text style={[styles.title, { fontSize }]}>Text Size</Text>

            {["Small Text", "Medium Text", "Large Text"].map((size) => (
                <Pressable
                    key={size}
                    style={[
                        styles.option,
                        selectPick === size && styles.selected,
                    ]}
                    onPress={() => {
                        setSelectedPick(size);
                        if (size === "Small Text") setFontSize(14);
                        if (size === "Medium Text") setFontSize(18);
                        if (size === "Large Text") setFontSize(24);
                    }}
                >
                    <Text style={styles.optionText}>{size.toUpperCase()}</Text>
                </Pressable>
            ))}

        </SafeAreaView>
    );
}

// Font size, colors and weights
const styles = StyleSheet.create
    ({
        safe: { flex: 1, padding: 20, backgroundColor: "#0B0B0B" },

        title:
        {
            color: "#EAEFDD",
            fontWeight: "700",
            marginBottom: 20,
        },

        option:
        {
            backgroundColor: "#2E3326",
            padding: 18,
            borderRadius: 16,
            marginBottom: 12,
        },

        selected:
        {
            borderWidth: 2,
            borderColor: "#D9E8B4",
        },

        optionText:
        {
            color: "#D9E8B4",
            fontSize: 18,
            fontWeight: "600",
        },
    });