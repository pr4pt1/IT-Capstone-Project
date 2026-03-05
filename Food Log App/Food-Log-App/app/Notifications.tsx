import { Text, StyleSheet, Pressable, View, ImageBackground } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from "expo-router";

export default function Notifications() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require('../assets/images/bg.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          
          {/* Header with back button */}
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <Text style={styles.backText}>←</Text>
            </Pressable>
            <Text style={styles.title}>Notifications</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Notification Sound Option */}
          <Pressable
            style={styles.option}
            onPress={() => router.push("/NotificationSound")}
          >
            <Text style={styles.optionText}>Notification Sound</Text>
          </Pressable>

          {/* Notification Preview Option */}
          <Pressable
            style={styles.option}
            onPress={() => router.push("/NotificationPreview")}
          >
            <Text style={styles.optionText}>Notification Preview</Text>
          </Pressable>

        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  backButton: {
    padding: 8,
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    fontSize: 32,
    color: '#2b2c2aff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3D4127',
    flex: 1,
  },
  placeholder: {
    width: 44,
  },
  option: {
    backgroundColor: '#ffffffaa',
    padding: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#3D4127',
    marginBottom: 12,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#3D4127',
    fontWeight: '500',
  },
});
