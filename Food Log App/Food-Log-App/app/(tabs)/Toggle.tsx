// app/components/Toggle.tsx
import { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet } from "react-native";

interface ToggleProps {
  value: boolean;
  onChange: (val: boolean) => void;
}

export default function Toggle({ value, onChange }: ToggleProps) {
  const anim = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(anim, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);

  const translateX = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 22], // adjust based on width
  });

  const backgroundColor = anim.interpolate({
    inputRange: [0, 1],
    outputRange: ["#545E43", "#2F3523"], // Off color vs On color
  });

  return (
    <Pressable onPress={() => onChange(!value)}>
      <Animated.View style={[styles.track, { backgroundColor }]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 48,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#5F684E",
  },
  thumb: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#DCE5C5", // The light thumb color
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
  },
});