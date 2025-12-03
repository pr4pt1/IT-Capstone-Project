import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.list}>
        <Link href="notification" asChild>
          <Pressable style={styles.row}>
            <Text style={styles.rowText}>Notification Sound</Text>
          </Pressable>
        </Link>
      </View>
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
  title: { color: COLORS.inkLight, fontSize: 28, fontWeight: "700", marginBottom: 12 },
  list: {},
  row: {
    backgroundColor: COLORS.chip,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  rowText: { color: COLORS.accentLight, fontSize: 18, fontWeight: "600" },
});
