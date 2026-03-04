import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet, Text } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Settings() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>

      {/* Title */}
      <Text style={styles.title}>Settings</Text>

      {/* Personal Info Button */}
      <Pressable
        style={styles.row}
        onPress={() => navigation.navigate("Personal Information")}
      >
        <Text style={styles.rowText}>Personal Information</Text>
      </Pressable>

      {/* Notification Button */}
      <Pressable
        style={styles.row}
        onPress={() => navigation.navigate("Notifications")}
      >
        <Text style={styles.rowText}>Notifications</Text>
      </Pressable>

      {/* Text Size Button */}
      <Pressable
        style={styles.row}
        onPress={() => navigation.navigate("Text Size")}
      >
        <Text style={styles.rowText}>Personal Information</Text>
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
    marginBottom: 20,
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