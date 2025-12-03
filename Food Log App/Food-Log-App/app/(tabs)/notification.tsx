import { useRouter } from "expo-router";
import React from "react";
import {
    Alert,
    PanResponder,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    Vibration,
    View,
} from "react-native";

// ✅ FIXED: Use modern SafeAreaView and new expo-audio import
import * as Audio from 'expo-audio'; // ✅ CRITICAL FIX for 'createAsync of undefined'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Bell, BellOff, Calendar, Clock, Home, Settings } from "lucide-react-native";
import Toggle from "./components/Toggle";

const COLORS = {
  bgDark: "#0B0B0B",
  bgTop: "#EFF5DA",
  bgBottom: "#C9D5A4",
  blobA: "#D9E8B4",
  blobB: "#8EA36B",
  iconBg: "#7E8D58",
  ink: "#263018",
  inkMuted: "#3A3F32",
  accentLight: "#D9E8B4",
  card: "#BFCB97B3",
  cardBorder: "#EBF1D7",
  toneBorder: "#E7EDD2",
  sliderTrack: "#E6EDCE",
  rowActive: "#C7D1A2",
  tabbar: "#2E3326",
  tabIcon: "#DCE7C0",
  btnLight: "#F3F6E7",
  btnLightBorder: "#E1E9C7",
};

