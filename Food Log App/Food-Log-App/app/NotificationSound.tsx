import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Switch,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

type Tone = 'Breeze' | 'Ripple' | 'Chime' | 'Bloom';

export default function NotificationSound() {
  const router = useRouter();

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [volume, setVolume] = useState(0.6); // 0..1
  const [tone, setTone] = useState<Tone>('Breeze');

  const tones = useMemo<Tone[]>(() => ['Breeze', 'Ripple', 'Chime', 'Bloom'], []);

  const clamp = (n: number) => Math.max(0, Math.min(1, n));

  const bumpVolume = (delta: number) => {
    setVolume((v) => {
      const next = clamp(v + delta);
      return Math.round(next * 100) / 100;
    });
  };

  const onCancel = () => router.back();
  const onSave = () => {
    // UI-only for now (no sounds/storage yet)
    router.back();
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.center}>
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>♪</Text>
            </View>
            <Text style={styles.title}>Notification Sound</Text>
          </View>

          {/* Content box */}
          <View style={styles.box}>
            {/* Sound */}
            <View style={styles.rowBetween}>
              <Text style={styles.label}>Sound</Text>
              <Switch
                value={soundEnabled}
                onValueChange={setSoundEnabled}
                trackColor={{ false: '#A9B08A', true: '#2F3B2D' }}
                thumbColor={soundEnabled ? '#E8EFCC' : '#E6E6E6'}
              />
            </View>

            {/* Volume */}
            <View style={styles.section}>
              <Text style={styles.label}>Volume</Text>

              <View style={styles.volumeRow}>
                <Pressable
                  onPress={() => bumpVolume(-0.1)}
                  style={({ pressed }) => [styles.volBtn, pressed && styles.pressed]}
                >
                  <Text style={styles.volBtnText}>-</Text>
                </Pressable>

                <View style={styles.barTrack}>
                  <View style={[styles.barFill, { width: `${Math.round(volume * 100)}%` }]} />
                  <View style={[styles.barThumb, { left: `${Math.round(volume * 100)}%` }]} />
                </View>

                <Pressable
                  onPress={() => bumpVolume(0.1)}
                  style={({ pressed }) => [styles.volBtn, pressed && styles.pressed]}
                >
                  <Text style={styles.volBtnText}>+</Text>
                </Pressable>
              </View>
            </View>

            {/* Select tone */}
            <View style={styles.section}>
              <Text style={styles.label}>Select Tone</Text>

              <View style={styles.toneBox}>
                {tones.map((t, idx) => {
                  const selected = t === tone;
                  return (
                    <Pressable
                      key={t}
                      onPress={() => setTone(t)}
                      style={({ pressed }) => [
                        styles.toneRow,
                        idx !== tones.length - 1 && styles.toneDivider,
                        pressed && styles.pressed,
                      ]}
                      accessibilityRole="radio"
                      accessibilityState={{ checked: selected }}
                    >
                      <View style={[styles.radioOuter, selected && styles.radioOuterSelected]}>
                        {selected ? <View style={styles.radioInner} /> : null}
                      </View>
                      <Text style={styles.toneText}>{t}</Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Vibration */}
            <View style={[styles.rowBetween, styles.section]}>
              <Text style={styles.label}>Vibration</Text>
              <Switch
                value={vibrationEnabled}
                onValueChange={setVibrationEnabled}
                trackColor={{ false: '#A9B08A', true: '#2F3B2D' }}
                thumbColor={vibrationEnabled ? '#E8EFCC' : '#E6E6E6'}
              />
            </View>

            {/* Buttons */}
            <View style={styles.footerRow}>
              <Pressable
                onPress={onCancel}
                style={({ pressed }) => [styles.btn, styles.btnGhost, pressed && styles.pressed]}
              >
                <Text style={styles.btnGhostText}>Cancel</Text>
              </Pressable>

              <Pressable
                onPress={onSave}
                style={({ pressed }) => [styles.btn, styles.btnPrimary, pressed && styles.pressed]}
              >
                <Text style={styles.btnPrimaryText}>Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#DCE6BE',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    padding: 18,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
    borderRadius: 26,
    backgroundColor: 'rgba(220, 230, 190, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(55, 65, 40, 0.25)',
    padding: 18,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 10,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#5D6F3F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#E8EFCC',
    fontSize: 20,
    fontWeight: '700',
  },
  title: {
    fontSize: 24
