import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";
import { ImageBackground } from "react-native";
import { FontSizeContext } from "@/components/FontSize";
import { useContext } from "react";

import { signOut } from "firebase/auth";
import { auth } from "@/firebaseConfig";

export default function Settings() {
    const router = useRouter();
    const { fontSize } = useContext(FontSizeContext);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            router.replace("/LoginPage");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    return (
        <ImageBackground
            source={require('@/assets/images/bg.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.safe}>

                {/* Title */}
                <Text style={[styles.title, { fontSize }]}>Settings</Text>

                {/* Account Label */}
                <Text style={[styles.section, { fontSize }]}>Account</Text>

                <Pressable
                    style={styles.row}
                    onPress={() => router.push("/PersonalInfo")}
                >
                    <Text style={[styles.rowText, { fontSize }]}>
                        Personal Information
                    </Text>
                </Pressable>

                <Pressable
                    style={styles.row}
                    onPress={() => router.push("/PriAndSec")}
                >
                    <Text style={[styles.rowText, { fontSize }]}>
                        Privacy & Security
                    </Text>
                </Pressable>

                {/* Accessibility Label */}
                <Text style={[styles.section, { fontSize }]}>Accessibility</Text>

                <Pressable
                    style={styles.row}
                    onPress={() => router.push("/TextSize")}
                >
                    <Text style={[styles.rowText, { fontSize }]}>
                        Text Size
                    </Text>
                </Pressable>

                {/* Notifications Label */}
                <Text style={[styles.section, { fontSize }]}>Notifications</Text>

                <Pressable
                    style={styles.row}
                    onPress={() => router.push("/Notifications")}
                >
                    <Text style={[styles.rowText, { fontSize }]}>
                        Notifications
                    </Text>
                </Pressable>

                {/* ===================== */}
                {/* LOGOUT SECTION (BOTTOM) */}
                {/* ===================== */}

                <Text style={[styles.section, { fontSize, marginTop: 40 }]}>
                    Logout
                </Text>

                <Pressable
                    style={styles.row}
                    onPress={handleLogout}
                >
                    <Text style={[styles.rowText, { fontSize }]}>
                        Log Out
                    </Text>
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
    background: {
        flex: 1,
    },

    safe: {
        flex: 1,
        backgroundColor: "transparent",
        padding: 20
    },

    title: {
        color: "#000000",
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 20,
    },

    section: {
        color: "#254117",
        fontSize: 13,
        fontWeight: "700",
        marginTop: 22,
        marginBottom: 8,
        letterSpacing: 1,
    },

    row: {
        backgroundColor: COLORS.chip,
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 16,
        marginBottom: 12,

        shadowColor: "#000",
        shadowOpacity: 0.15,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },

        elevation: 3,
    },

    rowText: {
        color: COLORS.accentLight,
        fontWeight: "600",
        fontSize: 18,
    },
});