const RADII = { lg: 16, xl: 20 };
const SHADOWS = {
  soft: {
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  glass: {
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 6,
  },
};

function clamp01(v: number): number { // ✅ FIXED: Added type definition
  return Math.max(0, Math.min(1, v));
}

const TONES = ["Breeze", "Ripple", "Chime", "Bloom"];

// This is correct and still uses your assets/sounds files.
const TONE_MAP = {
  Breeze: require('../assets/sounds/breeze.mp3'),
  Ripple: require('../assets/sounds/ripple.mp3'),
  Chime: require('../assets/sounds/chime.mp3'),
  Bloom: require('../assets/sounds/bloom.mp3'),
};

interface SliderBasicProps { // ✅ FIXED: Added interface for props
  value: number;
  onChange: (value: number) => void;
  disabled: boolean;
}

function SliderBasic({ value, onChange, disabled }: SliderBasicProps) { // ✅ FIXED: Applied interface
  const [width, setWidth] = React.useState(0);
  const containerRef = React.useRef<View | null>(null); // ✅ FIXED: Added ref type
  const [containerX, setContainerX] = React.useState(0);

  const handleLayout = (e: any) => { // Using any for event type brevity
    if (containerRef.current) {
        containerRef.current.measure((fx, fy, width, height, px, py) => {
          setWidth(width);
          setContainerX(px);
        });
    }
  };

  const updateFromX = (x: number) => { // ✅ FIXED: Added type definition
    if (!width || disabled) return;
    const next = clamp01(x / width);
    onChange(next);
  };

  const panResponder = React.useMemo(() => PanResponder.create({
    onStartShouldSetPanResponder: () => !disabled,
    onMoveShouldSetPanResponder: () => !disabled,
    
    onPanResponderMove: (evt, gestureState) => {
      const currentX = evt.nativeEvent.pageX;
      const relativeX = currentX - containerX;
      updateFromX(relativeX);
    },
    
    onPanResponderRelease: (evt, gestureState) => {
      
    },
  }), [width, disabled, containerX]);

  const knobLeft = width ? clamp01(value) * width : 0;

  return (
    <View
      ref={containerRef}
      style={styles.sliderWrap}
      onLayout={handleLayout}
      {...panResponder.panHandlers}
      onTouchStart={(e) => {
         if (disabled) return;
         updateFromX(e.nativeEvent.locationX || 0);
      }}
    >
      <View style={styles.sliderTrack} />
      <View style={[styles.sliderFill, { width: clamp01(value) * width }]} />
      <View style={[styles.sliderKnob, { left: knobLeft, marginLeft: -10 }]} /> 
    </View>
  );
}

export default function NotificationScreen() {
  const router = useRouter();
  const [soundEnabled, setSoundEnabled] = React.useState(true);
  const [vibrationEnabled, setVibrationEnabled] = React.useState(true);
  const [volume, setVolume] = React.useState(0.6);
  const [tone, setTone] = React.useState(TONES[0]);

  const playSound = async (selectedTone: string) => { // ✅ FIXED: Added type definition
    try {
      if (!soundEnabled) return;

      const soundPath = TONE_MAP[selectedTone as keyof typeof TONE_MAP]; // ✅ FIXED: Added type casting
      if (!soundPath) return;

      // Using new expo-audio API
      const { sound } = await Audio.Sound.createAsync(soundPath); 
      await sound.setVolumeAsync(volume);
      await sound.playAsync();

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };
  
  const vibratePhone = () => {
    if (vibrationEnabled) {
      Vibration.vibrate(50); 
    }
  };

  const onSave = () => {
    vibratePhone(); // Trigger vibration
    Alert.alert(
      "Saved",
      `Sound: ${soundEnabled ? "On" : "Off"}\nVolume: ${Math.round(
        volume * 100
      )}%\nTone: ${tone}\nVibration: ${vibrationEnabled ? "On" : "Off"}`
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.bgTop }]} />
      <View style={[StyleSheet.absoluteFill, { backgroundColor: COLORS.bgBottom, opacity: 0.6 }]} />
      <View style={styles.blobA} />
      <View style={styles.blobB} />

      <View style={styles.headerWrap}>
        <View style={styles.headerIcon}>
          {soundEnabled ? (
            <Bell size={32} color={COLORS.ink} />
          ) : (
             <BellOff size={32} color={COLORS.ink} />
          )}
        </View>
        <Text style={styles.headerTitle}>Notification Sound</Text>
      </View>

      {/* ✅ FIXED: Added flexGrow: 1 and justify-content to push the tabbar to the bottom */}
      <ScrollView contentContainerStyle={styles.scrollContent}> 
        <View style={styles.card}>
          <View style={styles.rowBetween}>
            <Text style={styles.label}>Sound</Text>
            <Toggle value={soundEnabled} onChange={setSoundEnabled} />
          </View>

          <Text style={[styles.label, { marginTop: 22 }]}>Volume</Text>
          <View style={styles.sliderRow}>
            <SliderBasic value={volume} onChange={setVolume} disabled={!soundEnabled} />
            <Text style={styles.percent}>{Math.round(volume * 100)}%</Text>
          </View>

          <Text style={[styles.label, { marginTop: 22 }]}>Select Tone</Text>
          <View style={styles.tonesBox}>
            {TONES.map((t, idx) => {
              const active = t === tone;
              const isLast = idx === TONES.length - 1;
              return (
                <Pressable
                  key={t}
                  onPress={() => {
                    setTone(t);
                    playSound(t);
                  }}
                  style={[
                    styles.toneRow,
                    !isLast && styles.toneDivider,
                    active && { backgroundColor: COLORS.rowActive },
                  ]}
                >
                  <View
                    style={[
                      styles.dot,
                      active && { backgroundColor: COLORS.accentLight, borderColor: COLORS.ink },
                    ]}
                  />
                  <Text style={[styles.toneText, active && { color: COLORS.ink }]}>{t}</Text>
                </Pressable>
              );
            })}
          </View>

          <View style={[styles.rowBetween, { marginTop: 22 }]}>
            <Text style={styles.label}>Vibration</Text>
            <Toggle value={vibrationEnabled} onChange={setVibrationEnabled} />
          </View>

          <View style={styles.actions}>
            <Pressable style={[styles.btn, styles.btnLight]} onPress={() => router.back()}>
              <Text style={[styles.btnText, { color: COLORS.ink }]}>Cancel</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.btnDark]} onPress={onSave}>
              <Text style={[styles.btnText, { color: "#F3F6E7" }]}>Save</Text>
            </Pressable>
          </View>
        </View>

        {/* The tabbar is the last element inside the ScrollView's content container */}
        <View style={styles.tabbar}>
          <Home size={22} color={COLORS.tabIcon} />
          <Calendar size={22} color={COLORS.tabIcon} />
          <Clock size={22} color={COLORS.tabIcon} />
          <View style={styles.settingsBadge}>
            <Settings size={18} color={COLORS.ink} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.bgDark },
  
  // CRITICAL LAYOUT FIX: Forces ScrollView content to stretch
  scrollContent: {
    flexGrow: 1, 
    paddingBottom: 28, // Added padding for better spacing above the tabbar
    justifyContent: 'space-between', // Ensures content and tabbar are pushed apart
  },
  
  blobA: {
    position: "absolute",
    top: 40,
    right: -120,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: COLORS.blobA,
    opacity: 0.25,
    transform: [{ rotate: "20deg" }],
  },
  blobB: {
    position: "absolute",
    bottom: 80,
    left: -140,
    width: 320,
    height: 320,
    borderRadius: 200,
    backgroundColor: COLORS.blobB,
    opacity: 0.2,
    transform: [{ rotate: "-15deg" }],
  },
  headerWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 12,
  },
  headerIcon: {
    height: 64,
    width: 64,
    borderRadius: 40,
    backgroundColor: COLORS.iconBg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
    ...SHADOWS.soft,
  },
  headerTitle: { fontSize: 28, fontWeight: "800", color: COLORS.ink },
  card: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: RADII.xl,
    padding: 18,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    ...SHADOWS.glass,
  },
  rowBetween: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  label: { fontSize: 20, fontWeight: "700", color: COLORS.ink },
  sliderRow: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  percent: { width: 52, textAlign: "right", color: COLORS.ink, fontWeight: "700", marginLeft: 10 },
  tonesBox: {
    marginTop: 10,
    borderRadius: RADII.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.toneBorder,
  },
  toneRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: COLORS.card,
  },
  toneDivider: { borderBottomWidth: 1, borderBottomColor: COLORS.toneBorder },
  toneText: { fontSize: 16, color: COLORS.inkMuted, fontWeight: "700" },
  dot: {
    height: 20,
    width: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.inkMuted,
    backgroundColor: "transparent",
    marginRight: 12,
  },
  actions: { flexDirection: "row", marginTop: 22 },
  btn: {
    flex: 1,
    borderRadius: RADII.lg,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLight: {
    backgroundColor: COLORS.btnLight,
    borderWidth: 1,
    borderColor: COLORS.btnLightBorder,
    marginRight: 12,
  },
  btnDark: { backgroundColor: COLORS.ink },
  btnText: { fontSize: 16, fontWeight: "800" },
  tabbar: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: COLORS.tabbar,
    borderRadius: RADII.xl,
    paddingVertical: 14,
    paddingHorizontal: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tabText: { color: COLORS.tabIcon, fontSize: 18 },
  settingsBadge: {
    backgroundColor: COLORS.accentLight,
    borderRadius: 16,
    padding: 6,
  },

  sliderWrap: {
    flex: 1,
    height: 26,
    justifyContent: "center",
  },
  sliderTrack: {
    position: "absolute",
    height: 6,
    left: 0,
    right: 0,
    borderRadius: 4,
    backgroundColor: COLORS.sliderTrack,
  },
  sliderFill: {
    position: "absolute",
    height: 6,
    left: 0,
    borderRadius: 4,
    backgroundColor: COLORS.ink,
  },
  sliderKnob: {
    position: "absolute",
    top: 3,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.ink,
  },
});