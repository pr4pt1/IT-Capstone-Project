import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from "react";
import { Text } from "react-native";
import { TextInput } from "react-native";
import { StyleSheet } from "react-native";
import { Pressable } from "react-native";
import { Alert } from "react-native";
import { useContext } from "react";
import { FontSizeContext } from "../components/FontSize";
import { Switch } from "react-native";
import { View } from "react-native";

export default function PriAndSec() {

    const { fontSize } = useContext(FontSizeContext);

    const [isOn, setIsOn] = useState(false);

    const toggleSwitch = (newValue) => {
        if (newValue === true) {
            Alert.alert("Share Data", "Would you like to share your in-app data to help improve the app?",
                [
                    {
                        text: "No",
                        onPress: () => setIsOn(false),
                        style: "cancel",
                    },
                    {
                        text: "Yes",
                        onPress: () => setIsOn(true),
                    },
                ]
            );
        } else {
            setIsOn(false);
        }
    };

    return (
        <SafeAreaView style={styles.safe}>
            <View style={styles.card}>
                <Text style={[styles.title, { fontSize }]}>Share Your Data</Text>
                <Text style={[styles.description, { fontSize: fontSize - 2 }]}>Help us improve!</Text>
                <Switch
                    value={isOn}
                    onValueChange={toggleSwitch}
                    trackColor={{ false: "#444", true: "#D9E8B4" }}
                    thumbColor={isOn ? "#0B0B0B" : "#ccc"}
                />
            </View>
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

        card:
        {
            backgroundColor: "#2E3326",
            padding: 20,
            borderRadius: 20,
        },

        description:
        {
            color: "#D9E8B4",
            marginBottom: 20,
        },
    });